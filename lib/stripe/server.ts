
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key_for_build', {
  apiVersion: '2024-12-18.acacia' as any, // Use explicit type casting to avoid version mismatch errors
  typescript: true,
})
