import { getNeonClient } from '../_lib/neon.js'

/**
 * Vercel Serverless Function: POST /api/leads/:kind
 * onde :kind é "membership", "volunteer" ou "contact".
 *
 * Recebe os formulários "Quero fazer parte" e "Quero servir" e grava cada um
 * na tabela correspondente do Neon PostgreSQL (public.membership_requests /
 * public.volunteer_requests). O formulário de contato ("contact") continua
 * apenas validado e logado — nenhuma tabela foi especificada para ele.
 *
 * DATABASE_URL só é usada aqui (lado servidor) — nunca no frontend.
 *
 * TODO antes de produção:
 *  1. Notificar a equipe da igreja quando um novo registro entrar (e-mail, WhatsApp Business API, Slack...).
 *  2. Adicionar um rate limit para evitar spam (ex.: @upstash/ratelimit, comum em Vercel Functions).
 *  3. Validar/sanitizar os campos com mais rigor (ex.: zod).
 *  4. Definir para onde vai o formulário de contato (hoje só loga; sem tabela definida ainda).
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

// Mapeamento campo do frontend -> coluna da tabela no Neon PostgreSQL.
//
// Observação sobre "volunteer": o mapeamento pedido usa a chave
// "experienciaDescricao", mas o formulário atual (src/pages/Volunteer.tsx)
// envia esse mesmo texto no campo "detalhes" (rótulo "Conte um pouco mais
// sobre como gostaria de ajudar"). Como a funcionalidade e o design do
// formulário não podem mudar, mantive o campo do frontend como está e
// apontei "detalhes" para a coluna experience_description — o resultado
// final (o dado salvo na coluna certa) é o mesmo pedido no mapeamento.
function mapMembership(body) {
  return {
    full_name: body.nome,
    phone: body.whatsapp,
    email: body.email,
    about: body.sobre,
    reason: body.motivo,
    contact_consent: Boolean(body.consentimento),
    status: 'new',
  }
}

function mapVolunteer(body) {
  return {
    full_name: body.nome,
    phone: body.whatsapp,
    email: body.email,
    about: body.sobre,
    area: body.area,
    // O formulário envia "sim"/"nao" (radio); a coluna é booleana.
    has_experience: body.experiencia === 'sim',
    // "detalhes" no frontend == "experienciaDescricao" no mapeamento pedido.
    experience_description: body.detalhes ?? body.experienciaDescricao ?? '',
    contact_consent: Boolean(body.consentimento),
    status: 'new',
  }
}

export default async function handler(req, res) {
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

  // "contact" ainda não tem tabela definida — mantém o comportamento anterior.
  if (kind === 'contact') {
    console.log('[lead] contact:', { ...req.body, recebidoEm: new Date().toISOString() })
    // TODO: definir destino do formulário de contato (tabela própria, e-mail, etc.).
    return res.status(201).json({ ok: true })
  }

  try {
    const sql = getNeonClient()
    const table = kind === 'membership' ? 'membership_requests' : 'volunteer_requests'
    const row = kind === 'membership' ? mapMembership(req.body) : mapVolunteer(req.body)

    if (kind === 'membership') {
      await sql`
        INSERT INTO membership_requests
          (full_name, phone, email, about, reason, contact_consent, status)
        VALUES
          (${row.full_name}, ${row.phone}, ${row.email}, ${row.about}, ${row.reason}, ${row.contact_consent}, ${row.status})
      `
    } else {
      await sql`
        INSERT INTO volunteer_requests
          (full_name, phone, email, about, area, has_experience, experience_description, contact_consent, status)
        VALUES
          (${row.full_name}, ${row.phone}, ${row.email}, ${row.about}, ${row.area}, ${row.has_experience}, ${row.experience_description}, ${row.contact_consent}, ${row.status})
      `
    }

    return res.status(201).json({ ok: true })
  } catch (error) {
    console.error(`[lead] falha inesperada (${kind}):`, error)
    return res.status(500).json({ error: 'Não foi possível salvar seu cadastro. Tente novamente.' })
  }
}
