import SectionTitle from '../components/SectionTitle'
import ProductGrid from '../components/ProductGrid'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import { usePageTitle } from '../hooks/usePageTitle'
import { products } from '../data/products'

export default function Store() {
  usePageTitle('Loja')

  return (
    <>
      <section className="relative flex min-h-[45vh] items-end overflow-hidden bg-chumbo-dark">
        <PhotoPlaceholder
          label="Fotografia de produtos da SôMMA Store (aguardando fotos oficiais)"
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chumbo-dark via-chumbo-dark/50 to-chumbo-dark/10" />
        <div className="container-page relative z-10 pb-16 pt-32">
          <h1 className="max-w-2xl font-display text-5xl leading-[1.05] text-marfim md:text-6xl">
            SôMMA Store
          </h1>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container-page flex flex-col gap-12">
          <SectionTitle
            title="Vista a identidade da nossa família"
            subtitle="Peças pensadas para o dia a dia da nossa comunidade."
          />
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  )
}
