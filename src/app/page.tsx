import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Globe, Store } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const features = [
    {
      icon: Store,
      title: "多業態ブランディング",
      description: "12店舗で異なる業態を展開し、地域・施設のニーズに合わせたブランディングを実現しています。",
    },
    {
      icon: Users,
      title: "外国人スタッフ活用",
      description: "202名中65名が外国人スタッフ。多様性を活かした国際的な職場環境を構築しています。",
    },
    {
      icon: Globe,
      title: "地域密着型運営",
      description: "岡山・大阪・東京・宮城の4エリアで地域に根ざしたサービスを提供しています。",
    },
  ]

  const stats = [
    { number: "12", label: "直営店舗数" },
    { number: "202", label: "従業員数" },
    { number: "65", label: "外国人スタッフ" },
    { number: "4", label: "展開エリア" },
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="hero-gradient text-white section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                食を通じて
                <br />
                皆様に幸福を
              </h1>
              <p className="text-xl mb-8 text-orange-100">
                株式会社EAT結は、多業態ブランディングと外国人スタッフの活用により、
                4つのエリアで12店舗を展開する飲食店経営会社です。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                  <Link href="/company">企業情報を見る</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-500 bg-transparent"
                >
                  <Link href="/stores">店舗一覧を見る</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/hero-kitchen-team.jpg"
                alt="EAT結のキッチンスタッフ4名が笑顔でカウンターに並んで立っている実際の店舗風景"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-warm-beige section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent-red mb-2">{stat.number}</div>
                <div className="text-charcoal font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-black mb-4">EAT結の3つの特徴</h2>
            <p className="text-xl text-charcoal max-w-3xl mx-auto">
              私たちは多様性と地域密着を大切にし、お客様に最高の食体験を提供しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent-gold bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-accent-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-primary-black mb-4">{feature.title}</h3>
                  <p className="text-charcoal leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="bg-warm-beige section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-black mb-6 japanese-accent">会社概要</h2>
              <div className="space-y-4 text-charcoal">
                <div className="flex">
                  <span className="font-semibold w-24">会社名:</span>
                  <span>株式会社EAT結</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">代表者:</span>
                  <span>代表取締役 福田嘉章</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">設立:</span>
                  <span>令和1年10月18日（2019年10月）</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">所在地:</span>
                  <div>
                    <div className="mb-1">
                      <span className="font-semibold text-accent-red">岡山本社：</span>
                      岡山県倉敷市日吉町338番地1
                    </div>
                    <div>
                      <span className="font-semibold text-accent-navy">東京オフィス：</span>
                      東京都渋谷区恵比寿1-30-1
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">従業員:</span>
                  <span>202名（社員48名、パートアルバイト154名）</span>
                </div>
              </div>
              <div className="mt-8 bg-gradient-to-r from-accent-red to-orange-600 rounded-lg p-1 shadow-lg inline-block">
                <Button className="bg-white text-accent-red hover:bg-gray-100 font-bold text-lg px-8 py-3 shadow-md transform hover:scale-105 transition-all">
                  <Link href="/company" className="flex items-center">
                    📖 詳しく見る
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="EAT結の店舗内観"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-black text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">一緒に働きませんか？</h2>
          <p className="text-xl text-gray-300 mb-8">
            EAT結では多様なバックグラウンドを持つスタッフを募集しています。
            国籍を問わず、食を通じて幸福を届ける仲間を歓迎します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-gradient-to-r from-accent-red to-orange-600 rounded-lg p-1 shadow-lg">
              <Button size="lg" className="bg-white text-accent-red hover:bg-gray-100 font-bold text-lg px-8 py-3">
                <Link href="/careers" className="flex items-center">
                  💼 採用情報を見る
                </Link>
              </Button>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary-black bg-transparent"
            >
              <Link href="/contact">お問い合わせ</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
