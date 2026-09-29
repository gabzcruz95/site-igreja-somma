import { Calendar, Clock, MapPin } from 'lucide-react'
import PhotoPlaceholder from './PhotoPlaceholder'
import { ChurchEvent } from '../data/events'

export default function EventCard({ event }: { event: ChurchEvent }) {
  return (
    <article className="group flex flex-col overflow-hidden bg-white">
      <PhotoPlaceholder label={`Foto do evento: ${event.name}`} className="aspect-[4/3] w-full" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-2xl text-chumbo-dark">{event.name}</h3>
        <p className="text-sm leading-relaxed text-chumbo/80">{event.description}</p>
        <div className="mt-auto flex flex-col gap-2 pt-4 text-sm text-chumbo/70">
          <span className="inline-flex items-center gap-2">
            <Calendar size={15} strokeWidth={1.7} /> {event.date}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock size={15} strokeWidth={1.7} /> {event.time}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin size={15} strokeWidth={1.7} /> {event.location}
          </span>
        </div>
      </div>
    </article>
  )
}
