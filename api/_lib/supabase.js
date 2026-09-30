import { createClient } from '@supabase/supabase-js'

// Cliente Supabase para uso EXCLUSIVO nas funções serverless de /api.
// SUPABASE_SECRET_KEY nunca deve ter o prefixo VITE_ e nunca deve ser
// importado por nenhum arquivo dentro de src/ — só chega ao navegador o que
// o Vite decide embutir no bundle, e ele só embute variáveis VITE_*, mas a
// regra de ouro aqui é simplesmente: esta função só é chamada a partir de
// arquivos dentro de /api (Node, lado servidor).
//
// Não temos os valores de SUPABASE_URL / SUPABASE_SECRET_KEY nesta conversa —
// eles devem ser configurados como variáveis de ambiente do projeto na Vercel.
let client

export function getSupabaseClient() {
  if (client) return client

  const url = process.env.SUPABASE_URL
  const secretKey = process.env.SUPABASE_SECRET_KEY

  if (!url || !secretKey) {
    throw new Error(
      'SUPABASE_URL ou SUPABASE_SECRET_KEY não configuradas nas variáveis de ambiente da Vercel.',
    )
  }

  client = createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  return client
}
