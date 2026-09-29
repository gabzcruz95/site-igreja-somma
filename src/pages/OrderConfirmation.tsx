import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, Clock, XCircle } from 'lucide-react'
import Button from '../components/Button'
import { useCart } from '../context/CartContext'
import { usePageTitle } from '../hooks/usePageTitle'

// O Mercado Pago redireciona de volta para esta página usando os back_urls
// configurados na preferência (ver api/checkout/create-preference.js), anexando parâmetros como
// ?status=approved|pending|rejected e ?payment_id=... na URL.
type Status = 'approved' | 'pending' | 'rejected' | 'unknown'

const STATUS_CONTENT: Record<Status, { title: string; description: string; icon: JSX.Element; tone: string }> = {
  approved: {
    title: 'Pagamento aprovado!',
    description: 'Recebemos seu pedido e seu pagamento foi confirmado. Em breve entraremos em contato sobre a entrega.',
    icon: <CheckCircle2 size={40} strokeWidth={1.4} className="text-oliva" />,
    tone: 'text-oliva',
  },
  pending: {
    title: 'Pagamento em processamento',
    description: 'Recebemos seu pedido e estamos aguardando a confirmação do pagamento (comum no Pix e boleto). Avisaremos assim que for aprovado.',
    icon: <Clock size={40} strokeWidth={1.4} className="text-terracota" />,
    tone: 'text-terracota',
  },
  rejected: {
    title: 'Pagamento não aprovado',
    description: 'Não conseguimos confirmar seu pagamento. Você pode tentar novamente ou usar outra forma de pagamento.',
    icon: <XCircle size={40} strokeWidth={1.4} className="text-chumbo" />,
    tone: 'text-chumbo-dark',
  },
  unknown: {
    title: 'Pedido recebido',
    description: 'Assim que recebermos a confirmação do Mercado Pago, atualizaremos o status do seu pedido.',
    icon: <Clock size={40} strokeWidth={1.4} className="text-chumbo" />,
    tone: 'text-chumbo-dark',
  },
}

export default function OrderConfirmation() {
  usePageTitle('Confirmação do pedido')
  const [searchParams] = useSearchParams()
  const { clearCart } = useCart()

  const status: Status = useMemo(() => {
    const raw = searchParams.get('status')
    if (raw === 'approved' || raw === 'pending' || raw === 'rejected') return raw
    return 'unknown'
  }, [searchParams])

  const paymentId = searchParams.get('payment_id')
  const content = STATUS_CONTENT[status]

  useEffect(() => {
    if (status === 'approved') {
      clearCart()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-5 py-24 text-center">
      {content.icon}
      <h1 className={`font-display text-4xl ${content.tone}`}>{content.title}</h1>
      <p className="max-w-md text-chumbo/75">{content.description}</p>
      {paymentId && <p className="text-xs text-chumbo/40">Referência do pagamento: {paymentId}</p>}
      <Button to="/loja" variant="primary">
        Voltar para a loja
      </Button>
    </section>
  )
}
