// Helper compartilhado pelas funções em /api.
//
// Em produção na Vercel, defina a variável de ambiente SITE_URL com o domínio
// final do site (ex.: https://igrejasomma.com.br) para garantir que os links
// de retorno do Mercado Pago e o webhook apontem sempre para o domínio certo.
//
// Se SITE_URL não estiver definida, caímos para VERCEL_URL, que a própria
// Vercel injeta automaticamente em todo deploy (preview ou produção) — assim
// tudo funciona "out of the box" mesmo antes de configurar um domínio próprio.
export function getSiteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  // Último recurso (ex.: rodando com `vercel dev` localmente sem essas variáveis):
  // monta a partir do próprio request.
  const host = req?.headers?.host
  if (host) {
    const protocol = host.startsWith('localhost') ? 'http' : 'https'
    return `${protocol}://${host}`
  }

  return 'http://localhost:3000'
}
