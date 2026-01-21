"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Plus, Sparkles, AlertCircle } from "lucide-react"
import { supabase, type Product } from "@/lib/supabase"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export default function PreviewPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single()

      if (data) {
        setProduct(data)
      }
      setIsLoading(false)
    }

    fetchProduct()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-neutral-500">商品が見つかりません</p>
      </div>
    )
  }

  const colorTheme = {
    orange: {
      bg: "bg-orange-50",
      accent: "text-orange-600",
      accentBg: "bg-orange-600",
      sparkle: "text-orange-400",
      button: "hover:bg-orange-600",
    },
    red: {
      bg: "bg-red-50",
      accent: "text-red-600",
      accentBg: "bg-red-600",
      sparkle: "text-red-400",
      button: "hover:bg-red-600",
    },
    neutral: {
      bg: "bg-neutral-200",
      accent: "text-neutral-600",
      accentBg: "bg-neutral-600",
      sparkle: "text-neutral-400",
      button: "hover:bg-neutral-600",
    },
  }

  const theme = colorTheme[product.color_theme] || colorTheme.orange

  // 説明文を段落に分割
  const descriptionParagraphs = product.description
    ? product.description.split(/\n\n+/).filter((p) => p.trim())
    : []

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      {/* Preview Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-bold">
              プレビューモード
              {product.status === "draft" && " - 下書き"}
            </span>
          </div>
          <Link
            href={`/admin/products/${product.id}`}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            編集に戻る
          </Link>
        </div>
      </div>

      {/* Product Story Section - Shop形式に合わせる */}
      <section className="pt-20 py-20 md:py-32 bg-white overflow-hidden border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div {...fadeIn} className="relative order-2 md:order-1">
              <div className={`absolute -inset-4 ${theme.bg} rounded-3xl rotate-3`}></div>
              <div className="relative rounded-3xl shadow-xl w-full h-[450px] md:h-[650px] overflow-hidden border-4 md:border-8 border-white bg-neutral-100">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400">
                    画像なし
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 bg-neutral-900 text-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl max-w-[220px]">
                <Sparkles className={`w-6 h-6 md:w-8 md:h-8 ${theme.sparkle} mb-3`} />
                <p className="text-sm md:text-base font-bold leading-relaxed tracking-tight text-white/90">
                  {product.catchphrase || "キャッチフレーズ未設定"}
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-8 md:order-2">
              <div className="space-y-4">
                <span className={`${theme.accent} font-black tracking-widest text-xs md:text-sm uppercase flex items-center gap-3`}>
                  <div className={`w-8 md:w-12 h-px ${theme.accentBg}`}></div>
                  Product Story
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-neutral-900 leading-tight tracking-tight">
                  {product.headline || product.name}
                </h2>
              </div>

              {/* ナラティブストーリー形式の説明文 */}
              <div className="space-y-6 text-neutral-600 leading-relaxed text-base md:text-lg font-medium">
                {descriptionParagraphs.length > 0 ? (
                  descriptionParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p className="text-neutral-400 italic">商品説明が入力されていません</p>
                )}
              </div>

              <div className="pt-8 md:pt-10 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-6 md:gap-10">
                <div className="text-center sm:text-left">
                  <span className="text-xs text-neutral-400 font-bold block mb-1 tracking-widest">
                    {product.name}
                  </span>
                  <span className="text-3xl md:text-4xl font-black text-neutral-900">
                    ¥{product.price.toLocaleString()}
                  </span>
                </div>
                <button
                  className={`w-full sm:flex-1 bg-neutral-900 text-white py-4 md:py-5 rounded-2xl font-black ${theme.button} transition-all shadow-xl flex items-center justify-center gap-3 text-base md:text-lg cursor-not-allowed opacity-70`}
                  disabled
                >
                  カートに追加 <Plus className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
              <p className="text-center text-sm text-neutral-400">
                ※ プレビューモードではカートに追加できません
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 商品詳細情報セクション */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeIn} className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <h3 className="text-xl md:text-2xl font-black text-neutral-900 mb-8 tracking-tight">商品詳細</h3>
            <div className="space-y-6">
              <div className="flex border-b border-neutral-100 pb-4">
                <span className="w-32 text-neutral-400 font-bold text-sm">商品名</span>
                <span className="flex-1 font-medium text-neutral-800">{product.name}</span>
              </div>
              <div className="flex border-b border-neutral-100 pb-4">
                <span className="w-32 text-neutral-400 font-bold text-sm">内容量</span>
                <span className="flex-1 font-medium text-neutral-800">{product.weight || "-"}</span>
              </div>
              <div className="flex border-b border-neutral-100 pb-4">
                <span className="w-32 text-neutral-400 font-bold text-sm">原材料</span>
                <span className="flex-1 font-medium text-neutral-800">{product.ingredients || "-"}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-neutral-400 font-bold text-sm">アレルギー</span>
                <span className="flex-1 font-medium text-neutral-800">{product.allergens || "なし"}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
