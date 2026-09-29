import { FormEvent, useState } from 'react'
import { Instagram, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import { usePageTitle } from '../hooks/usePageTitle'
import { churchInfo } from '../data/services'
import { submitLead } from '../lib/api'

export default function Contact() {
  usePageTitle('Contato')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = new FormData(e.currentTarget)

    try {
      await submitLead('contact', {
        nome: String(form.get('nome') ?? ''),
        email: String(form.get('email') ?? ''),
        telefone: String(form.get('telefone') ?? ''),
        mensagem: String(form.get('mensagem') ?? ''),
      })
      setSent(true)
    } catch (err) {
      console.error(err)
      setError(
        'Não foi possível enviar sua mensagem agora. Verifique se o backend está rodando (ver README) e tente novamente, ou fale com a gente pelo WhatsApp.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-page grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col gap-10">
          <SectionTitle title="Fale com a SôMMA" subtitle="Estamos por perto — e adoraríamos ouvir você." />

          <ul className="flex flex-col gap-6">
            <li className="flex items-start gap-4">
              <Instagram size={20} strokeWidth={1.6} className="mt-0.5 text-terracota" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-chumbo/55">
                  Instagram
                </p>
                <a
                  href={churchInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chumbo-dark transition-colors hover:text-terracota"
                >
                  {churchInfo.instagramHandle}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MessageCircle size={20} strokeWidth={1.6} className="mt-0.5 text-terracota" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-chumbo/55">
                  WhatsApp
                </p>
                <a
                  href={churchInfo.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-chumbo-dark transition-colors hover:text-terracota"
                >
                  {churchInfo.whatsapp}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Mail size={20} strokeWidth={1.6} className="mt-0.5 text-terracota" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-chumbo/55">
                  E-mail
                </p>
                <p className="text-chumbo-dark">{churchInfo.email}</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin size={20} strokeWidth={1.6} className="mt-0.5 text-terracota" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-chumbo/55">
                  Endereço
                </p>
                <p className="text-chumbo-dark">
                  {churchInfo.addressLine1}, {churchInfo.addressLine2}, {churchInfo.addressLine3}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Clock size={20} strokeWidth={1.6} className="mt-0.5 text-terracota" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-chumbo/55">
                  Horários
                </p>
                <p className="text-chumbo-dark">
                  Cultos aos {churchInfo.serviceDay.toLowerCase()}s, às {churchInfo.serviceTime}
                </p>
              </div>
            </li>
          </ul>

          <Button href={churchInfo.whatsappLink} variant="primary" className="self-start">
            <MessageCircle size={16} strokeWidth={1.8} />
            Falar no WhatsApp
          </Button>

          <div className="border border-chumbo/15 bg-marfim p-6">
            <h3 className="font-display text-xl text-chumbo-dark">Generosidade</h3>
            <p className="mt-2 text-sm leading-relaxed text-chumbo/75">
              Faça sua oferta e dízimos através do nosso Pix:{' '}
              <span className="font-medium text-chumbo-dark">{churchInfo.pixKey}</span>
            </p>
          </div>
        </div>

        <div>
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 bg-marfim p-10 text-center">
              <h3 className="font-display text-2xl text-chumbo-dark">Mensagem enviada!</h3>
              <p className="text-sm text-chumbo/70">
                Recebemos seu contato e retornaremos em breve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="nome" className="mb-2 block text-sm font-medium text-chumbo-dark">
                  Nome
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
                <label htmlFor="telefone" className="mb-2 block text-sm font-medium text-chumbo-dark">
                  Telefone
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm text-chumbo-dark outline-none transition-colors focus:border-terracota"
                />
              </div>
              <div>
                <label htmlFor="mensagem" className="mb-2 block text-sm font-medium text-chumbo-dark">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={5}
                  required
                  className="w-full border border-chumbo/25 bg-white px-4 py-3 text-sm text-chumbo-dark outline-none transition-colors focus:border-terracota"
                />
              </div>
              {error && (
                <p role="alert" className="border border-terracota/40 bg-terracota/5 px-4 py-3 text-sm text-terracota-dark">
                  {error}
                </p>
              )}
              <Button type="submit" onClick={() => {}} variant="primary" className="self-start">
                {loading ? 'Enviando...' : 'Enviar mensagem'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
