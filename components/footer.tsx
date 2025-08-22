import Link from "next/link"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="bg-primary-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-gray-300 mb-4">食を通じて皆様に幸福を</p>
            <div className="text-sm text-gray-400">
              <p>株式会社EAT結</p>
              <p className="font-semibold text-accent-gold">岡山本社</p>
              <p>〒710-0834 岡山県倉敷市日吉町338番地1</p>
              <p className="font-semibold text-accent-gold mt-2">東京オフィス</p>
              <p>〒150-0013 東京都渋谷区恵比寿1-30-1</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent-gold">サイトマップ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-accent-gold">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/company" className="text-gray-300 hover:text-accent-gold">
                  企業情報
                </Link>
              </li>
              <li>
                <Link href="/business" className="text-gray-300 hover:text-accent-gold">
                  事業紹介
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-gray-300 hover:text-accent-gold">
                  店舗一覧
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-accent-gold">
                  採用情報
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-accent-gold">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-accent-gold">事業エリア</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>岡山県（5店舗）</li>
              <li>大阪府（2店舗）</li>
              <li>東京都（3店舗）</li>
              <li>宮城県（2店舗）</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} 株式会社EAT結. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
