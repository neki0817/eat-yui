import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create a dummy client if environment variables are not set (for build time)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key')

// Database types
export type Product = {
  id: string
  name: string
  price: number
  weight: string
  description: string
  ingredients: string
  allergens: string
  image_url: string
  cart_image_url: string
  story_keywords: string
  catchphrase: string
  headline: string
  color_theme: 'orange' | 'red' | 'neutral'
  display_order: number
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export type ShopSettings = {
  id: string
  shop_name: string
  hero_image_url: string
  hero_title: string
  hero_subtitle: string
  hero_keywords: string
  shop_concept: string
  target_customer: string
  created_at: string
  updated_at: string
}
