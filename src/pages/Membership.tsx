import { FormEvent, useState } from 'react'
import { HeartHandshake } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'
import { submitLead } from '../lib/api'

export default function Membership() {
  usePageTitle('Quero fazer parte')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = new FormData(e.currentTarget)

    try {
      await submitLead('membership', {
        nome: String(form.get('nome') ?? ''),
        whatsapp: String(form.get('whatsapp') ?? ''),
        email: String(form.get('email') ?? ''),
        sobre: String(form.get('sobre') ?? ''),
        motivo: String(form.get('motivo') ?? ''),
        consentimento: form.get('consentimento') === 'on',
      })
      setSent(true)
    } catch (err) {
      console.error(err)
      setError(
        'Não foi possível enviar seu cadastro agora. Verifique se o backend está rodando (ver README) e tente novamente, ou fale com a gente pelo WhatsApp.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <section className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-4 py-24 text-center">
        <HeartHandshake size={32} strokeWidth={1.4} className="text-oliva" />
        <h1 className="font-display text-4xl text-chumbo-dark">Recebemos seu cadastro! ❤️</h1>
        <p className="max-w-md text-chumbo/75">
          Obrigado por querer caminhar com a gente. Nossa equipe entrará em contato em breve.
        </p>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col gap-5">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-terracota">
            Quero fazer parte
          </span>
          <h1 className="font-display text-4xl leading-[1.08] text-chumbo-dark md:text-5xl">
            Acreditamos que igreja é família.
          </h1>
          <p className="max-w-prose text-base leading-relaxed text-chumbo/85 md:text-lg">
            Se você conheceu a SôMMA e deseja fazer parte dessa família, queremos conhecer você.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <div>
            <label htmlFor="nome" className="mb-2 block text-sm font-medium text-chumbo-dark">
              Nome completo
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              required
              className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm text-chumbo-dark outline-none transition-colors focus:border-terracota"
            />
          </div>
          <div>
            <label htmlFor="whatsapp" className="mb-2 block text-sm font-medium text-chumbo-dark">
              WhatsApp
            </label>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              required
              className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm text-chumbo-dark outline-none transition-colors focus:border-terracota"
            />
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
              className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm text-chumbo-dark outline-none transition-colors focus:border-terracota"
            />
          </div>
          <div>
            <label htmlFor="sobre" className="mb-2 block text-sm font-medium text-chumbo-dark">
              Conte um pouco sobre você
            </label>
            <textarea
              id="sobre"
              name="sobre"
              rows={4}
              required
              className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm text-chumbo-dark outline-none transition-colors focus:border-terracota"
            />
          </div>
          <div>
            <label htmlFor="motivo" className="mb-2 block text-sm font-medium text-chumbo-dark">
              Por que você deseja fazer parte da SôMMA?
            </label>
            <textarea
              id="motivo"
              name="motivo"
              rows={4}
              required
              className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm text-chumbo-dark outline-none transition-colors focus:border-terracota"
            />
          </div>
          <label className="flex items-start gap-3 text-sm text-chumbo/80">
            <input
              type="checkbox"
              name="consentimento"
              required
              className="mt-1 h-4 w-4 shrink-0 accent-terracota"
            />
            Autorizo a Igreja SôMMA a entrar em contato comigo a partir das informações enviadas
            neste formulário.
          </label>

          {error && (
            <p role="alert" className="border border-terracota/40 bg-terracota/5 px-4 py-3 text-sm text-terracota-dark">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="self-start bg-terracota px-7 py-3.5 text-sm font-semibold text-marfim transition-colors duration-300 hover:bg-terracota-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Enviando...' : 'Enviar cadastro'}
          </button>
        </form>
      </div>
    </section>
  )
}
