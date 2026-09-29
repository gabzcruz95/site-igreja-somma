import { ReactNode } from 'react'

interface ServiceCardProps {
  icon: ReactNode
  label: string
  value: string
}

export default function ServiceCard({ icon, label, value }: ServiceCardProps) {
  return (
    <div className="flex items-start gap-4 border-t border-chumbo/15 py-6 first:border-t-0 md:border-t-0 md:border-l md:py-0 md:pl-8 md:first:border-l-0 md:first:pl-0">
      <div className="mt-0.5 text-terracota">{icon}</div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-chumbo/55">{label}</p>
        <p className="mt-1 font-display text-2xl text-chumbo-dark">{value}</p>
      </div>
    </div>
  )
}
