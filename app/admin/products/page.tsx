"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase, type Product } from "@/lib/supabase"
import { Plus, GripVertical, Pencil, Trash2 } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function SortableRow({
  product,
  deleteId,
  onDelete,
  onToggleStatus,
}: {
  product: Product
  deleteId: string | null
  onDelete: (id: string) => void
  onToggleStatus: (product: Product) => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? "#fef3c7" : undefined,
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="hover:bg-neutral-50 transition-colors"
    >
      <td className="px-4 py-3">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-neutral-100 rounded"
        >
          <GripVertical className="w-4 h-4 text-neutral-400" />
        </button>
      </td>
      <td className="px-4 py-3">
        <div className="w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <p className="font-medium text-neutral-800">{product.name}</p>
        <p className="text-sm text-neutral-500 truncate max-w-xs">
          {product.catchphrase}
        </p>
      </td>
      <td className="px-4 py-3 text-neutral-600">
        ¥{product.price.toLocaleString()}
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onToggleStatus(product)}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
            product.status === "published"
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          {product.status === "published" ? "公開中" : "下書き"}
        </button>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/products/${product.id}`}
            className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(product.id)}
            disabled={deleteId === product.id}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = products.findIndex((p) => p.id === active.id)
      const newIndex = products.findIndex((p) => p.id === over.id)

      const newProducts = arrayMove(products, oldIndex, newIndex)
      setProducts(newProducts)

      // データベースの display_order を更新
      setIsSaving(true)
      try {
        const updates = newProducts.map((product, index) => ({
          id: product.id,
          display_order: index,
        }))

        for (const update of updates) {
          await supabase
            .from("products")
            .update({ display_order: update.display_order })
            .eq("id", update.id)
        }
      } catch (error) {
        console.error("Failed to update order:", error)
        // エラー時は元に戻す
        fetchProducts()
      } finally {
        setIsSaving(false)
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("この商品を削除してもよろしいですか？")) return

    setDeleteId(id)
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (!error) {
      setProducts((prev) => prev.filter((p) => p.id !== id))
    }
    setDeleteId(null)
  }

  const handleToggleStatus = async (product: Product) => {
    const newStatus = product.status === "published" ? "draft" : "published"
    const { error } = await supabase
      .from("products")
      .update({ status: newStatus })
      .eq("id", product.id)

    if (!error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, status: newStatus } : p))
      )
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">商品管理</h1>
          <p className="text-neutral-500 mt-1">
            商品の追加・編集・削除
            {isSaving && (
              <span className="ml-2 text-orange-600">（並び順を保存中...）</span>
            )}
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          商品を追加
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-neutral-500 mb-4">商品がまだ登録されていません</p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              最初の商品を追加
            </Link>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="w-10 px-4 py-3"></th>
                  <th className="w-20 px-4 py-3"></th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">商品名</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">価格</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600">ステータス</th>
                  <th className="w-32 px-4 py-3"></th>
                </tr>
              </thead>
              <SortableContext
                items={products.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <tbody className="divide-y divide-neutral-200">
                  {products.map((product) => (
                    <SortableRow
                      key={product.id}
                      product={product}
                      deleteId={deleteId}
                      onDelete={handleDelete}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </tbody>
              </SortableContext>
            </table>
          </DndContext>
        )}
      </div>

      <p className="text-sm text-neutral-400 mt-4 text-center">
        ドラッグ&ドロップで商品の表示順を変更できます
      </p>
    </div>
  )
}
