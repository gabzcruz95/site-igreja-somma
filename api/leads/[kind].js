import { getNeonClient } from '../_lib/neon.js'

const REQUIRED_FIELDS = {
  membership: ['nome', 'whatsapp', 'email', 'sobre', 'motivo', 'consentimento'],
  volunteer: ['nome', 'whatsapp', 'email', 'sobre', 'area', 'experiencia', 'consentimento'],
  contact: ['nome', 'email', 'mensagem'],
}

function validateLead(body, requiredFields) {
  return requiredFields.filter((field) => {
    const value = body?.[field]

    if (typeof value === 'boolean') {
      return !value
    }

    return !value || String(value).trim() === ''
  })
}

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
    has_experience: body.experiencia === 'sim',
    experience_description:
      body.detalhes ?? body.experienciaDescricao ?? '',
    contact_consent: Boolean(body.consentimento),
    status: 'new',
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({
      error: 'Método não permitido.',
    })
  }

  const { kind } = req.query
  const requiredFields = REQUIRED_FIELDS[kind]

  if (!requiredFields) {
    return res.status(404).json({
      error: 'Formulário desconhecido.',
    })
  }

  const missing = validateLead(req.body, requiredFields)

  if (missing.length > 0) {
    return res.status(400).json({
      error: `Campos obrigatórios ausentes: ${missing.join(', ')}`,
    })
  }

  if (kind === 'contact') {
    console.log('[lead] contact:', {
      ...req.body,
      recebidoEm: new Date().toISOString(),
    })

    return res.status(201).json({
      ok: true,
    })
  }

  try {
    const sql = getNeonClient()

    if (kind === 'membership') {
      const row = mapMembership(req.body)

      await sql`
        INSERT INTO membership_requests
          (
            full_name,
            phone,
            email,
            about,
            reason,
            contact_consent,
            status
          )
        VALUES
          (
            ${row.full_name},
            ${row.phone},
            ${row.email},
            ${row.about},
            ${row.reason},
            ${row.contact_consent},
            ${row.status}
          )
      `
    } else {
      const row = mapVolunteer(req.body)

      await sql`
        INSERT INTO volunteer_requests
          (
            full_name,
            phone,
            email,
            about,
            area,
            has_experience,
            experience_description,
            contact_consent,
            status
          )
        VALUES
          (
            ${row.full_name},
            ${row.phone},
            ${row.email},
            ${row.about},
            ${row.area},
            ${row.has_experience},
            ${row.experience_description},
            ${row.contact_consent},
            ${row.status}
          )
      `
    }

    return res.status(201).json({
      ok: true,
    })
  } catch (error) {
    console.error(
      `[lead] falha ao salvar no Neon (${kind}):`,
      error
    )

    return res.status(500).json({
      error: 'Não foi possível salvar seu cadastro. Tente novamente.',
    })
  }
}