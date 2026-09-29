import { Calendar, Clock, Instagram, MapPin, ShoppingBag, Handshake, HeartHandshake } from 'lucide-react'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import Button from '../components/Button'
import ServiceCard from '../components/ServiceCard'
import LocationSection from '../components/LocationSection'
import ProductCard from '../components/ProductCard'
import { useReveal } from '../hooks/useReveal'
import { usePageTitle } from '../hooks/usePageTitle'
import { churchInfo, aboutContent, clas } from '../data/services'
import { products } from '../data/products'
import bwBaptism from '../assets/images/bw_baptism_pour.jpg'
import leadersTogether from '../assets/images/leaders_together.jpg'
import leaderPraying from '../assets/images/leader_praying.jpg'
import communityGroup from '../assets/images/community_group.jpg'

const instagramShots = [
  { src: communityGroup, alt: 'Encontro da comunidade SôMMA' },
  { src: bwBaptism, alt: 'Momento de batismo na SôMMA' },
  { src: leadersTogether, alt: 'Liderança da Igreja SôMMA' },
  { src: leaderPraying, alt: 'Momento de oração em um culto da SôMMA' },
]

export default function Home() {
  usePageTitle('Um corpo, uma família, uma essência: Cristo')

  const identityRef = useReveal<HTMLDivElement>()
  const aboutRef = useReveal<HTMLDivElement>()
  const purposeRef = useReveal<HTMLDivElement>()
  const clasRef = useReveal<HTMLDivElement>()
  const servicesRef = useReveal<HTMLDivElement>()
  const storeRef = useReveal<HTMLDivElement>()
  const membershipRef = useReveal<HTMLDivElement>()
  const volunteerRef = useReveal<HTMLDivElement>()
  const instaRef = useReveal<HTMLDivElement>()

  return (
    <>
      <Hero />

      {/* IDENTIDADE DA SÔMMA */}
      <section className="relative overflow-hidden bg-chumbo-dark py-28 md:py-40">
        <div
          ref={identityRef}
          className="reveal container-page flex flex-col items-center gap-6 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-terracota">
            Identidade da SôMMA
          </span>
          <h2 className="max-w-3xl font-display text-3xl leading-[1.15] text-marfim sm:text-4xl md:text-5xl">
            Um corpo. Uma família.
            <br />
            Uma essência: Cristo.
          </h2>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section className="bg-white py-24 md:py-32">
        <div ref={aboutRef} className="reveal container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionTitle title="Quem somos" />
          <p className="max-w-prose text-base leading-relaxed text-chumbo/85 md:text-lg">
            {aboutContent.quemSomos}
          </p>
        </div>
      </section>

      {/* PROPÓSITO */}
      <section className="bg-marfim py-24 md:py-32">
        <div ref={purposeRef} className="reveal container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionTitle title="Propósito" />
          <p className="max-w-prose text-base leading-relaxed text-chumbo/85 md:text-lg">
            {aboutContent.proposito}
          </p>
        </div>
      </section>

      {/* CLÃS */}
      <section className="bg-white py-24 md:py-32">
        <div ref={clasRef} className="reveal container-page flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle title="Clãs" subtitle="Um lugar para pertencer." />
            <Button to="/clas" variant="secondary">
              Conheça os Clãs
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {clas.map((cla) => (
              <div key={cla.id} className="flex flex-col gap-2 border border-chumbo/15 p-8">
                <h3 className="font-display text-2xl text-chumbo-dark">{cla.name}</h3>
                <p className="text-sm font-medium text-terracota">Líder: {cla.leader}</p>
                <p className="text-sm leading-relaxed text-chumbo/75">{cla.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CULTOS E LOCALIZAÇÃO */}
      <section className="bg-marfim py-24 md:py-32">
        <div ref={servicesRef} className="reveal container-page flex flex-col gap-12">
          <SectionTitle title="Cultos e localização" />
          <div className="grid gap-8 md:grid-cols-3">
            <ServiceCard icon={<Calendar size={22} strokeWidth={1.5} />} label="Dia" value={churchInfo.serviceDay} />
            <ServiceCard icon={<Clock size={22} strokeWidth={1.5} />} label="Horário" value={churchInfo.serviceTime} />
            <ServiceCard icon={<MapPin size={22} strokeWidth={1.5} />} label="Local" value="Mauá - SP" />
          </div>
          <Button to="/cultos" variant="secondary" className="self-start">
            Saiba mais sobre os cultos
          </Button>
        </div>
      </section>
      <LocationSection />

      {/* LOJA */}
      <section className="bg-white py-24 md:py-32">
        <div ref={storeRef} className="reveal container-page flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle
              title="SôMMA Store"
              subtitle="Vista a identidade da nossa família."
            />
            <Button to="/loja" variant="secondary">
              <ShoppingBag size={16} strokeWidth={1.8} />
              Ver a loja
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-2 md:max-w-xl">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* QUERO FAZER PARTE */}
      <section className="bg-oliva/10 py-20 md:py-28">
        <div
          ref={membershipRef}
          className="reveal container-page flex flex-col items-center gap-5 text-center"
        >
          <HeartHandshake size={26} strokeWidth={1.5} className="text-oliva" />
          <h2 className="font-display text-3xl text-chumbo-dark md:text-4xl">Quero fazer parte</h2>
          <p className="max-w-lg text-base leading-relaxed text-chumbo/75">
            Acreditamos que igreja é família. Se você conheceu a SôMMA e deseja fazer parte dessa
            família, queremos conhecer você.
          </p>
          <Button to="/quero-ser-membro" variant="primary">
            Quero fazer parte
          </Button>
        </div>
      </section>

      {/* QUERO SERVIR */}
      <section className="bg-chumbo-dark py-20 md:py-28">
        <div
          ref={volunteerRef}
          className="reveal container-page flex flex-col items-center gap-5 text-center"
        >
          <Handshake size={26} strokeWidth={1.5} className="text-terracota" />
          <h2 className="font-display text-3xl text-marfim md:text-4xl">Quero servir</h2>
          <p className="max-w-lg text-base leading-relaxed text-marfim/70">
            A igreja é feita por pessoas que colocam seus dons, talentos e disposição a serviço do
            Reino. Se você deseja servir na SôMMA, queremos conhecer você.
          </p>
          <Button to="/quero-servir" variant="ghost">
            Quero servir
          </Button>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-white py-24 md:py-32">
        <div ref={instaRef} className="reveal container-page flex flex-col gap-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle title="Acompanhe a SôMMA" subtitle="O dia a dia da nossa comunidade no Instagram." />
            <Button href={churchInfo.instagram} variant="secondary">
              <Instagram size={16} strokeWidth={1.8} />
              Seguir no Instagram
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {instagramShots.map((shot) => (
              <div key={shot.alt} className="aspect-square w-full overflow-hidden">
                <img
                  src={shot.src}
                  alt={shot.alt}
                  className="h-full w-full object-cover transition-transform duration-700 ease-smooth hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
