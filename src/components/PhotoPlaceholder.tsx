interface PhotoPlaceholderProps {
  label: string
  className?: string
}

/**
 * Placeholder visual usado no lugar de fotografias reais da igreja,
 * que ainda não foram fornecidas. Substituir por <img> real quando
 * as fotos oficiais estiverem disponíveis em src/assets/images/.
 */
export default function PhotoPlaceholder({ label, className = '' }: PhotoPlaceholderProps) {
  return (
    <div
      className={`placeholder-photo relative flex items-center justify-center overflow-hidden ${className}`}
      role="img"
      aria-label={label}
    >
      <span className="px-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-chumbo/50">
        {label}
      </span>
    </div>
  )
}
