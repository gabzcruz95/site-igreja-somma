import { Calendar, Clock, MapPin } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'
import Button from '../components/Button'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import LocationSection from '../components/LocationSection'
import { useReveal } from '../hooks/useReveal'
import { usePageTitle } from '../hooks/usePageTitle'
import { churchInfo } from '../data/services'

export default function Services() {
  usePageTitle('Cultos')
  const infoRef = useReveal<HTMLDivElement>()
  const address = `${churchInfo.addressLine1}, ${churchInfo.addressLine2}, ${churchInfo.addressLine3}`
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  return (
    <>
      <section className="relative flex min-h-[55vh] items-end overflow-hidden bg-chumbo-dark">
        <PhotoPlaceholder
          label="Fotografia de um culto da SôMMA (substituir por imagem real)"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chumbo-dark via-chumbo-dark/50 to-chumbo-dark/10" />
        <div className="container-page relative z-10 pb-16 pt-32">
          <h1 className="max-w-2xl font-display text-5xl leading-[1.05] text-marfim md:text-6xl">
            Nossos cultos
          </h1>
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div ref={infoRef} className="reveal container-page flex flex-col gap-12">
          <SectionTitle
            title="Um encontro semanal com Deus e com a família"
            subtitle="Toda semana nos reunimos para adorar, ouvir a Palavra e viver comunhão uns com os outros."
          />
          <div className="grid gap-8 border-y border-chumbo/10 py-10 md:grid-cols-3">
            <ServiceCard icon={<Calendar size={22} strokeWidth={1.5} />} label="Dia" value={churchInfo.serviceDay} />
            <ServiceCard icon={<Clock size={22} strokeWidth={1.5} />} label="Horário" value={churchInfo.serviceTime} />
            <ServiceCard icon={<MapPin size={22} strokeWidth={1.5} />} label="Endereço" value="Mauá - SP" />
          </div>
          <div className="flex flex-col gap-2 text-chumbo/80">
            <p>{churchInfo.addressLine1}</p>
            <p>{churchInfo.addressLine2}</p>
            <p>{churchInfo.addressLine3}</p>
          </div>
          <Button href={mapsUrl} variant="primary" className="self-start">
            Como chegar
          </Button>
        </div>
      </section>

      <LocationSection />
    </>
  )
}
