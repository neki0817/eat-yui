"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase, type Product } from "@/lib/supabase"
import { Package, Eye, Plus, TrendingUp } from "lucide-react"

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .order("display_order")

      if (data) {
        setProducts(data)
      }
      setIsLoading(false)
    }

    fetchProducts()
  }, [])

  const publishedCount = products.filter((p) => p.status === "published").length
  const draftCount = products.filter((p) => p.status === "draft").length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">ダッシュボード</h1>
          <p className="text-neutral-500 mt-1">小陽春オンラインショップの管理</p>
        </div>
        <Link
          href="/shop"
          target="_blank"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-600 hover:bg-neutral-50 transition-colors"
        >
          <Eye className="w-4 h-4" />
          ショップを見る
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">総商品数</p>
              <p className="text-2xl font-bold text-neutral-800">{products.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">公開中</p>
              <p className="text-2xl font-bold text-neutral-800">{publishedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-neutral-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">下書き</p>
              <p className="text-2xl font-bold text-neutral-800">{draftCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-neutral-200 mb-8">
        <h2 className="text-lg font-bold text-neutral-800 mb-4">クイックアクション</h2>
        <div className="flex gap-4">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            商品を追加
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 text-neutral-600 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <Package className="w-4 h-4" />
            商品一覧
          </Link>
        </div>
      </div>

      {/* Products Overview */}
      <div className="bg-white rounded-xl border border-neutral-200">
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-lg font-bold text-neutral-800">商品一覧</h2>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">
            商品がまだ登録されていません
          </div>
        ) : (
          <div className="divide-y divide-neutral-200">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/admin/products/${product.id}`}
                className="flex items-center gap-4 p-4 hover:bg-neutral-50 transition-colors"
              >
                <div className="w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-neutral-800 truncate">{product.name}</h3>
                  <p className="text-sm text-neutral-500">¥{product.price.toLocaleString()}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    product.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {product.status === "published" ? "公開中" : "下書き"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
