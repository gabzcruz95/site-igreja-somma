import { Link } from 'react-router-dom'
import PhotoPlaceholder from './PhotoPlaceholder'
import { Product } from '../data/products'
import { productImages } from '../data/productImages'

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function ProductCard({ product }: { product: Product }) {
  const image = productImages[product.id]

  return (
    <Link to={`/loja/produto/${product.id}`} className="group flex flex-col gap-4">
      <div className="relative overflow-hidden bg-white">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
          />
        ) : (
          <PhotoPlaceholder
            label={product.name}
            className="aspect-[4/5] w-full transition-transform duration-700 ease-smooth group-hover:scale-[1.03]"
          />
        )}
        {!product.inStock && (
          <span className="absolute left-3 top-3 bg-chumbo-dark px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-marfim">
            Esgotado
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium text-chumbo-dark">{product.name}</h3>
          <p className="mt-0.5 text-sm text-chumbo/60">{formatPrice(product.price)}</p>
        </div>
      </div>
    </Link>
  )
}
