"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function CompanyPage() {
  // ページロード時にトップにスクロール
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const companyInfo = [
    { label: "会社名", value: "株式会社EAT結" },
    { label: "代表者", value: "代表取締役 福田嘉章" },
    { label: "設立", value: "令和1年10月18日（2019年10月）" },
    { label: "所在地", value: "岡山本社：岡山県倉敷市日吉町338番地1 / 東京オフィス：東京都渋谷区恵比寿1-30-1" },
    { label: "従業員数", value: "202名（社員48名、パートアルバイト154名）" },
    { label: "外国人スタッフ", value: "65名（社員39名、アルバイト26名）" },
    { label: "事業内容", value: "飲食店経営（直営12店舗）" },
    { label: "展開エリア", value: "岡山県、大阪府、東京都、宮城県" },
  ]

  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">企業情報</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            株式会社EAT結の企業理念、ビジョン、会社概要をご紹介します。
          </p>
        </div>

        {/* CEO Message */}
        <section className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-2xl text-center">代表者挨拶</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1">
                  <Image
                    src="/placeholder.svg?height=300&width=250"
                    alt="代表取締役 福田嘉章"
                    width={250}
                    height={300}
                    className="rounded-lg mx-auto"
                  />
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-semibold">福田嘉章</h3>
                    <p className="text-gray-600">代表取締役</p>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      株式会社EAT結は「食を通じて皆様に幸福を」という経営理念のもと、
                      2019年の設立以来、多様性を大切にした飲食店経営を行ってまいりました。
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      現在、岡山・大阪・東京・宮城の4つのエリアで12店舗を展開し、
                      202名のスタッフが働いています。その中でも特に誇りに思うのは、
                      65名の外国人スタッフが活躍していることです。
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      私たちは単なる飲食店経営ではなく、地域・施設のニーズに合わせた
                      多業態ブランディングを通じて、お客様に最適な食体験を提供しています。
                      また、多国籍なスタッフとともに、国際的な視点を持った サービスの向上に努めています。
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      今後も「食を通じて皆様に幸福を」届けるため、
                      スタッフ一同、心を込めてサービスを提供してまいります。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-xl text-center">経営理念</CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <div className="text-3xl font-bold text-green-readable mb-4">「食を通じて皆様に幸福を」</div>
                <p className="text-gray-700 leading-relaxed">
                  私たちは食事を通じて、お客様に喜びと幸せをお届けすることを
                  最も大切な使命と考えています。美味しい料理と心のこもったサービスで、
                  地域の皆様の豊かな食生活に貢献します。
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-orange-50">
                <CardTitle className="text-xl text-center">ビジョン</CardTitle>
              </CardHeader>
              <CardContent className="p-8 text-center">
                <div className="text-2xl font-bold text-orange-readable mb-4">
                  多様性を活かした
                  <br />
                  地域密着型企業
                </div>
                <p className="text-gray-700 leading-relaxed">
                  多国籍なスタッフの力を活かし、各地域の特性に合わせた
                  多業態展開を通じて、お客様に愛され続ける企業を目指します。
                  国際的な視点と地域への愛情を両立させた経営を実践します。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Company Information */}
        <section>
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-2xl text-center">会社概要</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {companyInfo.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-4 px-4 font-semibold text-gray-700 bg-gray-50 w-1/3">{item.label}</td>
                        <td className="py-4 px-4 text-gray-700">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
