import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import PhotoPlaceholder from '../components/PhotoPlaceholder'
import Button from '../components/Button'
import { getProductById } from '../data/products'
import { useCart } from '../context/CartContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { productImages, camisetaGalleries } from '../data/productImages'

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export default function Product() {
  const { id } = useParams<{ id: string }>()
  const product = id ? getProductById(id) : undefined
  const { addItem } = useCart()

  usePageTitle(product ? product.name : 'Produto')

  const [color, setColor] = useState<string | undefined>(
    product?.colors?.[0],
  )

  const [size, setSize] = useState<string | undefined>(
    product?.sizes?.[0],
  )

  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const singleImage = productImages[id ?? '']

  const gallery =
    id === 'camiseta-drop-essencial' && color
      ? camisetaGalleries[color]
      : undefined

  const currentGallery = gallery ?? (singleImage ? [singleImage] : [])

  const [activeImage, setActiveImage] = useState<string | undefined>(
    currentGallery[0],
  )

  useEffect(() => {
    setActiveImage(currentGallery[0])
  }, [color, id])

  if (!product) {
    return <Navigate to="/loja" replace />
  }
function handleAdd() {
  if (!product) return

  addItem(product, quantity, size, color)
  setAdded(true)

  setTimeout(() => {
    setAdded(false)
  }, 2200)
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-sm text-chumbo/60"
        >
          <Link
            to="/loja"
            className="hover:text-terracota"
          >
            Loja
          </Link>{' '}
          /{' '}
          <span className="text-chumbo-dark">
            {product.name}
          </span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-3">
            {activeImage ? (
              <img
                src={activeImage}
                alt={product.name}
                className="aspect-[4/5] w-full bg-white object-cover"
              />
            ) : (
              <PhotoPlaceholder
                label={product.name}
                className="aspect-[4/5] w-full"
              />
            )}

            {currentGallery.length > 0 && (
              <div className="flex gap-3">
                {currentGallery.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(src)}
                    aria-label="Ver esta foto do produto"
                    className={`h-20 w-20 shrink-0 overflow-hidden border-2 transition-colors ${
                      activeImage === src
                        ? 'border-terracota'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full bg-white object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-display text-4xl text-chumbo-dark md:text-5xl">
                {product.name}
              </h1>

              <p className="mt-3 text-xl text-chumbo-dark">
                {formatPrice(product.price)}
              </p>
            </div>

            <p className="max-w-prose text-base leading-relaxed text-chumbo/80">
              {product.description}
            </p>

            {!product.inStock && (
              <p className="w-fit bg-chumbo/10 px-3 py-1.5 text-sm font-medium text-chumbo-dark">
                Produto esgotado no momento.
              </p>
            )}

            {product.colors && (
              <fieldset>
                <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-chumbo/55">
                  Cor
                </legend>

                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={color === c}
                      onClick={() => setColor(c)}
                      className={`border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        color === c
                          ? 'border-terracota bg-terracota text-marfim'
                          : 'border-chumbo/25 text-chumbo-dark hover:border-terracota'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {product.sizes && (
              <fieldset>
                <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-chumbo/55">
                  Tamanho
                </legend>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={size === s}
                      onClick={() => setSize(s)}
                      className={`h-11 w-11 border text-sm font-medium transition-colors duration-300 ${
                        size === s
                          ? 'border-terracota bg-terracota text-marfim'
                          : 'border-chumbo/25 text-chumbo-dark hover:border-terracota'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div>
              <label
                htmlFor="quantidade"
                className="mb-3 block text-xs font-semibold uppercase tracking-[0.14em] text-chumbo/55"
              >
                Quantidade
              </label>

              <div className="flex w-fit items-center border border-chumbo/25">
                <button
                  type="button"
                  aria-label="Diminuir quantidade"
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  className="px-4 py-2 text-chumbo-dark hover:text-terracota"
                >
                  −
                </button>

                <span
                  id="quantidade"
                  className="min-w-[2.5rem] text-center text-sm font-medium"
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Aumentar quantidade"
                  onClick={() =>
                    setQuantity((q) => q + 1)
                  }
                  className="px-4 py-2 text-chumbo-dark hover:text-terracota"
                >
                  +
                </button>
              </div>
            </div>

            {product.inStock ? (
              <Button
                onClick={handleAdd}
                variant="primary"
                className="w-full sm:w-fit"
              >
                {added ? (
                  <>
                    <Check size={16} strokeWidth={2} />
                    Adicionado
                  </>
                ) : (
                  'Adicionar ao carrinho'
                )}
              </Button>
            ) : (
              <span className="w-fit cursor-not-allowed bg-chumbo/15 px-7 py-3.5 text-sm font-semibold text-chumbo/50">
                Indisponível
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}