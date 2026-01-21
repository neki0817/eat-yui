"use client"

import Link from "next/link"
import { ArrowLeft, Truck, Clock, Package, AlertCircle } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/shop"
            className="inline-flex items-center text-neutral-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            ショップに戻る
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">配送・送料について</h1>

        {/* 送料について */}
        <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">送料について</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-50 rounded-xl p-6">
              <p className="text-lg font-bold text-orange-700 mb-2">
                5,000円（税込）以上のご購入で送料無料！
              </p>
              <p className="text-sm text-orange-600">
                ※クール便の場合も送料無料が適用されます
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-neutral-100">
                    <th className="text-left px-4 py-3 font-semibold text-neutral-700 border border-neutral-200">
                      配送区分
                    </th>
                    <th className="text-left px-4 py-3 font-semibold text-neutral-700 border border-neutral-200">
                      送料（税込）
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 border border-neutral-200 text-neutral-600">
                      通常配送（常温便）
                    </td>
                    <td className="px-4 py-3 border border-neutral-200 text-neutral-600">
                      全国一律 880円
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-neutral-200 text-neutral-600">
                      クール便（冷蔵・冷凍）
                    </td>
                    <td className="px-4 py-3 border border-neutral-200 text-neutral-600">
                      全国一律 1,100円（通常送料 + 220円）
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-neutral-500">
              ※一部離島・遠隔地は追加料金が発生する場合がございます。<br />
              ※常温商品とクール便商品を同時にご購入の場合、クール便送料が適用されます。
            </p>
          </div>
        </section>

        {/* 配送について */}
        <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">配送日数</h2>
          </div>

          <div className="space-y-4 text-neutral-600">
            <p>
              ご注文確認後、<strong className="text-neutral-900">3〜5営業日</strong>以内に発送いたします。
            </p>
            <p>
              ※ご注文の混雑状況や在庫状況により、発送までにお時間をいただく場合がございます。<br />
              ※年末年始、ゴールデンウィーク、お盆期間等は発送が遅れる場合がございます。
            </p>

            <div className="bg-neutral-50 rounded-xl p-6 mt-6">
              <h3 className="font-bold text-neutral-900 mb-3">地域別お届け目安</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between py-2 border-b border-neutral-200">
                  <span>関東・中部・関西・中国・四国</span>
                  <span className="font-semibold">発送日の翌日〜翌々日</span>
                </li>
                <li className="flex justify-between py-2 border-b border-neutral-200">
                  <span>北海道・東北・九州</span>
                  <span className="font-semibold">発送日から2〜3日</span>
                </li>
                <li className="flex justify-between py-2">
                  <span>沖縄・離島</span>
                  <span className="font-semibold">発送日から3〜5日</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 配送業者 */}
        <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">配送業者</h2>
          </div>

          <div className="space-y-4 text-neutral-600">
            <p>
              ヤマト運輸または佐川急便にてお届けいたします。<br />
              ※配送業者のご指定はお受けしておりません。
            </p>
            <p>
              発送完了後、追跡番号をメールにてお知らせいたします。
              荷物の配送状況は各配送業者のウェブサイトにてご確認いただけます。
            </p>
          </div>
        </section>

        {/* 注意事項 */}
        <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">ご注意事項</h2>
          </div>

          <ul className="space-y-4 text-neutral-600">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                <strong className="text-neutral-900">お届け日時のご指定</strong><br />
                ご注文時に配送希望日・時間帯をご指定いただけます。
                ただし、在庫状況等によりご希望に添えない場合がございます。
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                <strong className="text-neutral-900">ご不在時の対応</strong><br />
                配送時にご不在の場合、不在連絡票が投函されます。
                再配達のご依頼は配送業者へ直接お願いいたします。
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                <strong className="text-neutral-900">長期不在による返送</strong><br />
                長期ご不在等で商品をお届けできず返送となった場合、
                再発送には別途送料が発生いたします。
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                <strong className="text-neutral-900">配送先の変更</strong><br />
                発送後の配送先変更はお受けできません。
                ご注文時に配送先情報を十分ご確認ください。
              </span>
            </li>
          </ul>
        </section>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
            <Link href="/shop/legal" className="hover:text-orange-600 transition-colors">
              特定商取引法に基づく表記
            </Link>
            <Link href="/shop/privacy" className="hover:text-orange-600 transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/shop" className="hover:text-orange-600 transition-colors">
              ショップトップ
            </Link>
          </div>
          <p className="mt-6 text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} 株式会社EAT結. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  )
}
