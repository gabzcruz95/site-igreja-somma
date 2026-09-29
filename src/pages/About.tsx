import SectionTitle from '../components/SectionTitle'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import { useReveal } from '../hooks/useReveal'
import { usePageTitle } from '../hooks/usePageTitle'
import { aboutContent } from '../data/services'

const pillars = [
  {
    title: 'Quem somos',
    text: aboutContent.quemSomos,
  },
  {
    title: 'Nosso propósito',
    text: aboutContent.proposito,
  },
  {
    title: 'Nossa história',
    text: '[PLACEHOLDER — história da Igreja SôMMA a ser fornecida.]',
  },
  {
    title: 'Nossos valores',
    text: '[PLACEHOLDER — valores da Igreja SôMMA a ser fornecidos.]',
  },
]

export default function About() {
  usePageTitle('Quem somos')
  const introRef = useReveal<HTMLDivElement>()
  const pillarsRef = useReveal<HTMLDivElement>()

  return (
    <>
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-chumbo-dark">
        <PhotoPlaceholder
          label="Fotografia da comunidade SôMMA (substituir por imagem real)"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chumbo-dark via-chumbo-dark/50 to-chumbo-dark/10" />
        <div className="container-page relative z-10 pb-16 pt-32">
          <h1 className="max-w-2xl font-display text-5xl leading-[1.05] text-marfim md:text-6xl">
            Quem somos
          </h1>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div ref={introRef} className="reveal container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionTitle
            title="Uma família comprometida com a verdade do evangelho"
            subtitle="A SôMMA é uma família simples, objetiva e comprometida com a verdade do evangelho."
          />
          <p className="max-w-prose text-base leading-relaxed text-chumbo/85 md:text-lg">
            Ser igreja é ser bem mais do que aquilo que foi imaginado ou programado pelo homem.
            Igreja é algo proposto por Deus. Acreditamos que existimos para viver o evangelho
            através do amor, do cuidado e do relacionamento entre pessoas — em comunidade, como uma
            só família, com Cristo como nossa essência.
          </p>
        </div>
      </section>

      <section className="bg-marfim py-24 md:py-32">
        <div ref={pillarsRef} className="reveal container-page grid gap-px overflow-hidden bg-chumbo/10 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="flex flex-col gap-3 bg-marfim p-10 md:p-12">
              <h3 className="font-display text-2xl text-chumbo-dark">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-chumbo/70">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
