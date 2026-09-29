import { MercadoPagoConfig, Payment } from 'mercadopago'

/**
 * Vercel Serverless Function: POST /api/webhooks/mercadopago
 *
 * O Mercado Pago chama esta URL de forma assíncrona sempre que o status de um
 * pagamento muda (aprovado, pendente, rejeitado, estornado etc.), independente
 * de o comprador ter voltado para o site ou não. É AQUI — e não na tela de
 * confirmação do frontend — que o pedido deve ser marcado como pago de verdade.
 *
 * TODO antes de ir para produção:
 *  1. Validar a assinatura/segredo do webhook (Mercado Pago > Notificações > assinatura secreta).
 *  2. Persistir o pedido e o status em um banco de dados (ex.: Vercel Postgres, Supabase).
 *  3. Disparar e-mail/WhatsApp de confirmação para o comprador e para a igreja.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método não permitido.' })
  }

  try {
    const { type, data } = req.body ?? {}

    if (type === 'payment' && data?.id && process.env.MP_ACCESS_TOKEN) {
      const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })
      const payment = new Payment(client)
      const paymentInfo = await payment.get({ id: data.id })

      console.log('[webhook mercadopago] pagamento recebido:', {
        id: paymentInfo.id,
        status: paymentInfo.status,
        statusDetail: paymentInfo.status_detail,
        orderAmount: paymentInfo.transaction_amount,
      })

      // TODO: atualizar o pedido correspondente no seu banco de dados aqui.
    }

    // Sempre responder 200 rapidamente, ou o Mercado Pago vai reenviar a notificação.
    return res.status(200).json({ received: true })
  } catch (error) {
    console.error('Erro ao processar webhook do Mercado Pago:', error)
    return res.status(500).json({ error: 'Erro ao processar webhook.' })
  }
}
