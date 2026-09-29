import SectionTitle from '../components/SectionTitle'
import EventCard from '../components/EventCard'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import { useReveal } from '../hooks/useReveal'
import { usePageTitle } from '../hooks/usePageTitle'
import { events } from '../data/events'

export default function Events() {
  usePageTitle('Eventos')
  const listRef = useReveal<HTMLDivElement>()

  return (
    <>
      <section className="relative flex min-h-[45vh] items-end overflow-hidden bg-chumbo-dark">
        <PhotoPlaceholder
          label="Fotografia de um evento da SôMMA (substituir por imagem real)"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chumbo-dark via-chumbo-dark/50 to-chumbo-dark/10" />
        <div className="container-page relative z-10 pb-16 pt-32">
          <h1 className="max-w-2xl font-display text-5xl leading-[1.05] text-marfim md:text-6xl">
            Próximos eventos
          </h1>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="container-page flex flex-col gap-12">
          <SectionTitle
            title="Agenda da SôMMA"
            subtitle="Os eventos abaixo são dados de demonstração, usados apenas para ilustrar o layout desta página."
          />
          <div
            ref={listRef}
            className="reveal grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
