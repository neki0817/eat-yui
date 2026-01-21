"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"
import { Footer } from "./footer"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // /shop ページと /admin ページでは共通のHeader/Footerを非表示にする
  const isShopPage = pathname === "/shop"
  const isAdminPage = pathname?.startsWith("/admin")

  const hideLayout = isShopPage || isAdminPage

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  )
}
