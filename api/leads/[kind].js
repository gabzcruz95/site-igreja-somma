/**
 * Vercel Serverless Function: POST /api/leads/:kind
 * onde :kind é "membership", "volunteer" ou "contact".
 *
 * Recebe os formulários "Quero fazer parte", "Quero servir" e o formulário de
 * contato. Por enquanto valida os campos obrigatórios e loga o envio — não há
 * banco de dados conectado ainda.
 *
 * TODO antes de produção:
 *  1. Persistir cada envio em um banco de dados (ex.: Vercel Postgres, Supabase, Airtable).
 *  2. Notificar a equipe da igreja (e-mail, WhatsApp Business API, Slack...).
 *  3. Adicionar um rate limit para evitar spam (ex.: @upstash/ratelimit, comum em Vercel Functions).
 *  4. Validar/sanitizar os campos com mais rigor (ex.: zod).
 */

const REQUIRED_FIELDS = {
  membership: ['nome', 'whatsapp', 'email', 'sobre', 'motivo', 'consentimento'],
  volunteer: ['nome', 'whatsapp', 'email', 'sobre', 'area', 'experiencia', 'consentimento'],
  contact: ['nome', 'email', 'mensagem'],
}

function validateLead(body, requiredFields) {
  return requiredFields.filter((field) => {
    const value = body?.[field]
    if (typeof value === 'boolean') return !value
    return !value || String(value).trim() === ''
  })
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  const { kind } = req.query
  const requiredFields = REQUIRED_FIELDS[kind]

  if (!requiredFields) {
    return res.status(404).json({ error: 'Formulário desconhecido.' })
  }

  const missing = validateLead(req.body, requiredFields)
  if (missing.length > 0) {
    return res.status(400).json({ error: `Campos obrigatórios ausentes: ${missing.join(', ')}` })
  }

  console.log(`[lead] ${kind}:`, {
    ...req.body,
    recebidoEm: new Date().toISOString(),
  })

  // TODO: salvar no banco de dados e notificar a equipe da igreja.

  return res.status(201).json({ ok: true })
}
