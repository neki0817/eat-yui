"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Utensils, Clock } from "lucide-react"
import Image from "next/image"

export default function StoresPage() {
  // ページロード時にトップにスクロール
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const storeGroups = [
    {
      company: "株式会社EAT結",
      stores: [
        // 岡山エリア（アリオ倉敷内）
        {
          id: 1,
          name: "さぬき三郎 アリオ倉敷店",
          type: "フードコート",
          cuisine: "うどん",
          hours: "10:00〜21:00",
          address: "岡山県倉敷市寿町12番2号 アリオ倉敷2Fフードコート内",
          area: "岡山",
          openDate: "2020年2月1日",
          logo: "/images/stores/sanuki-saburo-logo.jpg",
          image: "/images/stores/sanuki-saburo-exterior.jpg",
        },
        {
          id: 2,
          name: "Hiyori Coffee アリオ倉敷店",
          type: "レストラン",
          cuisine: "洋食・カフェ",
          hours: "11:00〜22:00",
          address: "岡山県倉敷市寿町12番2号 アリオ倉敷1Fレストラン街",
          area: "岡山",
          openDate: "2020年2月1日",
          logo: "/images/stores/hiyori-coffee-logo.jpg",
          image: "/images/stores/hiyori-coffee-exterior.jpg",
        },
        {
          id: 3,
          name: "粉助 アリオ倉敷店",
          type: "フードコート",
          cuisine: "たこ焼き・焼きそば",
          hours: "10:00〜21:00",
          address: "岡山県倉敷市寿町12番2号 アリオ倉敷2Fフードコート内",
          area: "岡山",
          openDate: "2020年2月1日",
          logo: "/images/stores/konosuke-logo.jpg",
          image: "/images/stores/konosuke-exterior.jpg",
        },
        {
          id: 4,
          name: "肉壱番 アリオ倉敷店",
          type: "フードコート",
          cuisine: "肉丼・韓国料理",
          hours: "10:00〜21:00",
          address: "岡山県倉敷市寿町12番2号 アリオ倉敷2Fフードコート内",
          area: "岡山",
          openDate: "2020年2月1日",
          logo: "/images/stores/niku-ichiban-logo.jpg",
          image: "/images/stores/niku-ichiban-exterior.jpg",
        },
        {
          id: 5,
          name: "鶏いち アリオ倉敷店",
          type: "フードコート",
          cuisine: "鶏料理・丼・定食",
          hours: "10:00〜21:00",
          address: "岡山県倉敷市寿町12番2号 アリオ倉敷2Fフードコート内",
          area: "岡山",
          openDate: "2020年2月1日",
          logo: "/images/stores/tori-ichi-logo.jpg",
          image: "/images/stores/tori-ichi-exterior.jpg",
        },
        // 大阪エリア（りんくうシークル内）
        {
          id: 6,
          name: "小陽春 りんくうシークル店",
          type: "レストラン",
          cuisine: "台湾料理",
          hours: "11:00〜22:00",
          address: "大阪府泉佐野市りんくう往来南3番地 りんくうプレジャータウンシークル2F",
          area: "大阪",
          openDate: "2021年8月16日",
          logo: "/images/stores/shao-yang-chun-logo.jpg",
          image: "/images/stores/shao-yang-chun-exterior.jpg",
        },
        {
          id: 7,
          name: "時鮭 りんくうシークル店",
          type: "レストラン",
          cuisine: "和定食・創作料理",
          hours: "11:00〜23:00",
          address: "大阪府泉佐野市りんくう往来南3番地 りんくうプレジャータウンシークル2F",
          area: "大阪",
          openDate: "2021年8月16日",
          logo: "/images/stores/tokishake-logo.jpg",
          image: "/images/stores/tokishake-exterior.jpg",
        },
        // 東京エリア
        {
          id: 8,
          name: "小陽春 ヨドバシAkiba店",
          type: "レストラン",
          cuisine: "台湾料理",
          hours: "11:00〜23:00",
          address: "東京都千代田区神田花岡町1－1 ヨドバシAkiba 8F",
          area: "東京",
          openDate: "2021年12月22日",
          logo: "/images/stores/shao-yang-chun-logo.jpg",
          image: "/images/stores/shao-yang-chun-akiba-exterior.jpg",
        },
        {
          id: 9,
          name: "金の粉 ヨドバシ仙台店",
          type: "横丁レストラン",
          cuisine: "串カツ・居酒屋",
          hours: "11:00〜23:00",
          address: "宮城県仙台市宮城野区榴岡1－3－1 ヨドバシ仙台第1ビル 1F",
          area: "宮城",
          openDate: "2023年7月14日",
          logo: "/images/stores/kin-no-kona-logo.jpg",
          image: "/images/stores/kin-no-kona-exterior.jpg",
        },
        {
          id: 10,
          name: "はちまき ヨドバシ仙台店",
          type: "横丁レストラン",
          cuisine: "たこ焼き・お好み焼き・居酒屋",
          hours: "11:00〜23:00",
          address: "宮城県仙台市宮城野区榴岡1－3－1 ヨドバシ仙台第1ビル 1F",
          area: "宮城",
          openDate: "2023年12月20日",
          logo: "/images/stores/hachimaki-logo.jpg",
          image: "/images/stores/hachimaki-exterior.jpg",
        },
        {
          id: 11,
          name: "かもめ食堂 ヨドバシAkiba店",
          type: "レストラン",
          cuisine: "お好み焼き・鉄板焼き",
          hours: "11:00〜23:00",
          address: "東京都千代田区神田花岡町1－1 ヨドバシAkiba 8F",
          area: "東京",
          openDate: "2024年12月11日",
          logo: "/images/stores/kamome-shokudo-logo.jpg",
          image: "/images/stores/kamome-shokudo-exterior.jpg",
        },
        {
          id: 12,
          name: "火炎山 アリオ亀有店",
          type: "フードコート",
          cuisine: "肉丼・韓国料理",
          hours: "10:00〜22:00",
          address: "東京都葛飾区亀有3丁目49番3号 アリオ亀有1F",
          area: "東京",
          openDate: "2025年5月1日",
          logo: "/images/stores/kaenzan-logo.jpg",
          image: "/images/stores/kaenzan-exterior.jpg",
        },
      ],
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "フードコート":
        return "bg-accent-red bg-opacity-10 text-accent-red border-accent-red"
      case "レストラン":
        return "bg-accent-navy bg-opacity-10 text-accent-navy border-accent-navy"
      case "横丁レストラン":
        return "bg-accent-gold bg-opacity-10 text-accent-gold border-accent-gold"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const groupedStores = storeGroups[0].stores.reduce(
    (acc, store) => {
      if (!acc[store.area]) {
        acc[store.area] = []
      }
      acc[store.area].push(store)
      return acc
    },
    {} as Record<string, (typeof storeGroups)[0]["stores"]>,
  )

  const areaInfo = {
    岡山: { count: 5, location: "アリオ倉敷内" },
    大阪: { count: 2, location: "りんくうシークル内" },
    東京: { count: 3, location: "複数施設" },
    宮城: { count: 2, location: "ヨドバシ仙台内" },
  }

  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-black mb-6">店舗一覧</h1>
          <p className="text-xl text-charcoal max-w-3xl mx-auto">
            4つのエリアで12店舗を展開し、地域特性に合わせた多業態ブランディングを実現。
          </p>
        </div>

        {/* Store Areas */}
        <div className="space-y-12">
          {Object.entries(groupedStores).map(([area, stores]) => (
            <section key={area}>
              <div className="flex items-center mb-8 japanese-accent">
                <MapPin className="w-6 h-6 text-accent-red mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold text-primary-black">{area}エリア</h2>
                <span className="ml-4 text-charcoal">
                  ({areaInfo[area as keyof typeof areaInfo]?.location} -{" "}
                  {areaInfo[area as keyof typeof areaInfo]?.count}店舗)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((store) => (
                  <Card key={store.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                    {/* Store Image */}
                    {store.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={store.image || "/placeholder.svg"}
                          alt={`${store.name}の外観`}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    )}

                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {store.logo && (
                            <div className="w-16 h-10 relative flex-shrink-0">
                              <Image
                                src={store.logo || "/placeholder.svg"}
                                alt={`${store.name}のロゴ`}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                          <CardTitle className="text-lg text-primary-black">{store.name}</CardTitle>
                        </div>
                        <Utensils className="w-5 h-5 text-charcoal flex-shrink-0" />
                      </div>
                      <Badge className={`${getTypeColor(store.type)} border w-fit`}>{store.type}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-charcoal font-medium">{store.cuisine}</p>

                      <div className="flex items-center text-sm text-charcoal">
                        <Clock className="w-4 h-4 mr-2 text-accent-gold" />
                        <span>{store.hours}</span>
                      </div>

                      <div className="text-sm text-charcoal">
                        <MapPin className="w-4 h-4 inline mr-1 text-accent-gold" />
                        <span className="text-xs leading-relaxed">{store.address}</span>
                      </div>

                      <div className="text-xs text-gray-500 pt-2 border-t">開店日: {store.openDate}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Summary Section */}
        <section className="mt-16 bg-warm-beige rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary-black mb-4 japanese-accent">多業態ブランディングの強み</h3>
            <p className="text-charcoal leading-relaxed max-w-4xl mx-auto">
              EAT結では、各店舗が立地する施設や地域の特性に合わせて、
              最適な業態とメニューを提供しています。フードコートでの気軽な食事から、
              レストランでのゆったりとしたお食事まで、お客様のニーズに応じた多様な食体験をお届けしています。
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-red mb-2">12</div>
                <div className="text-charcoal text-sm">直営店舗</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-red mb-2">4</div>
                <div className="text-charcoal text-sm">展開エリア</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-red mb-2">3</div>
                <div className="text-charcoal text-sm">業態タイプ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-red mb-2">2019</div>
                <div className="text-charcoal text-sm">設立年</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
