import { supabase } from './client'
import type { CartItem, Order, OrderItem, OrderWithItems } from '../types'

export async function createOrder(
    userId: string,
    cartItems: CartItem[],
    totalAmount: number
): Promise<{ order: Order | null; error: string | null }> {
    try {
        // Create the order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: userId,
                total_amount: totalAmount,
                status: 'pending',
            })
            .select()
            .single()

        if (orderError) {
            return { order: null, error: orderError.message }
        }

        // Create order items
        const orderItems = cartItems.map(item => ({
            order_id: order.id,
            product_id: item.product.id,
            product_name: item.product.name,
            product_category: item.product.category,
            product_price: item.product.price,
            quantity: item.quantity,
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)

        if (itemsError) {
            // Rollback: delete the order if items insertion fails
            await supabase.from('orders').delete().eq('id', order.id)
            return { order: null, error: itemsError.message }
        }

        return { order, error: null }
    } catch (error) {
        return { order: null, error: 'Failed to create order' }
    }
}

export async function getUserOrders(userId: string): Promise<{ orders: OrderWithItems[]; error: string | null }> {
    try {
        const { data: orders, error: ordersError } = await supabase
            .from('orders')
            .select(`
        *,
        order_items (*)
      `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

        if (ordersError) {
            return { orders: [], error: ordersError.message }
        }

        return { orders: orders as OrderWithItems[], error: null }
    } catch (error) {
        return { orders: [], error: 'Failed to fetch orders' }
    }
}

export async function getOrderDetails(orderId: string): Promise<{ order: OrderWithItems | null; error: string | null }> {
    try {
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select(`
        *,
        order_items (*)
      `)
            .eq('id', orderId)
            .single()

        if (orderError) {
            return { order: null, error: orderError.message }
        }

        return { order: order as OrderWithItems, error: null }
    } catch (error) {
        return { order: null, error: 'Failed to fetch order details' }
    }
}
