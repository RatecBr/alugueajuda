'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const fullName = formData.get('fullName') as string
  const bio = formData.get('bio') as string
  const role = formData.get('role') as string
  const pricePerMinute = formData.get('pricePerMinute')
    ? parseFloat(formData.get('pricePerMinute') as string)
    : null

  const updates = {
    full_name: fullName,
    bio: bio,
    role: role,
    price_per_minute: pricePerMinute,
    // updated_at: new Date().toISOString(), // Supabase handles this usually or needs manual field
  }

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    return { error: 'As senhas não coincidem' }
  }

  if (password.length < 6) {
    return { error: 'A senha deve ter pelo menos 6 caracteres' }
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
