import { Minus, Plus, X } from 'lucide-react'
import PhotoPlaceholder from './PhotoPlaceholder'
import { useCart, CartItem as CartItemType } from '../context/CartContext'
import { productImages } from '../data/productImages'

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart()
  const image = productImages[item.productId]

  return (
    <div className="flex gap-5 border-b border-chumbo/10 py-6 first:pt-0">
      {image ? (
        <img src={image} alt={item.name} className="h-28 w-24 shrink-0 bg-white object-cover" />
      ) : (
        <PhotoPlaceholder label={item.name} className="h-28 w-24 shrink-0" />
      )}

      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-medium text-chumbo-dark">{item.name}</h3>
            {(item.color || item.size) && (
              <p className="mt-0.5 text-sm text-chumbo/60">
                {item.color && `Cor: ${item.color}`}
                {item.color && item.size && ' · '}
                {item.size && `Tamanho: ${item.size}`}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.productId, item.size, item.color)}
            aria-label={`Remover ${item.name} do carrinho`}
            className="p-1 text-chumbo/50 transition-colors hover:text-terracota"
          >
            <X size={18} strokeWidth={1.7} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center border border-chumbo/20">
            <button
              type="button"
              aria-label="Diminuir quantidade"
              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
              className="p-2 text-chumbo-dark transition-colors hover:text-terracota"
            >
              <Minus size={14} strokeWidth={2} />
            </button>
            <span className="min-w-[2rem] text-center text-sm font-medium" aria-live="polite">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label="Aumentar quantidade"
              onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
              className="p-2 text-chumbo-dark transition-colors hover:text-terracota"
            >
              <Plus size={14} strokeWidth={2} />
            </button>
          </div>
          <p className="font-medium text-chumbo-dark">{formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  )
}
