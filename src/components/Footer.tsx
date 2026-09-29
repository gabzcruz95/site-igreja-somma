import { Link } from 'react-router-dom'
import { Instagram, Mail, MapPin, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import { churchInfo } from '../data/services'

const columns = [
  {
    title: 'Comunidade',
    links: [
      { to: '/quem-somos', label: 'Quem somos' },
      { to: '/clas', label: 'Clãs' },
      { to: '/cultos', label: 'Cultos' },
    ],
  },
  {
    title: 'Participe',
    links: [
      { to: '/quero-ser-membro', label: 'Quero ser membro' },
      { to: '/quero-servir', label: 'Quero servir' },
      { to: '/contato', label: 'Contato' },
    ],
  },
  {
    title: 'Loja',
    links: [
      { to: '/loja', label: 'SôMMA Store' },
      { to: '/carrinho', label: 'Carrinho' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-chumbo-dark text-marfim">
      <div className="container-page grid gap-14 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_repeat(3,0.8fr)] lg:gap-10">
        <div className="flex flex-col gap-5">
          <Logo variant="light" />
          <p className="max-w-xs text-sm leading-relaxed text-marfim/65">
            Um corpo, uma família, uma essência: Cristo. Uma comunidade vivendo o evangelho através
            do amor, cuidado e relacionamento.
          </p>
          <div className="flex items-center gap-4 pt-1">
            <a
              href={churchInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Igreja SôMMA"
              className="rounded-full border border-marfim/25 p-2.5 transition-colors hover:border-terracota hover:text-terracota"
            >
              <Instagram size={18} strokeWidth={1.6} />
            </a>
            <a
              href={churchInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da Igreja SôMMA"
              className="rounded-full border border-marfim/25 p-2.5 transition-colors hover:border-terracota hover:text-terracota"
            >
              <MessageCircle size={18} strokeWidth={1.6} />
            </a>
            <a
              href={churchInfo.email === '[E-MAIL]' ? undefined : `mailto:${churchInfo.email}`}
              aria-label="E-mail da Igreja SôMMA"
              className="rounded-full border border-marfim/25 p-2.5 transition-colors hover:border-terracota hover:text-terracota"
            >
              <Mail size={18} strokeWidth={1.6} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-marfim/50">
              {col.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-marfim/80 transition-colors hover:text-terracota"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-marfim/10 py-6 text-xs text-marfim/55 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={14} strokeWidth={1.6} />
          <span>
            {churchInfo.addressLine1}, {churchInfo.addressLine2}, {churchInfo.addressLine3} ·{' '}
            {churchInfo.serviceDay}, {churchInfo.serviceTime}
          </span>
        </div>
        <p>Um corpo — uma família — uma essência: Cristo</p>
      </div>
      <div className="container-page border-t border-marfim/10 py-4 text-center text-[11px] text-marfim/40">
        © {new Date().getFullYear()} Igreja SôMMA — Todos os direitos reservados.
      </div>
    </footer>
  )
}
