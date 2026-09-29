import somaMark from '../assets/logo/somma-mark.png'

interface LogoProps {
  variant?: 'dark' | 'light'
  className?: string
  iconOnly?: boolean
}

/**
 * Logo da Igreja SôMMA: o selo circular é o avatar oficial do Instagram
 * (@igreja.somma), extraído das imagens de referência enviadas — tratado
 * como asset da marca, sem redesenho. Acompanha o wordmark tipográfico
 * "SôMMA" para garantir legibilidade em tamanhos maiores.
 * Caso um arquivo de logo em alta resolução seja fornecido futuramente,
 * basta substituir somma-mark.png em src/assets/logo/.
 */
export default function Logo({ variant = 'dark', className = '', iconOnly = false }: LogoProps) {
  const color = variant === 'light' ? 'text-marfim' : 'text-chumbo-dark'
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img src={somaMark} alt="Igreja SôMMA" className="h-10 w-10 rounded-full object-cover" />
      {!iconOnly && (
        <span className={`font-display text-2xl font-extrabold tracking-tight ${color}`}>SôMMA</span>
      )}
    </span>
  )
}
