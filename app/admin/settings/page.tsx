"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { supabase, type ShopSettings } from "@/lib/supabase"
import { Save, Loader2, Sparkles, Copy } from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<ShopSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [imagePrompt, setImagePrompt] = useState("")
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("shop_settings")
        .select("*")
        .single()

      if (data) {
        setSettings(data)
      }
      setIsLoading(false)
    }

    fetchSettings()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setSettings((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleGenerateHero = async () => {
    if (!settings?.shop_name || !settings?.hero_keywords) {
      setMessage({ type: "error", text: "ショップ名とキーワードを入力してください" })
      return
    }

    setIsGenerating(true)
    setMessage({ type: "", text: "" })

    try {
      const response = await fetch("/api/generate-hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shopName: settings.shop_name,
          concept: settings.shop_concept || "",
          targetCustomer: settings.target_customer || "",
          keywords: settings.hero_keywords,
        }),
      })

      if (!response.ok) throw new Error("API request failed")

      const data = await response.json()
      setSettings((prev) =>
        prev
          ? {
              ...prev,
              hero_title: data.title,
              hero_subtitle: data.subtitle,
            }
          : null
      )
      setImagePrompt(data.imagePrompt || "")
      setMessage({ type: "success", text: "AIがコンテンツを生成しました" })
    } catch {
      setMessage({ type: "error", text: "AI生成に失敗しました" })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyImagePrompt = () => {
    navigator.clipboard.writeText(imagePrompt)
    setMessage({ type: "success", text: "画像プロンプトをコピーしました" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings) return

    setIsSaving(true)
    setMessage({ type: "", text: "" })

    try {
      const { error } = await supabase
        .from("shop_settings")
        .update({
          shop_name: settings.shop_name,
          hero_image_url: settings.hero_image_url,
          hero_title: settings.hero_title,
          hero_subtitle: settings.hero_subtitle,
          hero_keywords: settings.hero_keywords,
          shop_concept: settings.shop_concept,
          target_customer: settings.target_customer,
        })
        .eq("id", settings.id)

      if (error) throw error

      setMessage({ type: "success", text: "設定を保存しました" })
    } catch {
      setMessage({ type: "error", text: "保存に失敗しました" })
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

  if (!settings) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-500">設定データが見つかりません</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-800">ショップ設定</h1>
        <p className="text-neutral-500 mt-1">ショップの基本情報とヒーローセクションの設定</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {message.text && (
          <div
            className={`p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* 基本設定 */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="text-lg font-bold text-neutral-800 mb-6">基本設定</h2>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              ショップ名
            </label>
            <input
              type="text"
              name="shop_name"
              value={settings.shop_name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* ヒーローセクション */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-neutral-800">ヒーローセクション</h2>
            <button
              type="button"
              onClick={handleGenerateHero}
              disabled={isGenerating || !settings.shop_name || !settings.hero_keywords}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              AIで生成
            </button>
          </div>

          {/* AI生成用入力フィールド */}
          <div className="bg-purple-50 rounded-lg p-4 mb-6 space-y-4">
            <p className="text-sm text-purple-700 font-medium">AI生成用の情報（入力するとAIがタイトル・サブタイトルを提案します）</p>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                ショップのコンセプト
              </label>
              <input
                type="text"
                name="shop_concept"
                value={settings.shop_concept || ""}
                onChange={handleChange}
                placeholder="例: 国産素材にこだわった台湾スイーツ専門店"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                ターゲット顧客
              </label>
              <input
                type="text"
                name="target_customer"
                value={settings.target_customer || ""}
                onChange={handleChange}
                placeholder="例: 健康志向の女性、グルテンフリーを求める方"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                キーワード <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="hero_keywords"
                value={settings.hero_keywords || ""}
                onChange={handleChange}
                placeholder="例: ふわふわ、もちもち、グルテンフリー、倉敷、手作り"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <p className="text-xs text-neutral-500 mt-1">カンマ区切りで入力してください</p>
            </div>
          </div>

          {/* 画像プロンプト表示エリア */}
          {imagePrompt && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-blue-700 font-medium">画像生成用プロンプト</p>
                <button
                  type="button"
                  onClick={copyImagePrompt}
                  className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  コピー
                </button>
              </div>
              <p className="text-sm text-neutral-700 bg-white p-3 rounded border border-blue-200 font-mono">
                {imagePrompt}
              </p>
              <p className="text-xs text-neutral-500 mt-2">
                このプロンプトをMidjourney、DALL-E、Stable Diffusionなどの画像生成AIで使用できます
              </p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                ヒーロー画像URL
              </label>
              <input
                type="text"
                name="hero_image_url"
                value={settings.hero_image_url || ""}
                onChange={handleChange}
                placeholder="/images/hero.png"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
              {settings.hero_image_url && (
                <div className="mt-4">
                  <img
                    src={settings.hero_image_url}
                    alt="ヒーロー画像プレビュー"
                    className="w-full max-w-md h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                メインタイトル
              </label>
              <textarea
                name="hero_title"
                value={settings.hero_title || ""}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                サブタイトル
              </label>
              <textarea
                name="hero_subtitle"
                value={settings.hero_subtitle || ""}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* 保存ボタン */}
        <div className="flex justify-end">
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
            保存する
          </button>
        </div>
      </form>
    </div>
  )
}
