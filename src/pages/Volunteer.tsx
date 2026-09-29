import { FormEvent, useState } from 'react'
import { Handshake } from 'lucide-react'
import { usePageTitle } from '../hooks/usePageTitle'
import { volunteerAreas } from '../data/volunteerAreas'
import { submitLead } from '../lib/api'

export default function Volunteer() {
  usePageTitle('Quero servir')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = new FormData(e.currentTarget)

    try {
      await submitLead('volunteer', {
        nome: String(form.get('nome') ?? ''),
        whatsapp: String(form.get('whatsapp') ?? ''),
        email: String(form.get('email') ?? ''),
        sobre: String(form.get('sobre') ?? ''),
        area: String(form.get('area') ?? ''),
        experiencia: String(form.get('experiencia') ?? ''),
        detalhes: String(form.get('detalhes') ?? ''),
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
        <Handshake size={32} strokeWidth={1.4} className="text-terracota" />
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
            Quero servir
          </span>
          <h1 className="font-display text-4xl leading-[1.08] text-chumbo-dark md:text-5xl">
            A igreja é feita por pessoas.
          </h1>
          <p className="max-w-prose text-base leading-relaxed text-chumbo/85 md:text-lg">
            A igreja é feita por pessoas que colocam seus dons, talentos e disposição a serviço do
            Reino. Se você deseja servir na SôMMA, queremos conhecer você.
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
              rows={3}
              required
              className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm text-chumbo-dark outline-none transition-colors focus:border-terracota"
            />
          </div>
          <div>
            <label htmlFor="area" className="mb-2 block text-sm font-medium text-chumbo-dark">
              Em qual área você gostaria de servir?
            </label>
            <select
              id="area"
              name="area"
              required
              defaultValue=""
              className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm text-chumbo-dark outline-none transition-colors focus:border-terracota"
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              {volunteerAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <p className="mt-1.5 text-xs text-chumbo/50">
              As opções acima representam áreas de interesse, não uma lista oficial de ministérios.
            </p>
          </div>
          <fieldset>
            <legend className="mb-2 block text-sm font-medium text-chumbo-dark">
              Você já possui experiência nessa área?
            </legend>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-chumbo-dark">
                <input type="radio" name="experiencia" value="sim" required className="accent-terracota" />
                Sim
              </label>
              <label className="flex items-center gap-2 text-sm text-chumbo-dark">
                <input type="radio" name="experiencia" value="nao" required className="accent-terracota" />
                Não
              </label>
            </div>
          </fieldset>
          <div>
            <label htmlFor="detalhes" className="mb-2 block text-sm font-medium text-chumbo-dark">
              Conte um pouco mais sobre como gostaria de ajudar
            </label>
            <textarea
              id="detalhes"
              name="detalhes"
              rows={4}
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
