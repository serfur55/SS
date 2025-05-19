"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, ChevronRight, Smartphone, Wifi, RotateCw, Settings, Shield, AlertTriangle } from "lucide-react"

export default function CarPlayPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black z-0">
          {/* Background with subtle tech pattern */}
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>

          {/* Animated gradient lines */}
          <div className="absolute inset-0">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="absolute h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"
                style={{
                  top: `${20 + index * 15}%`,
                  left: 0,
                  right: 0,
                  animationDuration: `${8 + index * 2}s`,
                  animationDelay: `${index * 0.5}s`,
                  animation: "glow-line-animation 8s infinite",
                }}
              ></div>
            ))}
          </div>

          {/* Tech particles */}
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className="absolute rounded-full bg-blue-500 opacity-70 animate-float"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(59, 130, 246, 0.8)`,
                animationDuration: `${Math.random() * 10 + 15}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black z-10"></div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium">
              MULTIMEDIA UPGRADE
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            CarPlay & Android Auto{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Nachrüstung
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Mit unserem CarPlay / Android Auto Steuergerät kannst du dein Fahrzeug nachrüsten, ohne das originale
            Display oder System zu verändern! 🚗📲
          </p>

          <div className="mt-8 mb-16">
            <p className="text-blue-400 font-medium mb-2">Preise ab</p>
            <p className="text-4xl md:text-5xl font-bold mb-8">349 € inkl. Einbau!</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-medium text-lg hover:from-blue-600 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Jetzt anfragen <ChevronRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="#details"
                className="px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-400 rounded-full font-medium text-lg hover:bg-blue-900/20 transition-all flex items-center justify-center"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("details")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Mehr erfahren
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 relative" id="details">
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
              INSTALLATION
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              So funktioniert der{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Einbau</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image src="/images/carplay-mercedes.png" alt="CarPlay im Mercedes" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl font-bold">
                Nahtlose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  Integration
                </span>
              </h3>

              <ul className="space-y-4">
                {[
                  "Zusätzliches Steuergerät wird verbaut – das originale System bleibt vollständig erhalten",
                  "Per Knopfdruck zwischen Original-System & CarPlay wechseln",
                  "Kein Austausch des Displays oder komplizierte Umbauten nötig",
                  "Wireless CarPlay & Android Auto für maximale Flexibilität",
                  "OEM-Integration – perfekte Optik & Bedienung über das bestehende System",
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-500 flex items-center justify-center mr-3 mt-0.5">
                      <Check className="h-3 w-3 text-blue-400" />
                    </span>
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative bg-gray-950">
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
              KOMPATIBILITÄT
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Welche Funktionen{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                bleiben erhalten?
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center mr-4 text-blue-400">
                    <Settings className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Originales System</h3>
                    <p className="text-gray-400">Originales Radio & Navigationssystem bleiben voll nutzbar</p>
                  </div>
                </div>
                <div className="pl-16">
                  <Check className="h-5 w-5 text-green-500 inline-block mr-2" />
                  <span className="text-gray-300">100% Funktionserhalt</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center mr-4 text-blue-400">
                    <RotateCw className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Bedienelemente</h3>
                    <p className="text-gray-400">Lenkradtasten & Touchscreen funktionieren weiterhin</p>
                  </div>
                </div>
                <div className="pl-16">
                  <Check className="h-5 w-5 text-green-500 inline-block mr-2" />
                  <span className="text-gray-300">Intuitive Bedienung</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center mr-4 text-blue-400">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Soundsystem</h3>
                    <p className="text-gray-400">
                      Kompatibel mit originalem Soundsystem (z. B. Burmester, Harman Kardon, Bang & Olufsen)
                    </p>
                  </div>
                </div>
                <div className="pl-16">
                  <Check className="h-5 w-5 text-green-500 inline-block mr-2" />
                  <span className="text-gray-300">Perfekte Klangqualität</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center mr-4 text-blue-400">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Fahrzeugsysteme</h3>
                    <p className="text-gray-400">Rückfahrkamera & Parksensoren werden nicht beeinträchtigt</p>
                  </div>
                </div>
                <div className="pl-16">
                  <Check className="h-5 w-5 text-green-500 inline-block mr-2" />
                  <span className="text-gray-300">Volle Funktionalität</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 bg-yellow-900/20 border border-yellow-600/30 rounded-xl p-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-yellow-500 mb-2">Wichtiger Hinweis</h3>
                <p className="text-gray-300">
                  Um die Kompatibilität zu prüfen, bitte ein Foto vom Radio & den „Version Infos" machen und uns senden!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-4">
              VORTEILE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold">
              Warum{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                CarPlay & Android Auto?
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center mb-4 text-blue-400">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Vertraute Apps</h3>
                <p className="text-gray-400">
                  Nutzen Sie Ihre bevorzugten Apps wie Spotify, Google Maps, Waze, WhatsApp und viele mehr direkt über
                  Ihr Fahrzeugdisplay.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center mb-4 text-blue-400">
                  <Wifi className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Kabellose Verbindung</h3>
                <p className="text-gray-400">
                  Dank Wireless-Technologie verbindet sich Ihr Smartphone automatisch, sobald Sie ins Fahrzeug
                  einsteigen.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center mb-4 text-blue-400">
                  <RotateCw className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Flexibler Wechsel</h3>
                <p className="text-gray-400">
                  Wechseln Sie jederzeit zwischen dem originalen Infotainment-System und CarPlay/Android Auto mit nur
                  einem Knopfdruck.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 relative overflow-hidden" id="contact">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>
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
                <Smartphone className="w-10 h-10 text-blue-400" />
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
            Bereit für Ihr{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Multimedia-Upgrade?
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Kontaktieren Sie uns jetzt für eine persönliche Beratung und ein individuelles Angebot. Wir prüfen die
            Kompatibilität mit Ihrem Fahrzeug und beraten Sie zu allen verfügbaren Optionen.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full font-medium text-lg hover:from-blue-600 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 71, 204, 0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              Termin vereinbaren
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-400 rounded-full font-medium text-lg hover:bg-blue-900/20 transition-all flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 71, 204, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              +49 152 2188 2862
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
