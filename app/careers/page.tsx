"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Globe, Heart, TrendingUp, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export default function CareersPage() {
  // ページロード時にトップにスクロール
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const benefits = [
    {
      icon: Users,
      title: "多様性を重視",
      description: "国籍を問わず、様々なバックグラウンドを持つスタッフが活躍しています。",
    },
    {
      icon: Globe,
      title: "国際的な職場環境",
      description: "65名の外国人スタッフとともに、グローバルな視点で働けます。",
    },
    {
      icon: Heart,
      title: "働きやすい環境",
      description: "スタッフ一人ひとりを大切にし、働きやすい職場づくりに努めています。",
    },
    {
      icon: TrendingUp,
      title: "キャリアアップ支援",
      description: "教育制度を充実させ、スタッフの成長をサポートします。",
    },
  ]

  const stats = [
    {
      number: "202名",
      description: "総従業員数",
    },
    {
      number: "65名",
      description: "外国人スタッフ",
    },
    {
      number: "32%",
      description: "外国人スタッフ比率",
    },
    {
      number: "12店舗",
      description: "全国展開",
    },
    {
      number: "3店舗",
      description: "現在募集中",
    },
  ]

  const positions = [
    {
      title: "店舗スタッフ（ホール・キッチン）",
      type: "正社員・アルバイト",
      locations: ["岡山", "大阪", "東京", "宮城"],
      description: "お客様への接客サービス、調理業務を担当していただきます。未経験者歓迎。",
      wage: "時給1,200円〜1,400円",
      features: ["経験により昇給", "多店舗展開", "多様な業態"],
    },
    {
      title: "店舗マネージャー",
      type: "正社員",
      locations: ["岡山", "大阪", "東京", "宮城"],
      description: "店舗運営全般の管理、スタッフの指導・育成を行っていただきます。",
      wage: "月給25万円〜",
      features: ["管理職経験優遇", "店舗運営スキル習得", "キャリアアップ"],
    },
    {
      title: "本部スタッフ",
      type: "正社員",
      locations: ["岡山"],
      description: "本部での企画・管理業務、各店舗のサポート業務を担当していただきます。",
      wage: "月給30万円〜",
      features: ["本部業務経験", "企画・管理スキル習得", "経営参画"],
    },
  ]

  return (
    <div className="pt-24 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">採用情報</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            「食を通じて皆様に幸福を」の理念に共感する仲間を募集しています。
          </p>
        </div>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">EAT結で働く魅力</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-orange-readable" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Current Job Openings */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">現在の募集職種（3店舗で積極採用中！）</h2>

          {/* Featured Job Posting */}
          <Card className="border-0 shadow-lg mb-8 bg-gradient-to-r from-orange-50 to-red-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-primary-black">小陽春 ヨドバシAkiba店</CardTitle>
                  <p className="text-lg text-charcoal mt-1">台湾カフェ・食堂スタッフ募集</p>
                </div>
                <Badge className="bg-accent-red text-white text-lg px-4 py-2">急募</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-primary-black mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-accent-red" />
                    募集職種
                  </h4>
                  <ul className="space-y-2 text-charcoal">
                    <li>• ホールスタッフ（接客）</li>
                    <li>• キッチンスタッフ（調理）</li>
                    <li>• 店長・マネージャー候補</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-primary-black mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-accent-gold" />
                    給与・待遇
                  </h4>
                  <ul className="space-y-2 text-charcoal">
                    <li>
                      • <span className="font-semibold text-accent-red">時給1,400円</span>
                    </li>
                    <li>• 昇給あり</li>
                    <li>• 交通費支給（月上限2万円）</li>
                    <li>• 研修期間：時給1,200円（3ヶ月）</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-primary-black mb-3 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-accent-navy" />
                    勤務時間・シフト
                  </h4>
                  <div className="space-y-2 text-charcoal">
                    <p>
                      <span className="font-semibold">営業時間：</span>10:00〜23:00
                    </p>
                    <p className="text-sm">シフト例：</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• 10:00〜17:00（7時間）</li>
                      <li>• 12:00〜22:00（10時間）</li>
                      <li>• 13:00〜17:00（4時間）</li>
                      <li>• 17:00〜23:00（6時間）</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-primary-black mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-accent-gold" />
                    勤務地・アクセス
                  </h4>
                  <div className="space-y-2 text-charcoal">
                    <p className="font-semibold">ヨドバシAkiba 8階</p>
                    <p className="text-sm">東京都千代田区神田花岡町1-1</p>
                    <div className="text-sm">
                      <p>• JR秋葉原駅 徒歩1分</p>
                      <p>• 東京メトロ末広町駅 徒歩9分</p>
                      <p>• JR神田駅 徒歩11分</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border-l-4 border-accent-red">
                <h4 className="font-bold text-primary-black mb-2">働き方の特徴</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <Badge className="justify-center bg-accent-red text-white hover:bg-accent-red/90">週1日〜OK</Badge>
                  <Badge className="justify-center bg-accent-gold text-white hover:bg-accent-gold/90">
                    1日4時間〜OK
                  </Badge>
                  <Badge className="justify-center bg-accent-navy text-white hover:bg-accent-navy/90">シフト相談</Badge>
                  <Badge className="justify-center bg-green-600 text-white hover:bg-green-700">未経験歓迎</Badge>
                  <Badge className="justify-center bg-purple-600 text-white hover:bg-purple-700">
                    平日ランチのみOK
                  </Badge>
                  <Badge className="justify-center bg-blue-600 text-white hover:bg-blue-700">週末勤務歓迎</Badge>
                  <Badge className="justify-center bg-orange-600 text-white hover:bg-orange-700">10時以降勤務OK</Badge>
                  <Badge className="justify-center bg-pink-600 text-white hover:bg-pink-700">17時前退社OK</Badge>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-bold text-primary-black mb-3">収入例</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white rounded p-3">
                    <p className="font-semibold text-accent-navy mb-2">■ スキマ時間に働きたい主婦の方</p>
                    <p>時給1,400円 × 1日4時間 × 週2日勤務</p>
                    <p className="text-accent-red font-bold">= 月収例 44,800円</p>
                  </div>
                  <div className="bg-white rounded p-3">
                    <p className="font-semibold text-accent-navy mb-2">■ しっかり稼ぎたい大学生の方</p>
                    <p>時給1,400円 × 1日6時間 × 週3日勤務</p>
                    <p className="text-accent-red font-bold">= 月収例 100,800円</p>
                  </div>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 shadow-lg">
                <h4 className="text-white text-xl font-bold mb-4">今すぐ応募しませんか？</h4>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-all"
                  >
                    <Link href="/contact" className="flex items-center">
                      📝 この求人に応募する
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-red-600 bg-transparent font-bold text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-all"
                  >
                    💬 詳細を問い合わせる
                  </Button>
                </div>
                <p className="text-white text-sm mt-3 opacity-90">応募は簡単1分！お気軽にご連絡ください</p>
              </div>
            </CardContent>
          </Card>

          {/* Sendai Area Job Postings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Hachimaki Job Posting */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-primary-black">はちまき ヨドバシ仙台店</CardTitle>
                    <p className="text-charcoal mt-1">大阪たこ焼&ねぎ焼酒場スタッフ</p>
                  </div>
                  <Badge className="bg-accent-navy text-white">募集中</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-primary-black">時給</p>
                    <p className="text-accent-red font-bold">1,060円〜</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-black">勤務時間</p>
                    <p className="text-charcoal">10:00〜24:00</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-black">最寄駅</p>
                    <p className="text-charcoal">仙台駅直結</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-black">シフト</p>
                    <p className="text-charcoal">週1日・4時間〜OK</p>
                  </div>
                </div>

                <div className="bg-white rounded p-3 text-sm">
                  <p className="font-semibold text-accent-navy mb-2">仕事内容</p>
                  <p className="text-charcoal">席案内・オーダー・配膳・簡単な調理・ドリンク作り等</p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge className="bg-green-600 text-white">未経験歓迎</Badge>
                  <Badge className="bg-orange-600 text-white">まかない付き</Badge>
                  <Badge className="bg-blue-600 text-white">制服貸与</Badge>
                  <Badge className="bg-purple-600 text-white">交通費支給</Badge>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 text-center">
                  <Button
                    size="lg"
                    className="w-full bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg py-3 shadow-lg transform hover:scale-105 transition-all"
                  >
                    <Link href="/contact" className="flex items-center justify-center">
                      📝 この求人に応募する
                    </Link>
                  </Button>
                  <p className="text-white text-xs mt-2 opacity-90">応募は1分で完了！</p>
                </div>
              </CardContent>
            </Card>

            {/* Kin no Kona Job Posting */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-primary-black">金の粉 ヨドバシ仙台店</CardTitle>
                    <p className="text-charcoal mt-1">串カツ屋スタッフ</p>
                  </div>
                  <Badge className="bg-accent-gold text-white">募集中</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-primary-black">時給</p>
                    <p className="text-accent-red font-bold">1,060円〜</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-black">勤務時間</p>
                    <p className="text-charcoal">10:00〜24:00</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-black">最寄駅</p>
                    <p className="text-charcoal">仙台駅直結</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary-black">シフト</p>
                    <p className="text-charcoal">週1日・4時間〜OK</p>
                  </div>
                </div>

                <div className="bg-white rounded p-3 text-sm">
                  <p className="font-semibold text-accent-navy mb-2">仕事内容</p>
                  <p className="text-charcoal">席案内・オーダー・配膳・簡単な調理・ドリンク作り等</p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge className="bg-green-600 text-white">未経験歓迎</Badge>
                  <Badge className="bg-orange-600 text-white">まかない付き</Badge>
                  <Badge className="bg-blue-600 text-white">制服貸与</Badge>
                  <Badge className="bg-purple-600 text-white">交通費支給</Badge>
                </div>

                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-4 text-center">
                  <Button
                    size="lg"
                    className="w-full bg-white text-yellow-600 hover:bg-gray-100 font-bold text-lg py-3 shadow-lg transform hover:scale-105 transition-all"
                  >
                    <Link href="/contact" className="flex items-center justify-center">
                      📝 この求人に応募する
                    </Link>
                  </Button>
                  <p className="text-white text-xs mt-2 opacity-90">応募は1分で完了！</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary of Current Openings */}
          <Card className="border-0 shadow-lg mb-8 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-6">
              <div className="text-center">
                <h4 className="text-xl font-bold text-primary-black mb-4">現在3店舗で積極採用中！</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded p-3">
                    <p className="font-semibold text-accent-red">小陽春（秋葉原）</p>
                    <p className="text-charcoal">台湾カフェ・時給1,400円</p>
                  </div>
                  <div className="bg-white rounded p-3">
                    <p className="font-semibold text-accent-navy">はちまき（仙台）</p>
                    <p className="text-charcoal">たこ焼き酒場・時給1,060円</p>
                  </div>
                  <div className="bg-white rounded p-3">
                    <p className="font-semibold text-accent-gold">金の粉（仙台）</p>
                    <p className="text-charcoal">串カツ屋・時給1,060円</p>
                  </div>
                </div>
                <p className="text-charcoal mt-4">
                  <strong>共通条件：</strong>週1日・1日4時間からOK / 未経験歓迎 / まかない付き / 交通費支給 / 制服貸与
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Diversity Stats */}
        <section className="mb-16 bg-green-50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">多様性の実績</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-4xl font-bold text-green-readable mb-2">{stat.number}</div>
                  <div className="text-gray-700">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Positions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">募集職種</h2>
          <div className="space-y-6">
            {positions.map((position, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <CardTitle className="text-xl mb-2 md:mb-0">{position.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="w-fit">
                        {position.type}
                      </Badge>
                      <Badge className="bg-accent-red text-white w-fit">{position.wage}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{position.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-sm font-medium text-gray-600">勤務地:</span>
                    {position.locations.map((location, locIndex) => (
                      <Badge key={locIndex} variant="secondary">
                        {location}
                      </Badge>
                    ))}
                  </div>

                  {position.features && (
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm font-medium text-gray-600">特徴:</span>
                      {position.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} className="text-xs bg-accent-gold text-white hover:bg-accent-gold/90">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education & Career Development */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-2xl text-center">教育制度・キャリアアップ</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">新人研修制度</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 基本的な接客マナー研修</li>
                    <li>• 食品衛生・安全管理研修</li>
                    <li>• 多言語対応研修</li>
                    <li>• OJTによる実践的な指導</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">キャリアパス</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• スタッフ → 主任 → 店長</li>
                    <li>• 店長 → エリアマネージャー</li>
                    <li>• 本部での企画・管理職への道</li>
                    <li>• 新店舗立ち上げプロジェクト参加</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gray-900 text-white rounded-lg p-12">
          <h3 className="text-3xl font-bold mb-6">一緒に働きませんか？</h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            国籍や経験を問わず、食を通じて幸福を届けたいという想いを 共有できる方をお待ちしています。
          </p>
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-3 inline-block shadow-lg">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100 font-bold text-xl px-10 py-4 shadow-lg transform hover:scale-105 transition-all"
            >
              <Link href="/contact" className="flex items-center">
                📝 今すぐ応募する
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
