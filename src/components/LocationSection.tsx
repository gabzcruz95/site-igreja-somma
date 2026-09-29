import { MapPin } from 'lucide-react'
import Button from './Button'
import SectionTitle from './SectionTitle'
import { churchInfo } from '../data/services'

export default function LocationSection() {
  const address = `${churchInfo.addressLine1}, ${churchInfo.addressLine2}, ${churchInfo.addressLine3}`
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  return (
    <section className="bg-marfim py-24 md:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionTitle title="A igreja é aqui." />
          <div className="flex items-start gap-3 text-chumbo-dark">
            <MapPin size={20} strokeWidth={1.6} className="mt-0.5 shrink-0 text-terracota" />
            <p className="text-lg leading-relaxed">
              {churchInfo.addressLine1}
              <br />
              {churchInfo.addressLine2}
              <br />
              {churchInfo.addressLine3}
            </p>
          </div>
          <div>
            <Button href={mapsUrl} variant="primary">
              Como chegar
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden border border-chumbo/10 bg-white lg:aspect-square">
          <div className="placeholder-photo absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            <MapPin size={28} strokeWidth={1.4} className="text-chumbo/40" />
            <span className="max-w-[220px] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-chumbo/50">
              Mapa a ser integrado (Google Maps API)
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
