import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product, CartItem, CartState } from './types'

interface CartStore {
    items: CartItem[]
    addItem: (product: Product) => void
    removeItem: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product: Product) => {
                const items = get().items
                const existingItem = items.find(item => item.product.id === product.id)

                if (existingItem) {
                    set({
                        items: items.map(item =>
                            item.product.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    })
                } else {
                    set({ items: [...items, { product, quantity: 1 }] })
                }
            },

            removeItem: (productId: number) => {
                set({ items: get().items.filter(item => item.product.id !== productId) })
            },

            updateQuantity: (productId: number, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(productId)
                } else {
                    set({
                        items: get().items.map(item =>
                            item.product.id === productId
                                ? { ...item, quantity }
                                : item
                        )
                    })
                }
            },

            clearCart: () => {
                set({ items: [] })
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

// Computed selectors
export const useTotalItems = () => useCartStore(state =>
    state.items.reduce((total, item) => total + item.quantity, 0)
)

export const useTotalPrice = () => useCartStore(state =>
    state.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
)
