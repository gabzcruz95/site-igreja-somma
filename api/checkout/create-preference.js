import { MercadoPagoConfig, Preference } from 'mercadopago'
import { getSiteUrl } from '../_lib/site-url.js'

/**
 * Vercel Serverless Function: POST /api/checkout/create-preference
 *
 * Recebe os itens do carrinho e os dados do comprador vindos do frontend,
 * cria uma "preference" no Mercado Pago (Checkout Pro) e devolve a URL
 * (init_point) para onde o navegador do cliente deve ser redirecionado.
 *
 * O Access Token do Mercado Pago só existe aqui, como variável de ambiente
 * do projeto na Vercel (MP_ACCESS_TOKEN) — nunca chega ao frontend/navegador.
 * O pagamento em si (Pix ou cartão) acontece inteiramente no ambiente do
 * Mercado Pago; nenhum dado de cartão passa por esta função.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  if (!process.env.MP_ACCESS_TOKEN) {
    console.error('MP_ACCESS_TOKEN não configurado nas variáveis de ambiente da Vercel.')
    return res.status(500).json({
      error: 'Pagamentos ainda não configurados. Defina MP_ACCESS_TOKEN nas variáveis de ambiente.',
    })
  }

  try {
    const { items, payer } = req.body ?? {}

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Nenhum item foi informado.' })
    }
    if (!payer?.email) {
      return res.status(400).json({ error: 'E-mail do comprador é obrigatório.' })
    }

    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })
    const preference = new Preference(client)
    const siteUrl = getSiteUrl(req)

    const result = await preference.create({
      body: {
        items: items.map((item) => ({
          id: item.id,
          title: [item.title, item.color, item.size].filter(Boolean).join(' - '),
          quantity: Number(item.quantity) || 1,
          unit_price: Number(item.unitPrice),
          currency_id: 'BRL',
        })),
        payer: {
          name: payer.name,
          email: payer.email,
          phone: payer.phone ? { number: payer.phone } : undefined,
          address: payer.address
            ? {
                street_name: payer.address.street,
                street_number: payer.address.number,
                zip_code: payer.address.zipCode,
              }
            : undefined,
        },
        back_urls: {
          success: `${siteUrl}/loja/confirmacao?status=approved`,
          pending: `${siteUrl}/loja/confirmacao?status=pending`,
          failure: `${siteUrl}/loja/confirmacao?status=rejected`,
        },
        auto_return: 'approved',
        notification_url: `${siteUrl}/api/webhooks/mercadopago`,
        statement_descriptor: 'IGREJA SOMMA',
      },
    })

    return res.status(200).json({
      id: result.id,
      // Em produção, use result.init_point. Com credenciais de TESTE, o Mercado
      // Pago também expõe sandbox_init_point para simular o pagamento sem custo real.
      initPoint: result.init_point ?? result.sandbox_init_point,
    })
  } catch (error) {
    console.error('Erro ao criar preferência no Mercado Pago:', error)
    return res.status(500).json({ error: 'Não foi possível criar a preferência de pagamento.' })
  }
}
