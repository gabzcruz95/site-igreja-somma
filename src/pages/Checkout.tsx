import { FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { CreditCard, QrCode } from 'lucide-react'
import Button from '../components/Button'
import { useCart } from '../context/CartContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { createCheckoutPreference } from '../lib/api'

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

type PaymentMethod = 'pix' | 'cartao'

export default function Checkout() {
  usePageTitle('Checkout')
  const { items, total } = useCart()
  const navigate = useNavigate()

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (items.length === 0) {
    return <Navigate to="/loja" replace />
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = new FormData(e.currentTarget)

    try {
      const { initPoint } = await createCheckoutPreference({
        items: items.map((item) => ({
          id: item.productId,
          title: item.name,
          quantity: item.quantity,
          unitPrice: item.price,
          size: item.size,
          color: item.color,
        })),
        payer: {
          name: String(form.get('nome') ?? ''),
          email: String(form.get('email') ?? ''),
          phone: String(form.get('telefone') ?? ''),
          address: {
            street: String(form.get('rua') ?? ''),
            number: String(form.get('numero') ?? ''),
            complement: String(form.get('complemento') ?? ''),
            neighborhood: String(form.get('bairro') ?? ''),
            city: String(form.get('cidade') ?? ''),
            state: String(form.get('estado') ?? ''),
            zipCode: String(form.get('cep') ?? ''),
          },
        },
        // paymentMethod é usado apenas para pré-selecionar a aba no Checkout Pro
        // do Mercado Pago; a cobrança de fato acontece no ambiente do Mercado Pago.
      })

      window.location.href = initPoint
    } catch (err) {
      console.error(err)
      setError(
        'Não foi possível conectar ao servidor de pagamentos agora. Verifique se o backend está rodando (ver README) e tente novamente.',
      )
      setLoading(false)
    }
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10" noValidate>
          <div>
            <h1 className="mb-2 font-display text-4xl text-chumbo-dark">Checkout</h1>
            <p className="text-sm text-chumbo/60">
              Preencha seus dados para finalizar o pedido com segurança.
            </p>
          </div>

          <fieldset className="flex flex-col gap-5">
            <legend className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-chumbo/55">
              Seus dados
            </legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className="mb-2 block text-sm font-medium text-chumbo-dark">
                  Nome completo
                </label>
                <input
                  id="nome"
                  name="nome"
                  required
                  className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm outline-none focus:border-terracota"
                />
              </div>
              <div>
                <label htmlFor="telefone" className="mb-2 block text-sm font-medium text-chumbo-dark">
                  Telefone / WhatsApp
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  required
                  className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm outline-none focus:border-terracota"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-chumbo-dark">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm outline-none focus:border-terracota"
              />
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-5">
            <legend className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-chumbo/55">
              Endereço de entrega
            </legend>
            <div className="grid gap-5 sm:grid-cols-[2fr_1fr]">
              <div>
                <label htmlFor="rua" className="mb-2 block text-sm font-medium text-chumbo-dark">
                  Rua
                </label>
                <input
                  id="rua"
                  name="rua"
                  required
                  className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm outline-none focus:border-terracota"
                />
              </div>
              <div>
                <label htmlFor="numero" className="mb-2 block text-sm font-medium text-chumbo-dark">
                  Número
                </label>
                <input
                  id="numero"
                  name="numero"
                  required
                  className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm outline-none focus:border-terracota"
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="complemento" className="mb-2 block text-sm font-medium text-chumbo-dark">
                  Complemento (opcional)
                </label>
                <input
                  id="complemento"
                  name="complemento"
                  className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm outline-none focus:border-terracota"
                />
              </div>
              <div>
                <label htmlFor="bairro" className="mb-2 block text-sm font-medium text-chumbo-dark">
                  Bairro
                </label>
                <input
                  id="bairro"
                  name="bairro"
                  required
                  className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm outline-none focus:border-terracota"
                />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-[2fr_1fr_1fr]">
              <div>
                <label htmlFor="cidade" className="mb-2 block text-sm font-medium text-chumbo-dark">
                  Cidade
                </label>
                <input
                  id="cidade"
                  name="cidade"
                  required
                  className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm outline-none focus:border-terracota"
                />
              </div>
              <div>
                <label htmlFor="estado" className="mb-2 block text-sm font-medium text-chumbo-dark">
                  Estado
                </label>
                <input
                  id="estado"
                  name="estado"
                  required
                  maxLength={2}
                  placeholder="SP"
                  className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm uppercase outline-none focus:border-terracota"
                />
              </div>
              <div>
                <label htmlFor="cep" className="mb-2 block text-sm font-medium text-chumbo-dark">
                  CEP
                </label>
                <input
                  id="cep"
                  name="cep"
                  required
                  className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm outline-none focus:border-terracota"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-chumbo/55">
              Forma de pagamento
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label
                className={`flex cursor-pointer items-center gap-3 border p-4 transition-colors ${
                  paymentMethod === 'pix' ? 'border-terracota bg-terracota/5' : 'border-chumbo/25'
                }`}
              >
                <input
                  type="radio"
                  name="metodo"
                  value="pix"
                  checked={paymentMethod === 'pix'}
                  onChange={() => setPaymentMethod('pix')}
                  className="accent-terracota"
                />
                <QrCode size={20} strokeWidth={1.6} className="text-chumbo-dark" />
                <span className="text-sm font-medium text-chumbo-dark">Pix</span>
              </label>
              <label
                className={`flex cursor-pointer items-center gap-3 border p-4 transition-colors ${
                  paymentMethod === 'cartao' ? 'border-terracota bg-terracota/5' : 'border-chumbo/25'
                }`}
              >
                <input
                  type="radio"
                  name="metodo"
                  value="cartao"
                  checked={paymentMethod === 'cartao'}
                  onChange={() => setPaymentMethod('cartao')}
                  className="accent-terracota"
                />
                <CreditCard size={20} strokeWidth={1.6} className="text-chumbo-dark" />
                <span className="text-sm font-medium text-chumbo-dark">Cartão</span>
              </label>
            </div>
            <p className="mt-3 text-xs text-chumbo/50">
              Você será redirecionado ao ambiente seguro do Mercado Pago para concluir o pagamento
              com {paymentMethod === 'pix' ? 'Pix' : 'cartão'}.
            </p>
          </fieldset>

          {error && (
            <p role="alert" className="border border-terracota/40 bg-terracota/5 px-4 py-3 text-sm text-terracota-dark">
              {error}
            </p>
          )}

          <Button type="submit" onClick={() => {}} variant="primary" className="self-start">
            {loading ? 'Redirecionando...' : 'Ir para pagamento'}
          </Button>
        </form>

        <aside className="h-fit bg-marfim p-8">
          <h2 className="font-display text-2xl text-chumbo-dark">Resumo do pedido</h2>
          <ul className="mt-6 flex flex-col gap-4">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.size ?? 'x'}-${item.color ?? 'x'}`}
                className="flex justify-between gap-3 text-sm"
              >
                <span className="text-chumbo/80">
                  {item.name}
                  {item.color && ` · ${item.color}`}
                  {item.size && ` · ${item.size}`}
                  {' × '}
                  {item.quantity}
                </span>
                <span className="shrink-0 font-medium text-chumbo-dark">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between border-t border-chumbo/15 pt-4 font-medium text-chumbo-dark">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/carrinho')}
            className="mt-4 text-xs font-medium text-chumbo/55 underline-offset-2 hover:text-terracota hover:underline"
          >
            Voltar ao carrinho
          </button>
        </aside>
      </div>
    </section>
  )
}
