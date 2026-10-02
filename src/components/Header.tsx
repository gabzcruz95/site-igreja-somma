import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ShoppingBag, ArrowUpRight } from 'lucide-react'
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-terracota focus:px-4 focus:py-2 focus:text-marfim"
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
          <Link
            to="/"
            aria-label="Igreja SôMMA — página inicial"
            className="shrink-0"
          >
            <Logo />
          </Link>

          <nav
            aria-label="Navegação principal"
            className="hidden xl:block"
          >
            <ul className="flex items-center gap-6 xl:gap-7">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `text-sm font-medium tracking-wide transition-colors duration-300 ${
                        isActive
                          ? 'text-terracota'
                          : 'text-chumbo-dark/80 hover:text-terracota'
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
              aria-label={`Carrinho de compras${
                itemCount > 0 ? `, ${itemCount} itens` : ''
              }`}
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

          <div className="flex items-center gap-3 xl:hidden">
            <Link
              to="/carrinho"
              aria-label={`Carrinho de compras${
                itemCount > 0 ? `, ${itemCount} itens` : ''
              }`}
              className="relative rounded-full p-2 text-chumbo-dark transition-colors hover:text-terracota"
            >
              <ShoppingBag size={21} strokeWidth={1.6} />

              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-terracota px-1 text-[9px] font-bold leading-none text-marfim">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-chumbo/15 text-chumbo-dark transition-colors hover:border-terracota hover:text-terracota"
            >
              {mobileOpen ? (
                <X size={21} strokeWidth={1.7} />
              ) : (
                <Menu size={21} strokeWidth={1.7} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MENU MOBILE */}
      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-[60] xl:hidden ${
          mobileOpen
            ? 'pointer-events-auto'
            : 'pointer-events-none'
        }`}
      >
        {/* Fundo escurecido */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-chumbo-dark/30 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Painel */}
        <div
          className={`absolute right-0 top-0 flex h-full w-[88%] max-w-md flex-col bg-marfim shadow-2xl transition-transform duration-500 ease-smooth ${
            mobileOpen
              ? 'translate-x-0'
              : 'translate-x-full'
          }`}
        >
          {/* Cabeçalho do menu */}
          <div className="flex h-20 shrink-0 items-center justify-between border-b border-chumbo/10 px-6">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              aria-label="Igreja SôMMA — página inicial"
              className="shrink-0"
            >
              <Logo />
            </Link>

            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chumbo-dark text-marfim transition-transform duration-300 hover:scale-105"
            >
              <X size={21} strokeWidth={1.7} />
            </button>
          </div>

          {/* Links */}
          <nav
            aria-label="Navegação mobile"
            className="flex-1 overflow-y-auto px-6 py-7"
          >
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-chumbo/40">
              Navegação
            </p>

            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <li
                  key={link.to}
                  style={{
                    transitionDelay: mobileOpen
                      ? `${i * 35 + 50}ms`
                      : '0ms',
                  }}
                  className={`border-b border-chumbo/10 transition-all duration-400 ease-smooth ${
                    mobileOpen
                      ? 'translate-x-0 opacity-100'
                      : 'translate-x-5 opacity-0'
                  }`}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `group flex items-center justify-between py-3.5 transition-colors ${
                        isActive
                          ? 'text-terracota'
                          : 'text-chumbo-dark hover:text-terracota'
                      }`
                    }
                  >
                    <span className="font-display text-[1.35rem] font-bold tracking-tight">
                      {link.label}
                    </span>

                    <span className="translate-x-2 text-lg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      →
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Ações */}
            <div className="mt-7 grid grid-cols-2 gap-3">
              <Link
                to="/carrinho"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between border border-chumbo/15 px-4 py-3.5 text-xs font-semibold text-chumbo-dark transition-colors hover:border-terracota hover:text-terracota"
              >
                <span>Meu carrinho</span>
                <ShoppingBag size={17} strokeWidth={1.6} />
              </Link>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between bg-terracota px-4 py-3.5 text-xs font-semibold text-marfim transition-colors hover:bg-terracota/90"
              >
                <span>Como chegar</span>
                <ArrowUpRight size={17} strokeWidth={1.7} />
              </a>
            </div>

            <div className="mt-7 border-t border-chumbo/10 pt-5">
              <p className="text-[11px] leading-relaxed text-chumbo/40">
                Igreja SôMMA
                <br />
                Uma comunidade para viver, servir e multiplicar.
              </p>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}