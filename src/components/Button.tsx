import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'

interface BaseProps {
  children: ReactNode
  variant?: Variant
  className?: string
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-terracota text-marfim hover:bg-terracota-dark',
  secondary: 'bg-transparent text-chumbo-dark border border-chumbo/30 hover:border-chumbo-dark',
  ghost: 'bg-transparent text-marfim border border-marfim/40 hover:bg-marfim/10',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 ease-smooth focus-visible:outline-offset-4'

interface LinkButtonProps extends BaseProps {
  to: string
  href?: never
  onClick?: never
}

interface AnchorButtonProps extends BaseProps {
  href: string
  to?: never
  onClick?: never
}

interface ClickButtonProps extends BaseProps {
  onClick: () => void
  to?: never
  href?: never
  type?: 'button' | 'submit'
}

type ButtonProps = LinkButtonProps | AnchorButtonProps | ClickButtonProps

export default function Button(props: ButtonProps) {
  const { children, variant = 'primary', className = '' } = props
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  const { onClick, type = 'button' } = props as ClickButtonProps
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
