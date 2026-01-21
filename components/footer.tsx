import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Logo } from "./logo"

export function Footer() {
  const navLinks = [
    { name: "ホーム", href: "/" },
    { name: "企業情報", href: "/company" },
    { name: "事業紹介", href: "/business" },
    { name: "店舗一覧", href: "/stores" },
    { name: "採用情報", href: "/careers" },
    { name: "お問い合わせ", href: "/contact-form" },
  ]

  return (
    <footer className="bg-white border-t border-neutral-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="mb-6">
            <Logo />
          </div>
          <p className="text-neutral-500 text-sm leading-relaxed">
            食を通じて、人、地域、世界を結ぶ。
            <br />
            一皿に幸福を込めてお届けします。
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-6">SITEMAP</h4>
          <ul className="space-y-4 text-sm text-neutral-600">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-orange-600 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/shop"
                className="text-orange-600 font-bold flex items-center"
              >
                <ShoppingCart size={14} className="mr-1" /> オンラインショップ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">LOCATIONS</h4>
          <ul className="space-y-4 text-sm text-neutral-600">
            <li>岡山県 (5店舗)</li>
            <li>東京都 (3店舗)</li>
            <li>大阪府 (2店舗)</li>
            <li>宮城県 (2店舗)</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">CONTACT</h4>
          <div className="text-sm text-neutral-600 space-y-4">
            <p>
              〒710-0834
              <br />
              岡山県倉敷市日吉町338番地1
              <br />
              セジュール森山201号
            </p>
            <Link
              href="/contact-form"
              className="inline-block bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all font-bold"
            >
              お問い合わせはこちら
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-neutral-50 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400">
        <p>&copy; {new Date().getFullYear()} 株式会社EAT結. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-orange-600 transition-colors">
            プライバシーポリシー
          </Link>
          <Link href="#" className="hover:text-orange-600 transition-colors">
            特定商取引法に基づく表記
          </Link>
        </div>
      </div>
    </footer>
  )
}
