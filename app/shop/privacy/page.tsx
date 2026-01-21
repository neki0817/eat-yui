"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-neutral-900 mb-8">プライバシーポリシー</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 space-y-8">
          <section>
            <p className="text-neutral-600 leading-relaxed">
              株式会社EAT結（以下「当社」といいます）は、お客様の個人情報の保護を重要な責務と認識し、
              以下のとおりプライバシーポリシーを定め、個人情報の保護に努めます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">1. 個人情報の定義</h2>
            <p className="text-neutral-600 leading-relaxed">
              本プライバシーポリシーにおいて「個人情報」とは、生存する個人に関する情報であって、
              当該情報に含まれる氏名、住所、電話番号、メールアドレス、その他の記述等により
              特定の個人を識別できるものをいいます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">2. 個人情報の収集</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              当社は、以下の目的で個人情報を収集することがあります：
            </p>
            <ul className="list-disc list-inside text-neutral-600 space-y-2 ml-4">
              <li>商品の注文・発送処理</li>
              <li>お問い合わせへの対応</li>
              <li>商品・サービスに関するご案内</li>
              <li>アンケートの実施</li>
              <li>当社サービスの改善</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">3. 個人情報の利用目的</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              当社は、収集した個人情報を以下の目的で利用いたします：
            </p>
            <ul className="list-disc list-inside text-neutral-600 space-y-2 ml-4">
              <li>ご注文いただいた商品の発送</li>
              <li>代金の請求・決済処理</li>
              <li>商品・サービスに関するお知らせの送信</li>
              <li>お客様からのお問い合わせへの対応</li>
              <li>当社サービスの改善・新サービスの開発</li>
              <li>その他、上記に付随する業務</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">4. 個人情報の第三者提供</h2>
            <p className="text-neutral-600 leading-relaxed mb-4">
              当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません：
            </p>
            <ul className="list-disc list-inside text-neutral-600 space-y-2 ml-4">
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要な場合</li>
              <li>商品の配送など業務委託先に必要な範囲で提供する場合</li>
              <li>決済処理のために決済代行会社に提供する場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">5. 個人情報の管理</h2>
            <p className="text-neutral-600 leading-relaxed">
              当社は、お客様の個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス、
              紛失、破損、改ざん、漏洩などを防止するため、セキュリティシステムの維持、
              管理体制の整備、社員教育の徹底等、必要な措置を講じ、安全対策を実施し
              個人情報の厳重な管理を行います。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">6. Cookieの使用について</h2>
            <p className="text-neutral-600 leading-relaxed">
              当社のウェブサイトでは、お客様の利便性向上のためCookieを使用することがあります。
              Cookieの使用により個人を特定することはできません。
              ブラウザの設定によりCookieを無効にすることも可能ですが、
              一部のサービスが正常に機能しなくなる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">7. 個人情報の開示・訂正・削除</h2>
            <p className="text-neutral-600 leading-relaxed">
              お客様ご本人から個人情報の開示、訂正、削除のご要望があった場合は、
              ご本人確認の上、合理的な範囲で速やかに対応いたします。
              ご希望の方は、下記のお問い合わせ先までご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">8. プライバシーポリシーの変更</h2>
            <p className="text-neutral-600 leading-relaxed">
              当社は、必要に応じて本プライバシーポリシーを変更することがあります。
              変更した場合は、当ウェブサイトに掲載することでお知らせいたします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900 mb-4">9. お問い合わせ先</h2>
            <div className="text-neutral-600 leading-relaxed">
              <p className="mb-2">株式会社EAT結</p>
              <p className="mb-2">〒710-0834 岡山県倉敷市日吉町338番地1 セジュール森山201号</p>
              <p className="mb-2">電話：086-441-4548</p>
              <p>メール：info@eat-yui.com</p>
            </div>
          </section>

          <section className="pt-4 border-t border-neutral-200">
            <p className="text-sm text-neutral-500">
              制定日：2024年1月1日<br />
              最終更新日：2024年1月1日
            </p>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
            <Link href="/shop/legal" className="hover:text-orange-600 transition-colors">
              特定商取引法に基づく表記
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
