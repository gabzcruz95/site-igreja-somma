// Cliente simples para as funções em /api (Vercel Serverless Functions).
// Nunca fala direto com a API do Mercado Pago a partir do navegador — o
// Access Token nunca existe no frontend, só nas funções em /api.
//
// Como o frontend e as funções de /api são publicados juntos, no mesmo
// domínio, o padrão '/api' funciona tanto em desenvolvimento (com
// `npx vercel dev`) quanto em produção, sem nenhuma configuração extra.
// VITE_API_URL só precisa ser definida se um dia a API for hospedada em
// outro domínio.

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export interface CheckoutItemInput {
  id: string
  title: string
  quantity: number
  unitPrice: number
  size?: string
  color?: string
}

export interface CheckoutPayerInput {
  name: string
  email: string
  phone: string
  address: {
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

export interface CreatePreferenceResponse {
  id: string
  initPoint: string
}

/**
 * Pede ao nosso backend para criar uma preferência de pagamento no Mercado Pago
 * e devolve a URL (init_point) para onde o navegador deve ser redirecionado.
 * O backend é o único lugar que conhece o Access Token do Mercado Pago.
 */
export async function createCheckoutPreference(payload: {
  items: CheckoutItemInput[]
  payer: CheckoutPayerInput
}): Promise<CreatePreferenceResponse> {
  const response = await fetch(`${API_BASE_URL}/checkout/create-preference`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(text || `Falha ao criar preferência de pagamento (HTTP ${response.status})`)
  }

  return response.json()
}

/**
 * Envia um formulário de lead (membro, voluntário ou contato) para o backend.
 * `kind` decide o endpoint (`/api/leads/<kind>`); `data` é o corpo já validado
 * no frontend (o backend também valida os campos obrigatórios).
 */
export async function submitLead(
  kind: 'membership' | 'volunteer' | 'contact',
  data: Record<string, string | boolean>,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/leads/${kind}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(text || `Não foi possível enviar o formulário (HTTP ${response.status})`)
  }
}
