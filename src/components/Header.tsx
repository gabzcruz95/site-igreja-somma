import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ShoppingBag } from 'lucide-react'
import Logo from './Logo'
import { useCart } from '../context/CartContext'
import { churchInfo } from '../data/services'

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/quem-somos', label: 'Quem somos' },
  { to: '/clas', label: 'Clãs' },
  { to: '/cultos', label: 'Cultos' },
  { to: '/generosidade', label: 'Generosidade' },
  { to: '/loja', label: 'Loja' },
  { to: '/quero-ser-membro', label: 'Quero ser membro' },
  { to: '/quero-servir', label: 'Quero servir' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${churchInfo.addressLine1}, ${churchInfo.addressLine2}, ${churchInfo.addressLine3}`,
  )}`

  return (
    <>
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-terracota focus:px-4 focus:py-2 focus:text-marfim"
      >
        Pular para o conteúdo
      </a>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ease-smooth ${
          scrolled
            ? 'bg-marfim/90 shadow-[0_1px_0_rgba(97,106,113,0.12)] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="container-page flex h-20 items-center justify-between">
          <Link to="/" aria-label="Igreja SôMMA — página inicial" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Navegação principal" className="hidden xl:block">
            <ul className="flex items-center gap-6 xl:gap-7">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `text-sm font-medium tracking-wide transition-colors duration-300 ${
                        isActive ? 'text-terracota' : 'text-chumbo-dark/80 hover:text-terracota'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-5 xl:flex">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-chumbo-dark/80 transition-colors hover:text-terracota"
            >
              Como chegar
            </a>
            <Link
              to="/carrinho"
              aria-label={`Carrinho de compras${itemCount > 0 ? `, ${itemCount} itens` : ''}`}
              className="relative rounded-full p-2 text-chumbo-dark transition-colors hover:text-terracota"
            >
              <ShoppingBag size={22} strokeWidth={1.6} />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-terracota px-1 text-[10px] font-bold leading-none text-marfim">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-4 xl:hidden">
            <Link
              to="/carrinho"
              aria-label={`Carrinho de compras${itemCount > 0 ? `, ${itemCount} itens` : ''}`}
              className="relative p-1 text-chumbo-dark"
            >
              <ShoppingBag size={22} strokeWidth={1.6} />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-terracota px-1 text-[9px] font-bold leading-none text-marfim">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="p-1 text-chumbo-dark"
            >
              {mobileOpen ? <X size={26} strokeWidth={1.6} /> : <Menu size={26} strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col bg-marfim transition-transform duration-500 ease-smooth xl:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container-page flex h-20 items-center justify-between">
          <Logo />
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
            className="p-1 text-chumbo-dark"
          >
            <X size={26} strokeWidth={1.6} />
          </button>
        </div>
        <nav aria-label="Navegação mobile" className="container-page mt-8 flex-1">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <li
                key={link.to}
                style={{ transitionDelay: mobileOpen ? `${i * 40 + 80}ms` : '0ms' }}
                className={`overflow-hidden border-b border-chumbo/10 transition-all duration-500 ease-smooth ${
                  mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block py-4 font-display text-3xl font-extrabold ${isActive ? 'text-terracota' : 'text-chumbo-dark'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-8 inline-block text-sm font-semibold text-terracota"
          >
            Como chegar →
          </a>
        </nav>
      </div>
    </>
  )
}
