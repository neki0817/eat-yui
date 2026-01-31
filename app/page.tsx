"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"
import {
  Users,
  Globe,
  MapPin,
  Utensils,
  Award,
  ShoppingCart,
  ChevronRight,
  ExternalLink,
} from "lucide-react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

export default function HomePage() {
  const [heroImageUrl, setHeroImageUrl] = useState("/images/hero-kitchen-team.jpg")

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("shop_settings")
        .select("hero_image_url")
        .single()
      if (data?.hero_image_url) {
        setHeroImageUrl(data.hero_image_url)
      }
    }
    fetchSettings()
  }, [])

  const stats = [
    {
      label: "直営店舗数",
      value: "12",
      unit: "店舗",
      icon: <Utensils className="text-orange-600" />,
    },
    {
      label: "従業員数",
      value: "202",
      unit: "名",
      icon: <Users className="text-orange-600" />,
    },
    {
      label: "外国人スタッフ",
      value: "65",
      unit: "名",
      icon: <Globe className="text-orange-600" />,
    },
    {
      label: "展開エリア",
      value: "4",
      unit: "地域",
      icon: <MapPin className="text-orange-600" />,
    },
  ]

  const features = [
    {
      title: "多業態ブランディング",
      desc: "和食、イタリアン、居酒屋など、出店地域や施設のニーズに合わせた最適なコンセプトを柔軟に展開。",
      icon: <Award className="w-8 h-8 text-white" />,
      color: "bg-orange-500",
    },
    {
      title: "多様性の尊重",
      desc: "202名中65名が外国人スタッフ。異なる文化背景を持つチームが、グローバルな視点でのサービスを提供。",
      icon: <Globe className="w-8 h-8 text-white" />,
      color: "bg-blue-500",
    },
    {
      title: "地域密着の情熱",
      desc: "岡山から始まり東京、大阪、宮城へ。各地域の「食」の課題に寄り添い、地域を元気にする店舗運営。",
      icon: <MapPin className="w-8 h-8 text-white" />,
      color: "bg-green-600",
    },
  ]

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      {/* ヒーローセクション */}
      <section className="relative md:h-screen flex flex-col md:flex-row md:items-center overflow-hidden">
        {/* モバイル：画像を固定高さで表示 */}
        <div className="relative w-full h-[50vh] md:absolute md:inset-0 md:h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImageUrl}
            alt="EAT結のキッチンスタッフ"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%] md:object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* モバイル：テキストコンテンツ */}
        <div className="md:hidden relative z-10 bg-neutral-900 text-white px-6 py-10">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            食を通じて
            <br />
            <span className="text-orange-400">皆様に幸福を</span>
          </h1>
          <p className="text-base mb-8 text-neutral-300">
            多業態ブランディングと外国人スタッフの活用により、地域・施設のニーズに合わせた新しい食体験を創造します。
          </p>
          <div className="flex flex-col space-y-3">
            <Link
              href="/company"
              className="bg-white text-neutral-900 px-6 py-3 rounded-full font-bold text-center flex items-center justify-center"
            >
              企業情報を見る <ChevronRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/shop"
              className="bg-orange-600 text-white px-6 py-3 rounded-full font-bold text-center flex items-center justify-center"
            >
              <ShoppingCart className="mr-2" size={20} /> ECショップはこちら
            </Link>
          </div>
        </div>

        {/* デスクトップ：テキストコンテンツ */}
        <div className="hidden md:block relative z-10 max-w-7xl mx-auto px-6 w-full text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl font-bold leading-tight mb-6">
              食を通じて
              <br />
              <span className="text-orange-400">皆様に幸福を</span>
            </h1>
            <p className="text-xl max-w-2xl mb-10 text-neutral-200">
              多業態ブランディングと外国人スタッフの活用により、地域・施設のニーズに合わせた新しい食体験を創造します。
            </p>
            <div className="flex flex-row space-x-4">
              <Link
                href="/company"
                className="bg-white text-neutral-900 px-8 py-4 rounded-full font-bold hover:bg-orange-50 transition-colors flex items-center justify-center"
              >
                企業情報を見る <ChevronRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/shop"
                className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all flex items-center justify-center shadow-lg"
              >
                <ShoppingCart className="mr-2" size={20} /> ECショップはこちら
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex-col items-center"
        >
          <span className="text-sm font-light mb-2">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </motion.div>
      </section>

      {/* 実績数字セクション */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-neutral-50 rounded-2xl border border-neutral-100 shadow-sm"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl font-black text-neutral-900 mb-1">
                  {stat.value}
                  <span className="text-lg font-bold ml-1">{stat.unit}</span>
                </div>
                <div className="text-sm text-neutral-500 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <motion.span
            {...fadeIn}
            className="text-orange-600 font-bold tracking-widest uppercase text-sm"
          >
            Our Strength
          </motion.span>
          <motion.h2
            {...fadeIn}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mt-4"
          >
            EAT結の3つの特徴
          </motion.h2>
          <div className="w-16 h-1 bg-orange-600 mx-auto mt-6"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              {...fadeIn}
              transition={{ delay: idx * 0.2 }}
              className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div
                className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:scale-110`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-neutral-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EC誘導セクション */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-neutral-900 rounded-[3rem] overflow-hidden relative">
            <div className="grid md:grid-cols-2">
              <div className="p-12 md:p-20 text-white flex flex-col justify-center z-10">
                <motion.span
                  {...fadeIn}
                  className="text-orange-500 font-bold mb-4"
                >
                  ONLINE SHOP
                </motion.span>
                <motion.h2
                  {...fadeIn}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-5xl font-bold mb-6"
                >
                  お店の味をご自宅で
                </motion.h2>
                <motion.p
                  {...fadeIn}
                  transition={{ delay: 0.2 }}
                  className="text-neutral-400 mb-10 leading-relaxed text-lg"
                >
                  小陽春が手がける本格台湾料理を全国にお届けします。こだわりの味をご自宅でお楽しみください。
                </motion.p>
                <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
                  <Link
                    href="/shop"
                    className="inline-flex items-center space-x-3 bg-orange-600 hover:bg-orange-700 text-white px-10 py-5 rounded-full font-black transition-all shadow-xl group"
                  >
                    <span>オンラインショップへ</span>
                    <ExternalLink
                      size={20}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </Link>
                </motion.div>
              </div>
              <div className="relative min-h-[400px]">
                <Image
                  src="/images/stores/shao-yang-chun-exterior.jpg"
                  alt="小陽春店舗"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/40 to-transparent md:block hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            {...fadeIn}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            一緒に働きませんか？
          </motion.h2>
          <motion.p
            {...fadeIn}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-500 mb-10"
          >
            EAT結では多様なバックグラウンドを持つスタッフを募集しています。
            <br />
            国籍を問わず、食を通じて幸福を届ける仲間を歓迎します。
          </motion.p>
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/careers"
              className="bg-neutral-900 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-600 transition-all"
            >
              採用情報を見る
            </Link>
            <Link
              href="/contact-form"
              className="border-2 border-neutral-900 text-neutral-900 px-8 py-4 rounded-full font-bold hover:bg-neutral-900 hover:text-white transition-all"
            >
              お問い合わせ
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
