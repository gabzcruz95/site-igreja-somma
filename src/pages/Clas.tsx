import { MapPin, User } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import { useReveal } from '../hooks/useReveal'
import { usePageTitle } from '../hooks/usePageTitle'
import { clas, churchInfo } from '../data/services'

export default function Clas() {
  usePageTitle('Clãs')
  const infoRef = useReveal<HTMLDivElement>()
  const listRef = useReveal<HTMLDivElement>()

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-chumbo-dark">
        <PhotoPlaceholder
          label="Fotografia de um Clã da SôMMA (substituir por imagem real)"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chumbo-dark via-chumbo-dark/50 to-chumbo-dark/10" />
        <div className="container-page relative z-10 flex flex-col gap-3 pb-16 pt-32">
          <h1 className="max-w-2xl font-display text-5xl leading-[1.05] text-marfim md:text-6xl">
            Clãs
          </h1>
          <p className="text-lg text-marfim/80">Um lugar para pertencer.</p>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div ref={infoRef} className="reveal container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionTitle
            title="O que são os Clãs"
            subtitle="Grupos que se reúnem para viver relacionamento, comunhão e crescimento em comunidade."
          />
          <p className="max-w-prose text-base leading-relaxed text-chumbo/85 md:text-lg">
            Cada Clã é liderado por alguém da nossa comunidade e se reúne em um endereço fixo.
            Encontre abaixo o Clã mais perto de você e entre em contato para saber como participar.
          </p>
        </div>
      </section>

      <section className="bg-marfim py-24 md:py-32">
        <div ref={listRef} className="reveal container-page grid gap-6 sm:grid-cols-2">
          {clas.map((cla) => (
            <div key={cla.id} className="flex flex-col gap-4 bg-white p-10">
              <h2 className="font-display text-3xl text-chumbo-dark">{cla.name}</h2>
              <div className="flex items-center gap-2.5 text-sm text-chumbo/80">
                <User size={16} strokeWidth={1.7} className="text-terracota" />
                Líder: {cla.leader}
              </div>
              <div className="flex items-start gap-2.5 text-sm text-chumbo/80">
                <MapPin size={16} strokeWidth={1.7} className="mt-0.5 shrink-0 text-terracota" />
                {cla.address}
              </div>
              <Button
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cla.address)}`}
                variant="secondary"
                className="mt-2 self-start"
              >
                Como chegar
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page flex flex-col items-center gap-4 text-center">
          <h3 className="font-display text-2xl text-chumbo-dark">Quer saber mais antes de ir?</h3>
          <p className="max-w-md text-sm leading-relaxed text-chumbo/70">
            Fale com a gente para tirar dúvidas sobre os Clãs.
          </p>
          <Button href={churchInfo.whatsappLink} variant="primary">
            Falar com a SôMMA
          </Button>
        </div>
      </section>
    </>
  )
}
