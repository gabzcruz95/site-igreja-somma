# Igreja SôMMA — Site institucional e loja

Site institucional e loja da Igreja SôMMA (Mauá, SP), construído com React + TypeScript + Vite +
Tailwind CSS + React Router. Frontend e backend (checkout com Mercado Pago, webhook e formulários)
são publicados juntos, num único projeto Vercel, usando **Vercel Serverless Functions** em `/api`.

## Rodando localmente

Recomendado — sobe o frontend E as funções de `/api` juntos, exatamente como em produção:

```bash
npm install
cp .env.example .env   # preencha com uma credencial de TESTE do Mercado Pago
npx vercel dev
```

Não precisa instalar a CLI da Vercel globalmente nem ter conta para isso — o `npx vercel dev`
baixa a CLI sob demanda e roda tudo localmente (ele pode pedir para "linkar" a um projeto Vercel
na primeira vez; pode escolher criar um projeto novo ou pular esse passo, funciona do mesmo jeito).

Alternativa mais simples, só para mexer na interface (sem testar checkout, webhook ou formulários,
já que eles dependem das funções de `/api`):

```bash
npm run dev
```

Build de produção (o que a Vercel executa):

```bash
npm run build
npm run preview
```

## Nenhuma credencial real no código

`.env.example` só tem um valor de exemplo no formato de uma credencial de teste do Mercado Pago.
O arquivo `.env` de verdade (que você mesmo cria a partir do exemplo) está no `.gitignore` e nunca
deve ser commitado. Em produção, as variáveis reais ficam exclusivamente no painel da Vercel.

## Arquitetura: frontend + API no mesmo projeto Vercel

Não existe mais um servidor Express separado esperando ser hospedado em outro lugar — o backend
inteiro vive em `/api`, como Vercel Serverless Functions, publicado junto do frontend num único
`vercel deploy` (ou no deploy automático a cada push, se conectado ao GitHub). Cada arquivo em
`/api` vira um endpoint automaticamente:

| Endpoint | Arquivo | Descrição |
| --- | --- | --- |
| `POST /api/checkout/create-preference` | `api/checkout/create-preference.js` | Cria a preferência de pagamento no Mercado Pago e devolve a URL de checkout |
| `POST /api/webhooks/mercadopago` | `api/webhooks/mercadopago.js` | Recebe a confirmação assíncrona de pagamento do Mercado Pago |
| `POST /api/leads/membership` | `api/leads/[kind].js` | Formulário "Quero fazer parte" |
| `POST /api/leads/volunteer` | `api/leads/[kind].js` | Formulário "Quero servir" |
| `POST /api/leads/contact` | `api/leads/[kind].js` | Formulário de contato |

`api/leads/[kind].js` é uma rota dinâmica: o nome entre colchetes (`kind`) captura o segmento da
URL (`membership`, `volunteer` ou `contact`) e valida os campos obrigatórios de cada formulário.

`api/_lib/site-url.js` é um helper compartilhado (não é um endpoint — arquivos/pastas com `_` na
frente são ignorados pelo roteamento de Functions da Vercel) que monta a URL pública do site para
os links de retorno do Mercado Pago, usando a variável `SITE_URL` ou, na falta dela, `VERCEL_URL`
(que a própria Vercel já injeta automaticamente em todo deploy).

`vercel.json` já está configurado para que rotas do React Router (SPA) caiam em `index.html`, sem
interferir nas rotas de `/api`:

```json
{ "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }] }
```

## Variáveis de ambiente a configurar na Vercel

Painel do projeto > Settings > Environment Variables:

| Nome | Obrigatória? | Onde é usada | Valor |
| --- | --- | --- | --- |
| `MP_ACCESS_TOKEN` | Sim, para o checkout funcionar | Só nas funções de `/api` (nunca no frontend) | Access Token do Mercado Pago — comece com uma credencial de **teste** |
| `SITE_URL` | Recomendada | Só nas funções de `/api` | URL pública final do site, ex. `https://igrejasomma.com.br`. Sem ela, cai para `VERCEL_URL` (gerado automaticamente) |
| `VITE_API_URL` | Não, na maioria dos casos | Frontend (exposta no navegador) | Deixe em branco — só é necessária se a API for hospedada em outro domínio |

## O que ainda depende do Mercado Pago

- **`MP_ACCESS_TOKEN` real de teste**: sem ele, `/api/checkout/create-preference` responde com erro
  claro ("Pagamentos ainda não configurados") em vez de falhar silenciosamente — o checkout do
  frontend mostra essa mensagem ao usuário.
- Depois de testar com credenciais de teste, trocar `MP_ACCESS_TOKEN` pela credencial de
  **produção** no painel da Vercel é a única mudança necessária para ir ao ar de verdade — nenhum
  código muda.
- `api/webhooks/mercadopago.js` já busca o pagamento e loga o resultado; os `TODO` no arquivo
  marcam onde entra a validação da assinatura do webhook e a gravação em banco de dados antes de
  produção.

## O que já está pronto

- Header sticky com efeito ao rolar, menu mobile, ícone de carrinho com contador. Menu: Início,
  Quem somos, Clãs, Cultos, Loja, Quero ser membro, Quero servir.
- Home estruturada exatamente na ordem pedida: Hero → Identidade da SôMMA → Quem somos →
  Propósito → Clãs → Cultos e localização → Loja → Quero fazer parte → Quero servir → Instagram.
- Carrinho de compras funcional (`src/context/CartContext.tsx`): adicionar, remover, alterar
  quantidade, variantes por tamanho **e cor**. Persiste na aba do navegador via `sessionStorage`.
- Loja com os 2 produtos oficiais e fotos reais (camiseta do drop Essencial com seleção de cor e
  tamanho — com galeria de 3 fotos — e o livro "A Escada da Multiplicação").
- Checkout completo: formulário do comprador + endereço de entrega, escolha entre Pix e Cartão,
  e redirecionamento para o Checkout Pro do Mercado Pago. Página de confirmação
  (`/loja/confirmacao`) trata os status `approved`/`pending`/`rejected` que o Mercado Pago envia
  de volta.
- Formulários "Quero fazer parte", "Quero servir" e "Contato" com todos os campos pedidos,
  checkbox de consentimento, envio para `/api/leads/*` e as mensagens de sucesso especificadas.
- WhatsApp oficial (+55 11 91218-7730) em botões reais (`wa.me`) no Footer, na página de Contato e
  no CTA final da página de Clãs.
- SEO básico (title por página via `usePageTitle`, meta description, Open Graph, favicon) e
  acessibilidade (skip link, foco visível, labels, `aria-*`, navegação por teclado).
- Paleta e tipografia em `tailwind.config.js` (terracota, verde oliva/sálvia, cinza azulado,
  off-white, preto/chumbo-escuro) — Tailwind compilado corretamente via PostCSS, sem CDN.
- `vercel.json` pronto para SPA + API no mesmo deploy.

## Logo e fotos reais

- `src/assets/logo/somma-mark.png`: selo circular oficial extraído do avatar do Instagram
  (@igreja.somma), usado no `Logo.tsx` e como favicon.
- `src/assets/images/*.jpg`: quatro fotos reais recortadas da grade de posts do Instagram, usadas
  na seção "Acompanhe a SôMMA" da Home.
- `src/assets/images/products/`: fotos oficiais da camiseta (frente, bordado, costas) e da capa do
  livro, mapeadas em `src/data/productImages.ts` e usadas em `ProductCard`, `Product` (com galeria
  de miniaturas para a camiseta) e `CartItem`.
- A camiseta foi fotografada em apenas uma cor (bege/off-white); as outras 4 cores do seletor
  ainda mostram essa mesma foto, com um aviso de "foto meramente ilustrativa" na página do
  produto até que cheguem fotos por cor.

## O que ficou como PLACEHOLDER (dado não fornecido)

- `[E-MAIL]`, `[NOME DO PASTOR]`, `[CHAVE PIX]` em `src/data/services.ts`.
- "Nossa história" e "Nossos valores" em `/quem-somos`.
- Horário de encontro dos Clãs não foi informado — por isso a página `/clas` mostra apenas nome,
  líder e endereço de cada Clã (Wesley e Pedro), sem inventar dia/horário.

## Publicando (GitHub + Vercel)

1. Suba este projeto para um repositório no GitHub (o `.gitignore` já impede que `node_modules`,
   `.env`, `.vercel` e afins sejam commitados).
2. Na Vercel, clique em "Add New… > Project" e importe o repositório. A Vercel detecta o Vite
   automaticamente (`npm run build`, saída em `dist/`) e também detecta as funções em `/api` sem
   nenhuma configuração extra.
3. Antes do primeiro deploy (ou logo depois, refazendo o deploy em seguida), configure as
   variáveis de ambiente da tabela acima em Settings > Environment Variables.
4. Pronto — cada push na branch principal gera um novo deploy de produção; cada Pull Request gera
   um preview com sua própria URL (e a própria `VERCEL_URL` daquele preview, o que já basta para
   o checkout funcionar mesmo antes de configurar `SITE_URL`).

## Estrutura

```
api/
  checkout/create-preference.js   cria a preferência de pagamento no Mercado Pago
  webhooks/mercadopago.js         recebe a confirmação assíncrona de pagamento
  leads/[kind].js                 recebe os formulários (membro, voluntário, contato)
  _lib/site-url.js                helper interno (não é uma rota)
src/
  components/   Header, Footer, Hero, Logo, Button, SectionTitle, cards, etc.
  pages/        Home, About, Services, Clas, Events, Store, Product, Cart, Checkout,
                OrderConfirmation, Membership, Volunteer, Contact
  data/         products.ts, events.ts, services.ts, volunteerAreas.ts, productImages.ts
  context/      CartContext.tsx
  hooks/        useReveal.ts, usePageTitle.ts
  lib/          api.ts (cliente das funções em /api)
  assets/       images/ (fotos reais), logo/ (selo real)
vercel.json      rewrite de SPA (não interfere em /api)
.env.example     variáveis de ambiente (sem credenciais reais)
```

## Observação sobre as imagens do Instagram

As capturas de tela usadas como referência mostram conteúdo publicado em 2021. Se a identidade
visual atual da igreja for diferente da mostrada nessas imagens, vale reenviar referências mais
recentes.
