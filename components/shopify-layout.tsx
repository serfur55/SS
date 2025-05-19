"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingCart, Search, User, Heart, ChevronDown, Instagram } from "lucide-react"

interface ShopifyLayoutProps {
  children: React.ReactNode
  cartCount?: number
}

export default function ShopifyLayout({ children, cartCount = 0 }: ShopifyLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState<any[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Get cart from localStorage
    const storedCart = localStorage.getItem("shopify-cart")
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (e) {
        console.error("Error parsing cart data", e)
      }
    }
  }, [cartCount])

  const removeFromCart = (index: number) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
    localStorage.setItem("shopify-cart", JSON.stringify(newCart))
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  if (!mounted) return null

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Announcement Bar */}
      <div className="bg-blue-600 text-white text-center text-sm py-2">
        Kostenloser Versand für alle Bestellungen über 100€ | 2 Jahre Garantie auf alle Installationen
      </div>

      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMenuOpen(true)}>
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="relative h-12 w-32 md:h-16 md:w-40">
              <Image src="/images/logo.png" alt="S&S Logo" fill className="object-contain" priority />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-blue-400 transition-colors">
                Home
              </Link>
              <div className="relative group">
                <button className="flex items-center text-white group-hover:text-blue-400 transition-colors">
                  Produkte <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <Link href="/ambientebeleuchtung" className="block px-4 py-2 hover:bg-gray-800 transition-colors">
                    Ambientebeleuchtung
                  </Link>
                  <Link href="/sternenhimmel" className="block px-4 py-2 hover:bg-gray-800 transition-colors">
                    Sternenhimmel
                  </Link>
                  <Link href="/carplay" className="block px-4 py-2 hover:bg-gray-800 transition-colors">
                    CarPlay / Android Auto
                  </Link>
                  <Link href="/codierungen" className="block px-4 py-2 hover:bg-gray-800 transition-colors">
                    Codierungen
                  </Link>
                </div>
              </div>
              <Link href="/shop" className="text-white hover:text-blue-400 transition-colors">
                Shop
              </Link>
              <Link href="/ueber-uns" className="text-sm font-medium transition-colors hover:text-primary">
                Über Uns
              </Link>
              <Link href="/kontakt" className="text-sm font-medium transition-colors hover:text-primary">
                Kontakt
              </Link>
            </nav>

            {/* Header Icons */}
            <div className="flex items-center space-x-4">
              <button onClick={() => setSearchOpen(true)} className="text-white hover:text-blue-400 transition-colors">
                <Search size={20} />
              </button>
              <Link href="#" className="text-white hover:text-blue-400 transition-colors hidden md:block">
                <User size={20} />
              </Link>
              <Link href="#" className="text-white hover:text-blue-400 transition-colors hidden md:block">
                <Heart size={20} />
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="text-white hover:text-blue-400 transition-colors relative"
              >
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-8">
              <div className="relative h-12 w-32">
                <Image src="/images/logo.png" alt="S&S Logo" fill className="object-contain" />
              </div>
              <button onClick={() => setMenuOpen(false)}>
                <X size={24} className="text-white" />
              </button>
            </div>

            <nav className="space-y-6">
              <Link
                href="/"
                className="block text-xl font-medium border-b border-gray-800 pb-4"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <div>
                <h3 className="text-xl font-medium mb-4">Produkte</h3>
                <div className="space-y-4 pl-4">
                  <Link
                    href="/ambientebeleuchtung"
                    className="block text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Ambientebeleuchtung
                  </Link>
                  <Link
                    href="/sternenhimmel"
                    className="block text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sternenhimmel
                  </Link>
                  <Link
                    href="/carplay"
                    className="block text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    CarPlay / Android Auto
                  </Link>
                  <Link
                    href="/codierungen"
                    className="block text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    Codierungen
                  </Link>
                </div>
              </div>
              <Link
                href="/shop"
                className="block text-xl font-medium border-b border-gray-800 pb-4"
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/ueber-uns"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <span>Über Uns</span>
              </Link>
              <Link
                href="/kontakt"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                <span>Kontakt</span>
              </Link>
            </nav>

            <div className="mt-8 space-y-4">
              <Link
                href="#"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <User size={20} className="mr-2" /> Mein Konto
              </Link>
              <Link
                href="#"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <Heart size={20} className="mr-2" /> Wunschliste
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-start pt-20">
          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="flex items-center mb-8">
              <div className="relative flex-1">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Suchen..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  autoFocus
                />
              </div>
              <button onClick={() => setSearchOpen(false)} className="ml-4">
                <X size={24} className="text-white" />
              </button>
            </div>

            <div className="text-gray-400 text-center">
              <p>Geben Sie einen Suchbegriff ein, um Produkte zu finden.</p>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="bg-black/50 absolute inset-0" onClick={() => setCartOpen(false)}></div>
          <div className="relative w-full max-w-md bg-gray-950 h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold">Warenkorb</h2>
              <button onClick={() => setCartOpen(false)}>
                <X size={24} className="text-white" />
              </button>
            </div>

            <div className="p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto mb-4 text-gray-600" />
                  <h3 className="text-lg font-medium mb-2">Ihr Warenkorb ist leer</h3>
                  <p className="text-gray-400 mb-6">Fügen Sie Produkte hinzu, um mit dem Einkauf zu beginnen.</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Weiter einkaufen
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {cart.map((item, index) => (
                      <div key={index} className="flex gap-4 border-b border-gray-800 pb-4">
                        <div className="relative w-20 h-20 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-sm text-gray-400 mb-2">Menge: {item.quantity}</div>
                          <div className="flex justify-between">
                            <span>{(item.price * item.quantity).toFixed(2)} €</span>
                            <button
                              onClick={() => removeFromCart(index)}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              Entfernen
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-800 pt-4 mb-8">
                    <div className="flex justify-between mb-2">
                      <span>Zwischensumme</span>
                      <span>{calculateTotal().toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span>Versand</span>
                      <span>Kostenlos</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Gesamt</span>
                      <span>{calculateTotal().toFixed(2)} €</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Zur Kasse
                    </button>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      Weiter einkaufen
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="relative h-16 w-40 mb-4">
                <Image src="/images/logo.png" alt="S&S Logo" fill className="object-contain" />
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Ihr Spezialist für exklusives Fahrzeug Interieur und Exterieur Design mit Fokus auf Ambientebeleuchtung
                und Sternenhimmel.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/s.s.tuning/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 hover:bg-blue-800/50 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.tiktok.com/@ss.tuning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 hover:bg-blue-800/50 transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                  </svg>
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=4915221882862&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 hover:bg-blue-800/50 transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">Kontakt</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <a href="mailto:info@sunds-tuning.com">info@sunds-tuning.com</a>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <a href="tel:+4915221882862">+49 152 2188 2862</a>
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-3 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Stadtstraße 3, 72172 Sulz
                </li>
                <li className="flex items-center mt-4">
                  <a
                    href="https://api.whatsapp.com/send/?phone=4915221882862&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                    </svg>
                    WhatsApp Kontakt
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/ambientebeleuchtung" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="mr-2">→</span> Ambientebeleuchtung
                  </Link>
                </li>
                <li>
                  <Link href="/sternenhimmel" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="mr-2">→</span> Sternenhimmel
                  </Link>
                </li>
                <li>
                  <a href="/carplay" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="mr-2">→</span> CarPlay / Android Auto
                  </a>
                </li>
                <li>
                  <Link href="/codierungen" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="mr-2">→</span> Codierungen
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-400">Kundenservice</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="mr-2">→</span> Mein Konto
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="mr-2">→</span> Bestellungen
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="mr-2">→</span> Versand & Lieferung
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="mr-2">→</span> Rückgabe & Erstattung
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors flex items-center">
                    <span className="mr-2">→</span> FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} S&S Tuning. Stadtstraße 3, 72172 Sulz am Neckar. Alle Rechte vorbehalten.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                  Impressum
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                  Datenschutz
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                  AGB
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
