"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, X, Plus, Minus, ArrowRight, Sparkles, Home } from "lucide-react"
import { supabase, type Product } from "@/lib/supabase"

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const colorTheme = {
  orange: {
    bg: "bg-orange-50",
    bgAlt: "bg-neutral-50",
    accent: "text-orange-600",
    accentBg: "bg-orange-600",
    sparkle: "text-orange-400",
    button: "hover:bg-orange-600",
    border: "border-orange-100",
  },
  red: {
    bg: "bg-red-50",
    bgAlt: "bg-neutral-50",
    accent: "text-red-600",
    accentBg: "bg-red-600",
    sparkle: "text-red-400",
    button: "hover:bg-red-600",
    border: "border-red-100",
  },
  neutral: {
    bg: "bg-neutral-200",
    bgAlt: "bg-neutral-100",
    accent: "text-neutral-600",
    accentBg: "bg-neutral-600",
    sparkle: "text-neutral-400",
    button: "hover:bg-neutral-600",
    border: "border-neutral-200",
  },
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // 公開中の商品を取得
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", "published")
        .order("display_order", { ascending: true })

      if (!error && data) {
        setProducts(data)
      }
      setIsLoading(false)
    }

    fetchProducts()
  }, [])

  // メニューが開いている時はスクロールを無効化
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isCartOpen])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.cart_image_url || product.image_url || "/images/placeholder.png",
        quantity: 1
      }]
    })
    setIsCartOpen(true)
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(0, item.quantity + delta)
            return { ...item, quantity: newQty }
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    )
  }

  const handleCheckout = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      alert("Stripe決済画面へリダイレクトします。")
      setIsProcessing(false)
    }, 1500)
  }

  // 説明文を段落に分割
  const splitDescription = (description: string) => {
    return description ? description.split(/\n\n+/).filter((p) => p.trim()) : []
  }

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      {/* Hero Section */}
      <header className="relative min-h-[100vh] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Home Button */}
        <Link
          href="/"
          className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 hover:bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm"
        >
          <Home className="w-4 h-4" />
          <span className="text-sm font-medium">ホームに戻る</span>
        </Link>

        <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-200">
          <Image
            src="/images/hero.png"
            alt="小陽春オンラインショップ"
            fill
            className="object-cover object-bottom"
            style={{ opacity: 0.65 }}
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-transparent to-transparent opacity-90"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10 px-6 pt-32 md:pt-40">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-black text-white leading-tight mb-10 tracking-tight drop-shadow-2xl"
          >
            心ほどける、
            <br className="md:hidden" />
            ふわっ、もちっ。
            <br />
            <span className="text-orange-400 italic">台湾の幸せ</span>を倉敷から。
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-2xl text-white leading-relaxed font-bold drop-shadow-lg max-w-3xl mx-auto"
          >
            国産米粉100%が叶えた、究極の食感。
            <br />
            体への優しさと、驚きの美味しさを、
            <br className="hidden md:block" />
            倉敷の小さなキッチンからお届けします。
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex flex-col items-center gap-6"
          >
            <a
              href="#product-stories"
              className="bg-orange-600 text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-black hover:bg-white hover:text-orange-600 transition-all shadow-xl flex items-center gap-3 text-lg group"
            >
              物語を読み進める
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="w-px h-12 md:h-20 bg-gradient-to-b from-white to-transparent opacity-50"></div>
          </motion.div>
        </div>
      </header>

      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-50 group p-4 bg-neutral-900 text-white rounded-full hover:bg-orange-600 transition-all shadow-xl"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-xs font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-orange-600">
            {cartCount}
          </span>
        )}
      </button>

      {/* Loading State */}
      {isLoading ? (
        <div className="py-32 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        /* Product Stories - Dynamic */
        <div id="product-stories">
          {products.map((product, index) => {
            const theme = colorTheme[product.color_theme] || colorTheme.orange
            const isEven = index % 2 === 1
            const paragraphs = splitDescription(product.description)
            const sectionBg = index % 3 === 0 ? "bg-white" : index % 3 === 1 ? "bg-neutral-50" : "bg-neutral-100"

            return (
              <section
                key={product.id}
                className={`py-20 md:py-32 ${sectionBg} overflow-hidden border-b border-neutral-100`}
              >
                <div className="max-w-7xl mx-auto px-6">
                  <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                    {/* Image */}
                    <motion.div
                      {...fadeIn}
                      className={`relative ${isEven ? "" : "order-2 md:order-1"}`}
                    >
                      <div className={`absolute -inset-4 ${theme.bg} rounded-3xl ${isEven ? "-rotate-3" : "rotate-3"} ${theme.border} border-2`}></div>
                      <div className="relative rounded-3xl shadow-xl w-full h-[450px] md:h-[650px] overflow-hidden border-4 md:border-8 border-white">
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-200 flex items-center justify-center text-neutral-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className={`absolute -bottom-6 ${isEven ? "-right-4 md:-right-8" : "-left-4 md:-left-8"} bg-neutral-900 text-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl max-w-[220px]`}>
                        <Sparkles className={`w-6 h-6 md:w-8 md:h-8 ${theme.sparkle} mb-3`} />
                        <p className="text-sm md:text-base font-bold leading-relaxed tracking-tight text-white/90">
                          {product.catchphrase || "おいしさをお届けします"}
                        </p>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      {...fadeIn}
                      transition={{ delay: 0.2 }}
                      className={`space-y-8 ${isEven ? "" : "md:order-2"}`}
                    >
                      <div className={`space-y-4 ${isEven ? "text-right md:text-left" : ""}`}>
                        <span className={`${theme.accent} font-black tracking-widest text-xs md:text-sm uppercase flex items-center gap-3 ${isEven ? "justify-end md:justify-start" : ""}`}>
                          {isEven ? (
                            <>Product Story {String(index + 1).padStart(2, "0")} <div className={`w-8 md:w-12 h-px ${theme.accentBg}`}></div></>
                          ) : (
                            <><div className={`w-8 md:w-12 h-px ${theme.accentBg}`}></div> Product Story {String(index + 1).padStart(2, "0")}</>
                          )}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-neutral-900 leading-tight tracking-tight whitespace-pre-line">
                          {product.headline || product.name}
                        </h2>
                      </div>

                      <div className="space-y-6 text-neutral-600 leading-relaxed text-base md:text-lg font-medium">
                        {paragraphs.length > 0 ? (
                          paragraphs.map((paragraph, pIndex) => (
                            <p key={pIndex}>{paragraph}</p>
                          ))
                        ) : (
                          <p>{product.description || "商品説明がありません"}</p>
                        )}
                      </div>

                      <div className="pt-8 md:pt-10 border-t border-neutral-200 flex flex-col sm:flex-row items-center gap-6 md:gap-10">
                        <div className="text-center sm:text-left">
                          <span className="text-xs text-neutral-400 font-bold block mb-1 tracking-widest">
                            {product.name}
                          </span>
                          <span className="text-3xl md:text-4xl font-black text-neutral-900">
                            ¥{product.price.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className={`w-full sm:flex-1 bg-neutral-900 text-white py-4 md:py-5 rounded-2xl font-black ${theme.button} transition-all shadow-xl flex items-center justify-center gap-3 text-base md:text-lg`}
                        >
                          カートに追加 <Plus className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      )}

      {/* How to Enjoy */}
      <section className="py-20 md:py-32 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center mb-16 md:mb-24">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-black mb-6 italic tracking-tight">
            How to Enjoy
          </motion.h2>
          <div className="w-16 md:w-20 h-1 bg-orange-600 mx-auto"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            {...fadeIn}
            className="space-y-8 md:space-y-10 p-8 md:p-12 bg-white/5 rounded-3xl border border-white/10 hover:border-orange-600/50 transition-all duration-700 group"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-xl md:text-3xl font-black shadow-2xl group-hover:rotate-12 transition-transform">
              01
            </div>
            <h3 className="text-2xl md:text-3xl font-bold italic tracking-wide">Castella - 蘇り</h3>
            <p className="text-neutral-300 leading-relaxed text-base md:text-lg">
              冷蔵解凍後、お好みのサイズにカット。耐熱皿に乗せて、ふんわりラップをかけます。
              600Wで約40秒。電子レンジの扉を開けた瞬間、キッチンが焼きたての香りに包まれます。
            </p>
          </motion.div>
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="space-y-8 md:space-y-10 p-8 md:p-12 bg-white/5 rounded-3xl border border-white/10 hover:border-orange-600/50 transition-all duration-700 group"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center text-xl md:text-3xl font-black text-orange-500 shadow-2xl group-hover:rotate-12 transition-transform">
              02
            </div>
            <h3 className="text-2xl md:text-3xl font-bold italic tracking-wide">Tangyuan - 浮遊</h3>
            <p className="text-neutral-300 leading-relaxed text-base md:text-lg">
              沸騰したお湯に凍ったまま入れ、火を弱めて優しく見守ってください。
              4〜5分経ち、湯圓がダンスをするようにぷかぷかと浮き上がってきたら、至福の時間の始まりです。
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 bg-white text-neutral-900">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-black mb-16 md:mb-20 tracking-tight italic">
            FAQ
          </motion.h2>
          <div className="space-y-8 md:space-y-10 text-left">
            {[
              {
                q: "発送までどのくらいかかりますか？",
                a: "ご注文をいただいてから、倉敷のキッチンで一つずつ丁寧に作り上げます。通常3〜5営業日以内（土日祝を除く）に発送いたします。",
              },
              {
                q: "アレルギー対応について教えてください。",
                a: "台湾カステラには卵・乳を使用しております。紅白湯圓は特定原材料を含みませんが、胡麻湯圓にはごま・大豆が含まれます。",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 md:gap-8 items-start group p-6 md:p-8 rounded-2xl hover:bg-neutral-50 transition-all duration-300"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center font-black text-lg md:text-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  Q
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-lg md:text-xl text-neutral-800 leading-snug">{faq.q}</h4>
                  <p className="text-neutral-500 leading-relaxed text-base md:text-lg">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Info Section */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-black mb-6">
            小陽春オンラインショップ
          </motion.h2>
          <motion.p {...fadeIn} transition={{ delay: 0.1 }} className="text-neutral-500 text-lg leading-relaxed mb-10">
            「食を通じて縁を結ぶ」。
            <br />
            岡山県倉敷市のキッチンから、台湾の風と米粉の優しさをお届けします。
          </motion.p>
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-2 text-neutral-600">
            <p className="font-bold text-neutral-900">株式会社EAT結</p>
            <p>〒710-0063 岡山県倉敷市日吉町338番1</p>
            <p>086-454-7661</p>
            <p>pop@eatyui.com</p>
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.3 }} className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-neutral-500">
            <Link href="/shop/legal" className="hover:text-orange-600 transition-colors">
              特定商取引法に基づく表記
            </Link>
            <Link href="/shop/privacy" className="hover:text-orange-600 transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/shop/shipping" className="hover:text-orange-600 transition-colors">
              配送・送料について
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Cart Drawer */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl transition-transform duration-500 transform ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-8 md:p-12 h-full flex flex-col">
            <div className="flex items-center justify-between mb-12 border-b border-neutral-100 pb-6">
              <div className="flex items-center gap-4">
                <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
                <h2 className="text-xl md:text-2xl font-black tracking-tight text-neutral-900 italic">Your Cart</h2>
                <span className="bg-orange-50 text-orange-600 text-xs font-black px-3 py-1 rounded-full">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 md:p-3 hover:bg-neutral-50 rounded-full transition-colors text-neutral-900"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-32 space-y-6 text-neutral-900">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-neutral-50 rounded-full flex items-center justify-center mx-auto text-neutral-200">
                    <ShoppingCart className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <p className="text-neutral-400 font-bold italic tracking-widest text-lg uppercase">Your Cart is Empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 md:gap-6 items-center group text-neutral-900">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 border border-neutral-100 shadow-md group-hover:scale-105 transition-transform duration-500 bg-neutral-50 relative">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm md:text-base font-black text-neutral-800 truncate tracking-tight">
                          {item.name}
                        </h3>
                        <span className="text-sm md:text-base font-black text-orange-600">
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border border-neutral-200 rounded-xl bg-neutral-50 p-1 shadow-inner">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 md:p-2 hover:text-orange-600 transition-colors text-neutral-900"
                          >
                            <Minus className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                          <span className="text-sm w-8 text-center font-black text-neutral-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 md:p-2 hover:text-orange-600 transition-colors text-neutral-900"
                          >
                            <Plus className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-12 pt-10 border-t border-neutral-100 space-y-8 text-neutral-900">
                <div className="flex justify-between items-end">
                  <span className="text-neutral-400 font-black text-xs uppercase tracking-widest italic">Grand Total</span>
                  <div className="text-right">
                    <span className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight">
                      ¥{cartTotal.toLocaleString()}
                    </span>
                    <p className="text-xs text-neutral-400 mt-2 font-bold italic tracking-wider">
                      Shipping & Tax calculated at checkout
                    </p>
                  </div>
                </div>
                <button
                  disabled={isProcessing}
                  onClick={handleCheckout}
                  className={`w-full py-6 md:py-8 rounded-2xl font-black text-white shadow-2xl transition-all text-xl md:text-2xl tracking-wide ${
                    isProcessing ? "bg-neutral-300 cursor-not-allowed shadow-none" : "bg-[#635BFF] hover:bg-[#5851e0]"
                  }`}
                >
                  {isProcessing ? "Processing..." : "Stripeで決済する"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
