interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'left',
  tone = 'dark',
  className = '',
}: SectionTitleProps) {
  const alignClasses = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'
  const titleColor = tone === 'light' ? 'text-marfim' : 'text-chumbo-dark'
  const subtitleColor = tone === 'light' ? 'text-marfim/70' : 'text-chumbo/80'

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignClasses} ${className}`}>
      <h2 className={`font-display text-4xl leading-[1.08] md:text-5xl ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base leading-relaxed md:text-lg ${subtitleColor}`}>{subtitle}</p>
      )}
    </div>
  )
}
