export interface Product {
    id: number
    name: string
    category: string
    price: number
    image: string
    description: string
    badge: string | null
}

export interface CartItem {
    product: Product
    quantity: number
}

export interface CartState {
    items: CartItem[]
    addItem: (product: Product) => void
    removeItem: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

export interface Order {
    id: string
    user_id: string
    total_amount: number
    status: string
    created_at: string
}

export interface OrderItem {
    id: string
    order_id: string
    product_id: number
    product_name: string
    product_category: string
    product_price: number
    quantity: number
    created_at: string
}

export interface OrderWithItems extends Order {
    order_items: OrderItem[]
}
