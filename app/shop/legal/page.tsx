"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LegalPage() {
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
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">特定商取引法に基づく表記</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          <table className="w-full">
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 bg-neutral-50 w-1/3 font-semibold text-neutral-700">
                  販売業者
                </th>
                <td className="px-6 py-4 text-neutral-600">株式会社EAT結</td>
              </tr>
              <tr>
                <th className="text-left px-6 py-4 bg-neutral-50 font-semibold text-neutral-700">
                  運営責任者
                </th>
                <td className="px-6 py-4 text-neutral-600">代表取締役 福田 勝彦</td>
              </tr>
              <tr>
                <th className="text-left px-6 py-4 bg-neutral-50 font-semibold text-neutral-700">
                  所在地
                </th>
                <td className="px-6 py-4 text-neutral-600">
                  〒710-0834<br />
                  岡山県倉敷市日吉町338番地1 セジュール森山201号
                </td>
              </tr>
              <tr>
                <th className="text-left px-6 py-4 bg-neutral-50 font-semibold text-neutral-700">
                  電話番号
                </th>
                <td className="px-6 py-4 text-neutral-600">
                  086-441-4548<br />
                  <span className="text-sm text-neutral-500">※お問い合わせはメールにてお願いいたします</span>
                </td>
              </tr>
              <tr>
                <th className="text-left px-6 py-4 bg-neutral-50 font-semibold text-neutral-700">
                  メールアドレス
                </th>
                <td className="px-6 py-4 text-neutral-600">info@eat-yui.com</td>
              </tr>
              <tr>
                <th className="text-left px-6 py-4 bg-neutral-50 font-semibold text-neutral-700">
                  販売URL
                </th>
                <td className="px-6 py-4 text-neutral-600">https://eat-yui.com/shop</td>
              </tr>
              <tr>
                <th className="text-left px-6 py-4 bg-neutral-50 font-semibold text-neutral-700">
                  販売価格
                </th>
                <td className="px-6 py-4 text-neutral-600">
                  各商品ページに記載の価格（税込）
                </td>
              </tr>
              <tr>
                <th className="text-left px-6 py-4 bg-neutral-50 font-semibold text-neutral-700">
                  商品代金以外の必要料金
                </th>
                <td className="px-6 py-4 text-neutral-600">
                  送料：全国一律880円（税込）<br />
                  ※5,000円（税込）以上のご購入で送料無料<br />
                  ※クール便の場合は+220円
                </td>
              </tr>
              <tr>
                <th className="text-left px-6 py-4 bg-neutral-50 font-semibold text-neutral-700">
                  お支払い方法
                </th>
                <td className="px-6 py-4 text-neutral-600">
                  クレジットカード（VISA、MasterCard、JCB、American Express、Diners Club）<br />
                  コンビニ決済<br />
                  銀行振込
                </td>
              </tr>
              <tr>
                <th className="text-left px-6 py-4 bg-neutral-50 font-semibold text-neutral-700">
                  お支払い期限
                </th>
                <td className="px-6 py-4 text-neutral-600">
                  クレジットカード：ご注文時に決済<br />
                  コンビニ決済：ご注文後7日以内<br />
                  銀行振込：ご注文後7日以内
                </td>
              </tr>
              <tr>
                <th className="text-left px-6 py-4 bg-neutral-50 font-semibold text-neutral-700">
                  商品の引渡し時期
                </th>
                <td className="px-6 py-4 text-neutral-600">
                  ご注文確認後、3〜5営業日以内に発送いたします。<br />
                  ※在庫状況により、お届けまでにお時間をいただく場合がございます。
                </td>
              </tr>
              <tr>
                <th className="text-left px-6 py-4 bg-neutral-50 font-semibold text-neutral-700">
                  返品・交換について
                </th>
                <td className="px-6 py-4 text-neutral-600">
                  <p className="mb-2">【お客様都合による返品】</p>
                  <p className="mb-4 text-sm">
                    食品という商品の性質上、お客様都合による返品・交換はお受けできません。
                  </p>
                  <p className="mb-2">【不良品・誤配送の場合】</p>
                  <p className="text-sm">
                    商品到着後3日以内にご連絡ください。送料当社負担にて交換または返金いたします。
                  </p>
                </td>
              </tr>
              <tr>
                <th className="text-left px-6 py-4 bg-neutral-50 font-semibold text-neutral-700">
                  キャンセルについて
                </th>
                <td className="px-6 py-4 text-neutral-600">
                  発送準備前であればキャンセル可能です。<br />
                  発送後のキャンセルはお受けできません。
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
            <Link href="/shop/privacy" className="hover:text-orange-600 transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/shop/shipping" className="hover:text-orange-600 transition-colors">
              配送・送料について
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
