import { Coupon, User } from '../../payload/payload-types'
import { fetchDoc } from './fetchDoc'
import { fetchDocs } from './fetchDocs'

export const fetchCouponIdByCode = async (code: string): Promise<string | null> => {
  try {
    const coupons = await fetchDocs<Coupon>('coupons')
    const coupon = coupons.find(c => c.code === code)
    return coupon ? coupon.id : null
  } catch (err) {
    console.error('Error fetching coupon by code:', err)
    throw new Error('Error fetching coupon by code')
  }
}

export const fetchCouponById = async (id: string): Promise<Coupon | null> => {
  try {
    const coupon = await fetchDoc<Coupon>({ collection: 'coupons', id })
    return coupon
  } catch (err) {
    console.error('Error fetching coupon by ID:', err)
    throw new Error('Error fetching coupon by ID')
  }
}

export const applyCoupon = async (
  code: string,
  cart: User['cart'],
  cartTotalAmount: number,
): Promise<number> => {
  try {
    const couponId = await fetchCouponIdByCode(code)
    if (!couponId) {
      throw new Error('The coupon code you entered is incorrect.')
    }

    const coupon = await fetchCouponById(couponId)
    if (!coupon) {
      throw new Error('The coupon code you entered is incorrect.')
    }

    if (coupon.status !== 'active') {
      throw new Error('The coupon you entered is inactive.')
    }
    if (coupon.usageLimit && coupon.couponUsed >= coupon.usageLimit) {
      throw new Error('The coupon code usage limit is exceeded.')
    }
    if (coupon.expirationDate && new Date(coupon.expirationDate) <= new Date()) {
      throw new Error('The coupon you entered is expired.')
    }

    if (coupon.appliesTo && coupon.appliesTo.length > 0) {
      const applicableProducts = coupon.appliesTo.map(product =>
        typeof product === 'string' ? product : product.id,
      )
      const cartProducts = cart.items.map(item =>
        typeof item.product === 'string' ? item.product : item.product.id,
      )

      const isApplicable = applicableProducts.some(productId => cartProducts.includes(productId))
      if (!isApplicable) {
        throw new Error('This coupon does not apply to the products in your cart.')
      }
    }

    const { discountType, discountAmount } = coupon
    const couponDiscountAmount =
      discountType === 'percentage'
        ? (cartTotalAmount * (discountAmount ?? 0)) / 100
        : discountAmount ?? 0

    await updateCouponUsage(couponId)

    return couponDiscountAmount
  } catch (err) {
    console.error('Error applying coupon:', err)
    throw err
  }
}

export const updateCouponUsage = async (couponId: string): Promise<void> => {
  try {
    console.log('Updaing coupon: ',couponId);
    
    const coupon = await fetchCouponById(couponId)
    if (!coupon) {
      throw new Error('Coupon not found!')
    }

    const couponUsedCount = coupon.couponUsed + 1
    const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/coupons/${couponId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        couponUsed: couponUsedCount,
      }),
    })

    if (!req.ok) {
      throw new Error(`Failed to update coupon usage: ${req.statusText}`)
    }

    const data = await req.json()
    console.log('Coupon usage updated successfully:', data)
  } catch (err) {
    console.error('Error updating coupon usage:', err)
    throw new Error('Error updating coupon usage')
  }
}
