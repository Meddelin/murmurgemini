import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types'

interface WishlistState {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  hasItem: (productId: string) => boolean
  toggleItem: (product: Product) => void
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items
        if (!items.find((item) => item.id === product.id)) {
          set({ items: [...items, product] })
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) })
      },
      hasItem: (productId) => {
        return !!get().items.find((item) => item.id === productId)
      },
      toggleItem: (product) => {
        const has = get().hasItem(product.id)
        if (has) {
          get().removeItem(product.id)
        } else {
          get().addItem(product)
        }
      },
      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'wishlist-storage',
    }
  )
)

