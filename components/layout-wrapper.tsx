"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"
import { Footer } from "./footer"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // /shop ページでは共通のHeader/Footerを非表示にする
  const isShopPage = pathname === "/shop"

  return (
    <>
      {!isShopPage && <Header />}
      {children}
      {!isShopPage && <Footer />}
    </>
  )
}
