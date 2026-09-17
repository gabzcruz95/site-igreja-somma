import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// As rotas de API vivem em /api (Vercel Serverless Functions) e são
// publicadas junto do frontend no mesmo domínio — não há mais um servidor
// Express separado. Para testar o frontend E as funções de /api juntos em
// desenvolvimento, rode `npx vercel dev` na raiz do projeto (ele detecta o
// Vite automaticamente e sobe tudo numa porta só). Rodar `npm run dev` aqui
// sobe só o frontend: útil para mexer em UI, mas chamadas a /api não terão
// para onde ir sem o `vercel dev`.
export default defineConfig({
  plugins: [react()],
})
