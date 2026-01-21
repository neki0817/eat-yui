"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Logo } from "./logo"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // トップページのみ透明ヘッダー
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // メニューが開いている時はスクロールを無効化
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const navigation = [
    { name: "ホーム", href: "/" },
    { name: "企業情報", href: "/company" },
    { name: "事業紹介", href: "/business" },
    { name: "店舗一覧", href: "/stores" },
    { name: "採用情報", href: "/careers" },
    { name: "お問い合わせ", href: "/contact-form" },
  ]

  return (
    <>
      {/* 背景オーバーレイ */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9997,
          }}
          className="md:hidden"
        />
      )}

      {/* モバイルメニュー（左からスライド） */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '80%',
          maxWidth: '320px',
          height: '100vh',
          backgroundColor: '#ffffff',
          zIndex: 9998,
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          overflowY: 'auto',
        }}
      >
        <div style={{ padding: '24px', paddingTop: '32px' }}>
          <div style={{ marginBottom: '32px' }}>
            <Logo />
          </div>
          <nav>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '16px 0',
                  borderBottom: '1px solid #e5e5e5',
                  color: '#333',
                  fontSize: '16px',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/shop"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '24px',
                padding: '16px',
                backgroundColor: '#ea580c',
                color: '#ffffff',
                borderRadius: '12px',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              <ShoppingCart size={20} />
              <span>オンラインショップ</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* ヘッダー */}
      <header
        className={`fixed w-full transition-all duration-300 ${
          scrolled || isMenuOpen || !isHomePage
            ? "bg-white shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
        style={{ zIndex: 9999 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>

          {/* デスクトップメニュー */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium hover:text-orange-600 transition-colors ${
                  scrolled || !isHomePage ? "text-neutral-600" : "text-white/90"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/shop"
              className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-md"
            >
              <ShoppingCart size={18} />
              <span>オンラインショップ</span>
            </Link>
          </nav>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden"
            style={{ position: 'relative', zIndex: 10000 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={28} className="text-neutral-900" />
            ) : (
              <Menu
                size={28}
                className={scrolled || !isHomePage ? "text-neutral-900" : "text-white"}
              />
            )}
          </button>
        </div>
      </header>
    </>
  )
}
