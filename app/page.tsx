"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import ShopifyLayout from "@/components/shopify-layout"
import { ChevronDown } from "lucide-react"

// Kategorie-Karte Komponente
const CategoryCard = ({ title, description, image, link, tag }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl h-96 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        <div className="overflow-hidden">
          <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <span className="inline-block px-3 py-1 bg-blue-600/30 text-blue-400 rounded-full text-xs font-medium mb-3">
              {tag}
            </span>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
            <p className="text-gray-300 mb-4">{description}</p>
            <div className="flex items-center text-blue-400 font-medium">
              <span>Mehr erfahren</span>
              <div className="ml-2 transform group-hover:translate-x-2 transition-transform">→</div>
            </div>
          </motion.div>
        </div>
        <div className="w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 mt-4 group-hover:w-full transition-all duration-500"></div>
      </div>
    </motion.div>
  )
}

// Hauptkomponente
export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ShopifyLayout>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <div className="relative h-screen w-full overflow-hidden">
          {/* Hintergrund mit CSS-Partikeln */}
          <div className="absolute inset-0 bg-black z-0">
            {/* Statische Partikel - Erhöhte Anzahl auf 150 */}
            {Array.from({ length: 150 }).map((_, index) => (
              <div
                key={index}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 5 + 2}px`, // Größere Partikel
                  height: `${Math.random() * 5 + 2}px`, // Größere Partikel
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${Math.random() * 10 + 10}s`, // Variablere Animation
                  backgroundColor: `rgba(0, 100, 255, ${Math.random() * 0.5 + 0.5})`, // Helleres Blau mit höherer Deckkraft
                  boxShadow: `0 0 ${Math.random() * 15 + 10}px rgba(0, 100, 255, 0.9)`, // Stärkerer Glow-Effekt
                }}
              />
            ))}

            {/* Zusätzliche größere Partikel für mehr Sichtbarkeit */}
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={`large-${index}`}
                className="particle large-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 8 + 5}px`, // Noch größere Partikel
                  height: `${Math.random() * 8 + 5}px`, // Noch größere Partikel
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${Math.random() * 15 + 15}s`,
                  backgroundColor: `rgba(40, 120, 255, ${Math.random() * 0.3 + 0.7})`, // Helleres Blau mit höherer Deckkraft
                  boxShadow: `0 0 ${Math.random() * 25 + 15}px rgba(40, 120, 255, 0.9)`, // Stärkerer Glow-Effekt
                }}
              />
            ))}

            {/* Leuchtende Linien */}
            <div className="absolute inset-0 z-1">
              <div className="glow-line line-1"></div>
              <div className="glow-line line-2"></div>
              {/* Entfernte die zusätzlichen Linien */}
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />

          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-50 z-0">
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 text-center">
            <motion.div
              className="mb-6 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur opacity-75 animate-pulse-slow"></div>
              <div className="relative h-24 w-24 md:h-32 md:w-32">
                <Image src="/images/logo.png" alt="S&S Logo" fill className="object-contain" priority />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              EXKLUSIVES{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                FAHRZEUG DESIGN
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl lg:text-2xl max-w-3xl mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Spezialist für exklusives Fahrzeug Interieur und Exterieur Design
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/ambientebeleuchtung">
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-medium text-lg hover:from-blue-600 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/30"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 71, 204, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  JETZT ENTDECKEN
                </motion.button>
              </Link>

              <a
                href="https://api.whatsapp.com/send/?phone=4915221882862&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="px-8 py-3 bg-transparent border-2 border-blue-600 text-blue-400 rounded-full font-medium text-lg hover:bg-blue-900/20 transition-all flex items-center gap-2"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 71, 204, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                  </svg>
                  KONTAKT
                </motion.button>
              </a>
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <ChevronDown className="h-10 w-10 text-blue-600" />
            </motion.div>
          </div>
        </div>

        {/* Featured Categories */}
        <section className="py-20 px-4 md:px-8 relative">
          <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-black to-black"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-4">
                UNSERE EXPERTISE
              </span>
              <h2 className="text-3xl md:text-5xl font-bold">
                UNSERE{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  LEISTUNGEN
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              <Link href="/ambientebeleuchtung" className="lg:col-span-1 md:col-span-2">
                <CategoryCard
                  title="Ambientebeleuchtung"
                  description="Individuelles Lichtdesign für ein einzigartiges Fahrerlebnis"
                  image="/images/ambient-light.png"
                  link="/ambientebeleuchtung"
                  tag="PREMIUM"
                />
              </Link>

              <Link href="/sternenhimmel" className="lg:col-span-1 md:col-span-2">
                <CategoryCard
                  title="Sternenhimmel"
                  description="Luxuriöse Deckenbeleuchtung für einzigartiges Ambiente"
                  image="/images/starlight.png"
                  link="/sternenhimmel"
                  tag="LUXUS"
                />
              </Link>

              <Link href="/carplay">
                <CategoryCard
                  title="CarPlay / Android Auto"
                  description="Nahtlose Integration Ihres Smartphones"
                  image="/images/carplay.png"
                  link="/carplay"
                  tag="TECH"
                />
              </Link>

              <Link href="/codierungen">
                <CategoryCard
                  title="Codierungen"
                  description="Individuelle Anpassungen der Fahrzeugsoftware"
                  image="/images/coding.png"
                  link="/codierungen"
                  tag="SOFTWARE"
                />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Project */}
        <section className="py-20 px-4 md:px-8 relative">
          <div className="absolute inset-0 bg-[url('/images/tech-pattern.png')] bg-repeat opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-4">
                SHOWCASE
              </span>
              <h2 className="text-3xl md:text-5xl font-bold">
                FEATURED{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  PROJEKT
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden group"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <Image
                  src="/images/featured-project.png"
                  alt="Featured Project"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium mb-3">
                    PREMIUM PROJEKT
                  </span>
                  <h3 className="text-xl font-bold mb-2">Mercedes-Benz S-Klasse</h3>
                </div>

                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600/80 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold">
                  Mercedes-Benz S-Klasse{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                    Premium Upgrade
                  </span>
                </h3>
                <p className="text-gray-300">
                  Vollständige Transformation mit maßgeschneiderter Ambientebeleuchtung, Sternenhimmel-Installation und
                  modernster Infotainment-Integration. Dieses Projekt zeigt die Verschmelzung von Luxus und Technologie
                  auf höchstem Niveau im Fahrzeug Interieur und Exterieur Design.
                </p>
                <ul className="space-y-3">
                  {[
                    "Individuelles Ambientebeleuchtungs-System",
                    "Handgefertigter Sternenhimmel mit 1.500 Lichtpunkten",
                    "Nahtlose CarPlay & Android Auto Integration",
                    "Premium Sound-System Upgrade",
                    "Exklusive Innenraum-Veredelung",
                  ].map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="pt-4">
                  <a
                    href="https://api.whatsapp.com/send/?phone=4915221882862&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-medium hover:from-blue-600 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 71, 204, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                      </svg>
                      ANFRAGE SENDEN
                    </motion.button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black"></div>
            <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] bg-repeat opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-black/80 to-black"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 blur-lg opacity-70 animate-pulse-slow"></div>
                <div className="relative w-full h-full rounded-full bg-black/50 border-2 border-blue-500 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              BEREIT FÜR IHR{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                PREMIUM UPGRADE?
              </span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Kontaktieren Sie uns jetzt für eine persönliche Beratung und ein individuelles Angebot. Wir freuen uns
              darauf, Ihr Fahrzeug mit exklusiven Features aufzuwerten.
            </motion.p>
            <a href="tel:+4915221882862">
              <motion.button
                className="px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-400 rounded-full font-medium text-lg hover:bg-blue-900/20 transition-all flex items-center justify-center"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 71, 204, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                +49 152 2188 2862
              </motion.button>
            </a>
          </div>
          \
        </section>
      </div>
    </ShopifyLayout>
  )
}
