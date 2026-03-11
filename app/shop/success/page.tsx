"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Home, ShoppingCart } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black text-neutral-900">
            ご注文ありがとうございます
          </h1>
          <p className="text-neutral-500 leading-relaxed">
            ご注文を確認しました。
            <br />
            発送準備が整い次第、メールにてお知らせいたします。
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            ショップに戻る
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-neutral-500 hover:text-orange-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            ホームに戻る
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
