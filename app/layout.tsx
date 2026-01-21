import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import { LayoutWrapper } from "@/components/layout-wrapper"

const inter = Inter({ subsets: ["latin"] })
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "株式会社EAT結 | 食を通じて皆様に幸福を",
  description:
    "株式会社EAT結は、岡山・大阪・東京・宮城で12店舗を展開する飲食店経営会社です。多業態ブランディングと外国人スタッフ活用で地域に根ざしたサービスを提供しています。",
  keywords: "飲食店, レストラン, 多業態, 外国人スタッフ, 岡山, 大阪, 東京, 宮城",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} ${notoSansJP.className}`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
