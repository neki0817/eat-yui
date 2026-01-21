"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { supabase, type Product } from "@/lib/supabase"
import { ArrowLeft, Save, Sparkles, Upload, Loader2, Eye } from "lucide-react"

type ProductForm = Omit<Product, "id" | "created_at" | "updated_at">

const defaultForm: ProductForm = {
  name: "",
  price: 0,
  weight: "",
  description: "",
  ingredients: "",
  allergens: "",
  image_url: "",
  cart_image_url: "",
  story_keywords: "",
  catchphrase: "",
  headline: "",
  color_theme: "orange",
  display_order: 0,
  status: "draft",
}

export default function AdminProductEditPage() {
  const router = useRouter()
  const params = useParams()
  const isNew = params.id === "new"

  const [form, setForm] = useState<ProductForm>(defaultForm)
  const [isLoading, setIsLoading] = useState(!isNew)
  const [isSaving, setIsSaving] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState("")
  const [publishedProducts, setPublishedProducts] = useState<{ id: string; name: string; display_order: number }[]>([])

  // 公開中の商品一覧を取得（表示順選択用）
  useEffect(() => {
    const fetchPublishedProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, display_order")
        .eq("status", "published")
        .order("display_order", { ascending: true })

      if (data) {
        // 現在編集中の商品は除外
        setPublishedProducts(data.filter(p => p.id !== params.id))
      }
    }
    fetchPublishedProducts()
  }, [params.id])

  useEffect(() => {
    if (!isNew) {
      const fetchProduct = async () => {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", params.id)
          .single()

        if (error || !data) {
          router.push("/admin/products")
          return
        }

        setForm({
          name: data.name,
          price: data.price,
          weight: data.weight,
          description: data.description || "",
          ingredients: data.ingredients || "",
          allergens: data.allergens || "",
          image_url: data.image_url || "",
          cart_image_url: data.cart_image_url || "",
          story_keywords: data.story_keywords || "",
          catchphrase: data.catchphrase || "",
          headline: data.headline || "",
          color_theme: data.color_theme || "orange",
          display_order: data.display_order || 0,
          status: data.status || "draft",
        })
        setIsLoading(false)
      }

      fetchProduct()
    }
  }, [isNew, params.id, router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const handleGenerateStory = async () => {
    if (!form.name || !form.story_keywords) {
      setError("商品名とストーリーキーワードを入力してください")
      return
    }

    setIsGenerating(true)
    setError("")

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: form.price,
          weight: form.weight,
          ingredients: form.ingredients,
          keywords: form.story_keywords,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate story")

      const data = await response.json()
      setForm((prev) => ({
        ...prev,
        catchphrase: data.catchphrase,
        headline: data.headline || "",
        description: data.description,
      }))
    } catch {
      setError("ストーリー生成に失敗しました")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image_url" | "cart_image_url"
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `products/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, file)

    if (uploadError) {
      setError("画像のアップロードに失敗しました")
      return
    }

    const { data } = supabase.storage.from("product-images").getPublicUrl(filePath)
    setForm((prev) => ({ ...prev, [field]: data.publicUrl }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError("")

    try {
      if (isNew) {
        const { error } = await supabase.from("products").insert([form])
        if (error) throw error
      } else {
        const { error } = await supabase
          .from("products")
          .update(form)
          .eq("id", params.id)
        if (error) throw error
      }

      router.push("/admin/products")
    } catch {
      setError("保存に失敗しました")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">
            {isNew ? "商品を追加" : "商品を編集"}
          </h1>
          <p className="text-neutral-500 mt-1">
            {isNew ? "新しい商品を登録します" : form.name}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
        )}

        {/* 基本情報 */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-lg font-bold text-neutral-800 mb-6">基本情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                商品名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                価格 <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                内容量 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                placeholder="例: 450g"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                カラーテーマ
              </label>
              <select
                name="color_theme"
                value={form.color_theme}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                <option value="orange">オレンジ</option>
                <option value="red">レッド</option>
                <option value="neutral">ニュートラル</option>
              </select>
            </div>
          </div>
        </div>

        {/* 原材料・アレルゲン */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-lg font-bold text-neutral-800 mb-6">原材料・アレルゲン</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                原材料
              </label>
              <textarea
                name="ingredients"
                value={form.ingredients}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                アレルゲン
              </label>
              <input
                type="text"
                name="allergens"
                value={form.allergens}
                onChange={handleChange}
                placeholder="例: 卵・乳"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* ストーリー */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-neutral-800">ストーリー</h2>
            <button
              type="button"
              onClick={handleGenerateStory}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              AIで生成
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                ストーリーキーワード
              </label>
              <input
                type="text"
                name="story_keywords"
                value={form.story_keywords}
                onChange={handleChange}
                placeholder="例: ふわふわ、しゅわしゅわ、グルテンフリー"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
              <p className="text-sm text-neutral-500 mt-1">
                AIがこのキーワードを参考にキャッチフレーズと説明文を生成します
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                キャッチフレーズ
              </label>
              <textarea
                name="catchphrase"
                value={form.catchphrase}
                onChange={handleChange}
                rows={2}
                placeholder="例: 「しゅわっ、ふわっ」一口で魔法にかかる、米粉の奇跡。"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              />
              <p className="text-sm text-neutral-500 mt-1">
                商品画像の横に表示される短いフレーズ
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                見出し（ヘッドライン）
              </label>
              <textarea
                name="headline"
                value={form.headline}
                onChange={handleChange}
                rows={2}
                placeholder="例: 雲を食べる、贅沢な瞬間。"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              />
              <p className="text-sm text-neutral-500 mt-1">
                ストーリーセクションに表示される詩的な見出し（商品名の代わり）
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                商品説明
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* 画像 */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-lg font-bold text-neutral-800 mb-6">画像</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                商品画像
              </label>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-4">
                {form.image_url ? (
                  <div className="relative">
                    <img
                      src={form.image_url}
                      alt="商品画像"
                      className="w-full h-48 object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, image_url: "" }))}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-48 cursor-pointer">
                    <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                    <span className="text-sm text-neutral-500">クリックして画像をアップロード</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "image_url")}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-sm text-neutral-500 mt-2">
                または画像URLを直接入力:
              </p>
              <input
                type="text"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="/images/商品名.png"
                className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                パッケージ画像（カート用）
              </label>
              <div className="border-2 border-dashed border-neutral-300 rounded-lg p-4">
                {form.cart_image_url ? (
                  <div className="relative">
                    <img
                      src={form.cart_image_url}
                      alt="パッケージ画像"
                      className="w-full h-48 object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, cart_image_url: "" }))}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-48 cursor-pointer">
                    <Upload className="w-8 h-8 text-neutral-400 mb-2" />
                    <span className="text-sm text-neutral-500">クリックして画像をアップロード</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "cart_image_url")}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-sm text-neutral-500 mt-2">
                または画像URLを直接入力:
              </p>
              <input
                type="text"
                name="cart_image_url"
                value={form.cart_image_url}
                onChange={handleChange}
                placeholder="/images/商品名p.png"
                className="w-full mt-1 px-4 py-2 border border-neutral-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* 公開設定 */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-lg font-bold text-neutral-800 mb-6">公開設定</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                ステータス
              </label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={form.status === "draft"}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="text-neutral-700">下書き</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={form.status === "published"}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-600"
                  />
                  <span className="text-neutral-700">公開</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                表示位置
              </label>
              <select
                name="display_order"
                value={form.display_order}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              >
                <option value={0}>一番上に表示</option>
                {publishedProducts.map((product, index) => (
                  <option key={product.id} value={product.display_order + 1}>
                    「{product.name}」の下に表示
                  </option>
                ))}
              </select>
              <p className="text-sm text-neutral-500 mt-1">
                ショップページでの商品の表示順を選択します
              </p>
            </div>
          </div>
        </div>

        {/* 保存ボタン */}
        <div className="flex justify-end gap-4">
          <Link
            href="/admin/products"
            className="px-6 py-3 border border-neutral-300 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors"
          >
            キャンセル
          </Link>
          {!isNew && (
            <Link
              href={`/admin/preview/${params.id}`}
              target="_blank"
              className="flex items-center gap-2 px-6 py-3 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              プレビュー
            </Link>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isNew ? "追加する" : "保存する"}
          </button>
        </div>
      </form>
    </div>
  )
}
