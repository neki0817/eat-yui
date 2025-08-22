import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Store, TrendingUp, Globe, Award, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BusinessPage() {
  const businessOverview = {
    established: "2019年10月",
    stores: 12,
    employees: 185,
    foreignStaff: 65,
    areas: 4,
  }

  const areas = [
    {
      name: "岡山エリア",
      stores: 5,
      location: "アリオ倉敷内",
      description:
        "地元岡山の中心地として、多様な業態で地域のお客様にサービスを提供。フードコートを中心とした気軽な食事から、カフェまで幅広く展開。",
      features: ["地域密着型運営", "多業態展開", "ファミリー層に人気"],
      storeTypes: ["フードコート", "レストラン"],
    },
    {
      name: "大阪エリア",
      stores: 2,
      location: "りんくうシークル内",
      description:
        "関西国際空港に近い立地を活かし、国際色豊かなメニューを提供。台湾料理と和食で、多様なお客様のニーズに対応。",
      features: ["国際的立地", "多国籍メニュー", "観光客対応"],
      storeTypes: ["レストラン"],
    },
    {
      name: "東京エリア",
      stores: 3,
      location: "ヨドバシAkiba・アリオ亀有",
      description:
        "首都圏の多様な立地で、都市部のライフスタイルに合わせたサービスを展開。秋葉原と亀有で異なる客層にアプローチ。",
      features: ["都市部展開", "多様な客層", "アクセス良好"],
      storeTypes: ["レストラン", "フードコート"],
    },
    {
      name: "宮城エリア",
      stores: 2,
      location: "ヨドバシ仙台内",
      description: "東北地方の拠点として、横丁スタイルの居酒屋業態を展開。地域の食文化と融合した独自のサービスを提供。",
      features: ["東北拠点", "横丁スタイル", "地域食文化融合"],
      storeTypes: ["横丁レストラン"],
    },
  ]

  const strengths = [
    {
      icon: Store,
      title: "多業態ブランディング",
      description:
        "フードコート、レストラン、横丁レストランなど、立地と顧客ニーズに合わせた最適な業態を選択・運営しています。",
      details: [
        "立地特性の徹底分析",
        "ターゲット層に合わせた業態選択",
        "柔軟なメニュー開発",
        "効率的な店舗運営システム",
      ],
    },
    {
      icon: Users,
      title: "外国人労働力活用ノウハウ",
      description:
        "185名中65名（35%）が外国人スタッフ。多様性を活かした国際的な職場環境と独自の人材活用システムを構築。",
      details: [
        "多言語対応システム",
        "文化的多様性の尊重",
        "国際的な人材育成プログラム",
        "効果的なコミュニケーション手法",
      ],
    },
    {
      icon: Globe,
      title: "地域密着型運営",
      description:
        "各エリアの特性を理解し、地域に根ざしたサービスを提供。地元のお客様に愛される店舗づくりを実践しています。",
      details: ["地域ニーズの詳細調査", "地元食材の積極活用", "地域イベントへの参加", "継続的な顧客関係構築"],
    },
    {
      icon: TrendingUp,
      title: "安定した経営基盤と成長実績",
      description:
        "2019年設立以来、着実に店舗数を拡大し12店舗体制を構築。多様な立地での成功実績と安定した経営基盤を確立しています。",
      details: [
        "短期間での12店舗展開実績",
        "多様な立地・業態での成功ノウハウ",
        "安定した店舗運営システム",
        "継続的な事業拡大モデル",
      ],
    },
  ]

  const businessModel = [
    {
      phase: "市場調査・立地分析",
      description: "出店候補地の詳細な市場調査と競合分析を実施",
      icon: Target,
    },
    {
      phase: "業態選択・コンセプト設計",
      description: "立地特性に最適な業態とメニューコンセプトを決定",
      icon: Award,
    },
    {
      phase: "店舗開発・スタッフ採用",
      description: "効率的な店舗設計と多様な人材の採用・育成",
      icon: Users,
    },
    {
      phase: "運営・改善・拡大",
      description: "継続的な運営改善と次の展開エリアへの拡大",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-black mb-6">事業紹介</h1>
          <p className="text-xl text-charcoal max-w-3xl mx-auto leading-relaxed">
            EAT結の事業概要、展開エリア、競合他社との差別化ポイントをご紹介いたします。
          </p>
        </div>

        {/* Business Overview */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-warm-beige">
              <CardTitle className="text-2xl text-center text-primary-black">事業概要</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-primary-black mb-4 japanese-accent">飲食店経営事業</h3>
                  <p className="text-charcoal leading-relaxed mb-6">
                    株式会社EAT結は、{businessOverview.established}の設立以来、
                    「食を通じて皆様に幸福を」という経営理念のもと、 全国{businessOverview.areas}エリアで
                    {businessOverview.stores}店舗の直営店を展開しています。
                  </p>
                  <p className="text-charcoal leading-relaxed mb-6">
                    {businessOverview.employees}名のスタッフのうち{businessOverview.foreignStaff}
                    名が外国人スタッフという
                    多様性に富んだ組織で、地域・施設のニーズに合わせた多業態ブランディングを強みとしています。
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-accent-red bg-opacity-10 rounded-lg">
                      <div className="text-2xl font-bold text-accent-red">{businessOverview.stores}</div>
                      <div className="text-sm text-charcoal">直営店舗</div>
                    </div>
                    <div className="text-center p-4 bg-accent-gold bg-opacity-10 rounded-lg">
                      <div className="text-2xl font-bold text-accent-gold">{businessOverview.areas}</div>
                      <div className="text-sm text-charcoal">展開エリア</div>
                    </div>
                  </div>
                </div>
                <div>
                  <Image
                    src="/images/business-multicultural-team.png"
                    alt="EAT結の多国籍なスタッフチーム - 笑顔で働く5名のレストランスタッフ"
                    width={500}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Business Areas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary-black mb-12 japanese-accent">展開エリア</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {areas.map((area, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-primary-black">{area.name}</CardTitle>
                    <Badge className="bg-accent-navy bg-opacity-10 text-accent-navy border-accent-navy">
                      {area.stores}店舗
                    </Badge>
                  </div>
                  <p className="text-sm text-charcoal">{area.location}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-charcoal leading-relaxed">{area.description}</p>

                  <div>
                    <h4 className="font-semibold text-primary-black mb-2">特徴</h4>
                    <div className="flex flex-wrap gap-2">
                      {area.features.map((feature, featureIndex) => (
                        <Badge
                          key={featureIndex}
                          variant="outline"
                          className="text-xs border-accent-gold text-accent-gold"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary-black mb-2">業態</h4>
                    <div className="flex flex-wrap gap-2">
                      {area.storeTypes.map((type, typeIndex) => (
                        <Badge key={typeIndex} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Strengths & Differentiation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary-black mb-12 japanese-accent">
            強み・差別化ポイント
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {strengths.map((strength, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent-red bg-opacity-10 rounded-full flex items-center justify-center">
                      <strength.icon className="w-6 h-6 text-accent-red" />
                    </div>
                    <CardTitle className="text-lg text-primary-black">{strength.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-charcoal leading-relaxed">{strength.description}</p>
                  <div>
                    <h4 className="font-semibold text-primary-black mb-2">具体的な取り組み</h4>
                    <ul className="space-y-1">
                      {strength.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-sm text-charcoal flex items-center">
                          <div className="w-1.5 h-1.5 bg-accent-gold rounded-full mr-2"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Business Model */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary-black mb-12 japanese-accent">事業展開モデル</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessModel.map((phase, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-accent-navy bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <phase.icon className="w-8 h-8 text-accent-navy" />
                  </div>
                  <div className="text-sm font-semibold text-accent-red mb-2">STEP {index + 1}</div>
                  <h3 className="text-lg font-bold text-primary-black mb-3">{phase.phase}</h3>
                  <p className="text-sm text-charcoal leading-relaxed">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Future Vision */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg bg-primary-black text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">今後のビジョン</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                EAT結は、多様性を活かした独自の経営ノウハウを基盤として、
                さらなる地域展開と新業態の開発を進めてまいります。 「食を通じて皆様に幸福を」届けるため、
                常にお客様の声に耳を傾け、進化し続ける企業を目指します。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-accent-red hover:bg-accent-red/90 text-white">
                  <Link href="/stores">店舗一覧を見る</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-black bg-transparent"
                >
                  <Link href="/careers">採用情報を見る</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
