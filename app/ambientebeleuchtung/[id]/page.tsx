"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  Star,
  Truck,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  ShoppingCart,
  Check,
} from "lucide-react"
import { useCart } from "@/components/cart-context"
import { getProductById } from "@/services/product-service-client"
import type { Product } from "@/services/product-service"

type SelectedOptions = Record<string, { name: string; price: number }>

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const [totalPrice, setTotalPrice] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    async function loadProduct() {
      try {
        const foundProduct = await getProductById(productId)
        if (foundProduct) {
          setProduct(foundProduct)

          // Initialize selected options with default values (first option of each type)
          const initialOptions: SelectedOptions = {}
          if (foundProduct.options) {
            Object.entries(foundProduct.options).forEach(([optionType, optionValues]) => {
              if (optionValues.length > 0) {
                initialOptions[optionType] = optionValues[0]
              }
            })
          }
          setSelectedOptions(initialOptions)

          // Calculate initial total price
          let initialPrice = foundProduct.price
          Object.values(initialOptions).forEach((option) => {
            initialPrice += option.price
          })
          setTotalPrice(initialPrice)
        }
      } catch (error) {
        console.error("Fehler beim Laden des Produkts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  useEffect(() => {
    if (product) {
      let newTotalPrice = product.price
      Object.values(selectedOptions).forEach((option) => {
        newTotalPrice += option.price
      })
      setTotalPrice(newTotalPrice)
    }
  }, [selectedOptions, product])

  const handleOptionChange = (optionType: string, option: { name: string; price: number }) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionType]: option,
    }))
  }

  const handlePrevImage = () => {
    if (product?.gallery && product.gallery.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.gallery!.length - 1 : prevIndex - 1))
    }
  }

  const handleNextImage = () => {
    if (product?.gallery && product.gallery.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex === product.gallery!.length - 1 ? 0 : prevIndex + 1))
    }
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: totalPrice,
        image: product.image,
        quantity: quantity,
        options: selectedOptions,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Produkt nicht gefunden</h1>
        <p className="text-gray-400 mb-8">Das gesuchte Produkt existiert nicht oder wurde entfernt.</p>
        <Link
          href="/ambientebeleuchtung"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ChevronLeft size={18} />
          Zurück zur Übersicht
        </Link>
      </div>
    )
  }

  // Prüfen, ob das Produkt eine Einbau-Dienstleistung ist
  const requiresInstallation =
    product.requiresInstallation ||
    product.categories === "Ambientebeleuchtung" ||
    product.categories === "Sternenhimmel"

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <Link href="/ambientebeleuchtung" className="text-gray-400 hover:text-white transition-colors">
              Ambientebeleuchtung
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-white truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gray-900">
              <Image
                src={
                  product.gallery && product.gallery[currentImageIndex]
                    ? product.gallery[currentImageIndex]
                    : product.image
                }
                alt={product.name}
                fill
                className="object-cover"
              />

              {product.gallery && product.gallery.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <ArrowRight size={20} />
                  </button>
                </>
              )}

              {product.sale && (
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  SALE
                </div>
              )}

              {requiresInstallation && (
                <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MIT EINBAU
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
                {product.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden snap-start ${
                      currentImageIndex === index
                        ? "ring-2 ring-blue-600"
                        : "ring-1 ring-gray-800 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Bild ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs font-medium">
                  {product.tags}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                    />
                  ))}
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-400 mb-6">{product.description}</p>

              <div className="flex items-end gap-4 mb-8">
                <span className="text-3xl font-bold">{totalPrice.toFixed(2)} €</span>
                {product.price !== totalPrice && (
                  <span className="text-lg text-gray-400 line-through">{product.price.toFixed(2)} €</span>
                )}
                {product.sale && <span className="text-sm text-green-500 font-medium">Sonderangebot</span>}
                {requiresInstallation && (
                  <span className="text-sm text-purple-400 font-medium">Preis inkl. Einbau</span>
                )}
              </div>
            </div>

            {/* Product Options */}
            {product.options && Object.entries(product.options).length > 0 && (
              <div className="space-y-6 mb-8">
                {Object.entries(product.options).map(([optionType, optionValues]) => (
                  <div key={optionType}>
                    <h3 className="text-lg font-medium mb-3">{optionType}</h3>
                    <div className="space-y-2">
                      {optionValues.map((option) => (
                        <label
                          key={option.name}
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedOptions[optionType]?.name === option.name
                              ? "bg-blue-900/30 border border-blue-600/50"
                              : "bg-gray-900 border border-gray-800 hover:border-gray-700"
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name={optionType}
                              checked={selectedOptions[optionType]?.name === option.name}
                              onChange={() => handleOptionChange(optionType, option)}
                              className="sr-only"
                            />
                            <div
                              className={`w-4 h-4 rounded-full mr-3 flex-shrink-0 ${
                                selectedOptions[optionType]?.name === option.name
                                  ? "bg-blue-600 ring-2 ring-blue-600/50"
                                  : "bg-gray-800"
                              }`}
                            ></div>
                            <span>{option.name}</span>
                          </div>
                          {option.price > 0 && <span className="text-blue-400">+{option.price.toFixed(2)} €</span>}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Product Info Sections */}
            {product.info && (
              <div className="mb-8 space-y-6">
                {Object.entries(product.info).map(([sectionTitle, items]) => (
                  <div key={sectionTitle} className="bg-gray-900 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3 text-blue-400">{sectionTitle}</h3>
                    <ul className="space-y-2">
                      {items?.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Add to Cart OR Request Installation */}
            {requiresInstallation ? (
              <div className="mb-8">
                <a
                  href={`https://api.whatsapp.com/send/?phone=4915221882862&text=Anfrage zu ${encodeURIComponent(product.name)}&type=phone_number&app_absent=0`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-medium hover:from-green-500 hover:to-green-400 transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="currentColor"
                    strokeWidth="0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Per WhatsApp anfragen
                </a>

                <div className="mt-4 bg-gray-900 rounded-lg p-4 text-sm text-gray-300">
                  <p>
                    <strong>Hinweis:</strong> Dieses Produkt erfordert einen professionellen Einbau. Kontaktieren Sie
                    uns direkt über WhatsApp für eine schnelle Beratung und Terminvereinbarung.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center h-12">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-12 h-full flex items-center justify-center bg-gray-900 border border-gray-800 rounded-l-lg hover:bg-gray-800 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} className={quantity <= 1 ? "text-gray-600" : "text-white"} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                    className="h-full w-16 bg-gray-900 border-y border-gray-800 text-center focus:outline-none"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-12 h-full flex items-center justify-center bg-gray-900 border border-gray-800 rounded-r-lg hover:bg-gray-800 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-400 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  In den Warenkorb
                </button>
              </div>
            )}

            {/* Shipping and Warranty */}
            <div className="space-y-4 border-t border-gray-800 pt-6">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">Kostenloser Versand</h4>
                  <p className="text-sm text-gray-400">Für alle Bestellungen innerhalb Deutschlands</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium">2 Jahre Garantie</h4>
                  <p className="text-sm text-gray-400">Auf alle unsere Produkte und Installationen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
