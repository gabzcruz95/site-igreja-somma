import { useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import CartItemRow from '../components/CartItem'
import Button from '../components/Button'
import { useCart } from '../context/CartContext'
import { usePageTitle } from '../hooks/usePageTitle'

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function Cart() {
  usePageTitle('Carrinho')
  const { items, subtotal, total, clearCart } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-4 py-24 text-center">
        <ShoppingBag size={40} strokeWidth={1.3} className="text-chumbo/30" />
        <h1 className="font-display text-3xl text-chumbo-dark">Seu carrinho está vazio</h1>
        <p className="text-chumbo/70">Que tal dar uma olhada na SôMMA Store?</p>
        <Button to="/loja" variant="primary">
          Ir para a loja
        </Button>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">
        <div>
          <h1 className="mb-8 font-display text-4xl text-chumbo-dark">Seu carrinho</h1>
          <div>
            {items.map((item) => (
              <CartItemRow
                key={`${item.productId}-${item.size ?? 'x'}-${item.color ?? 'x'}`}
                item={item}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={clearCart}
            className="mt-6 text-sm font-medium text-chumbo/55 underline-offset-2 hover:text-terracota hover:underline"
          >
            Esvaziar carrinho
          </button>
        </div>

        <aside className="h-fit bg-marfim p-8">
          <h2 className="font-display text-2xl text-chumbo-dark">Resumo do pedido</h2>
          <dl className="mt-6 flex flex-col gap-3 text-sm">
            <div className="flex justify-between text-chumbo/75">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-chumbo/60">
              <dt>Frete</dt>
              <dd>Calculado no checkout</dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-between border-t border-chumbo/15 pt-4 font-medium text-chumbo-dark">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <Button onClick={() => navigate('/loja/checkout')} variant="primary" className="mt-6 w-full">
            Finalizar pedido
          </Button>
          <p className="mt-3 text-center text-xs text-chumbo/50">
            Pagamento processado com segurança via Mercado Pago (Pix ou cartão).
          </p>
        </aside>
      </div>
    </section>
  )
}
