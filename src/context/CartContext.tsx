import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { Product } from '../data/products'

export interface CartItem {
  productId: string
  name: string
  price: number
  image: string
  size?: string
  color?: string
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, quantity: number, size?: string, color?: string) => void
  removeItem: (productId: string, size?: string, color?: string) => void
  updateQuantity: (productId: string, size: string | undefined, color: string | undefined, quantity: number) => void
  clearCart: () => void
  subtotal: number
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = 'somma-cart-v1'

function sameVariant(a: CartItem, productId: string, size?: string, color?: string) {
  return a.productId === productId && a.size === size && a.color === color
}

function loadInitialCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadInitialCart)

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // armazenamento indisponível — carrinho seguirá apenas em memória
    }
  }, [items])

  function addItem(product: Product, quantity: number, size?: string, color?: string) {
    setItems((prev) => {
      const existing = prev.find((i) => sameVariant(i, product.id, size, color))
      if (existing) {
        return prev.map((i) =>
          sameVariant(i, product.id, size, color) ? { ...i, quantity: i.quantity + quantity } : i,
        )
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          color,
          quantity,
        },
      ]
    })
  }

  function removeItem(productId: string, size?: string, color?: string) {
    setItems((prev) => prev.filter((i) => !sameVariant(i, productId, size, color)))
  }

  function updateQuantity(
    productId: string,
    size: string | undefined,
    color: string | undefined,
    quantity: number,
  ) {
    setItems((prev) =>
      prev
        .map((i) => (sameVariant(i, productId, size, color) ? { ...i, quantity: Math.max(1, quantity) } : i))
        .filter((i) => i.quantity > 0),
    )
  }

  function clearCart() {
    setItems([])
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  // Frete ainda não implementado (aguardando integração futura) — total = subtotal por enquanto.
  const total = subtotal

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, subtotal, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de um CartProvider')
  return ctx
}
