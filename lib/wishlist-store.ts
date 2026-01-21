import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product } from './types'

interface WishlistStore {
    items: Product[]
    addItem: (product: Product) => void
    removeItem: (productId: number) => void
    isInWishlist: (productId: number) => boolean
    clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product: Product) => {
                const items = get().items
                const exists = items.find(item => item.id === product.id)

                if (!exists) {
                    set({ items: [...items, product] })
                }
            },

            removeItem: (productId: number) => {
                set({ items: get().items.filter(item => item.id !== productId) })
            },

            isInWishlist: (productId: number) => {
                return get().items.some(item => item.id === productId)
            },

            clearWishlist: () => {
                set({ items: [] })
            },
        }),
        {
            name: 'wishlist-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

// Computed selector
export const useWishlistCount = () => useWishlistStore(state => state.items.length)
