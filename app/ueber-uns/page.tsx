"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import ShopifyLayout from "@/components/shopify-layout"
import { PhoneCall, Mail, MapPin, Sparkles, PenToolIcon as Tools, Shield, Award } from "lucide-react"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ShopifyLayout>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 via-black to-black"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <motion.span
                className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                ÜBER UNS
              </motion.span>
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Wir sind{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  S&S Tuning
                </span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Ihr Spezialist für exklusives Fahrzeug Interieur und Exterieur Design mit Fokus auf Ambientebeleuchtung
                und Sternenhimmel
              </motion.p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/488652705_665475676201461_2152207476469735596_n.jpg-9N782jH57oUuKU15oy1ELM54ntTvqF.jpeg"
                    alt="S&S Tuning Team"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60"></div>
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  Unsere{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                    Geschichte
                  </span>
                </h2>
                <p className="text-gray-300">
                  S&S Tuning wurde aus der Leidenschaft für Automobildesign und technische Innovation gegründet. Was als
                  kleine Werkstatt begann, hat sich zu einem führenden Anbieter für exklusive Fahrzeugmodifikationen
                  entwickelt.
                </p>
                <p className="text-gray-300">
                  Unser Fokus liegt auf der perfekten Integration moderner Technologie in das Fahrzeuginterieur, ohne
                  dabei den originalen Charakter des Fahrzeugs zu beeinträchtigen. Durch unsere jahrelange Erfahrung und
                  kontinuierliche Weiterbildung garantieren wir höchste Qualität und Kundenzufriedenheit.
                </p>
                <p className="text-gray-300">
                  Heute sind wir stolz darauf, Kunden aus ganz Deutschland und dem angrenzenden Ausland betreuen zu
                  dürfen. Unsere Expertise in den Bereichen Ambientebeleuchtung, Sternenhimmel und
                  Multimedia-Nachrüstung ist weit über die Grenzen von Sulz bekannt.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 md:py-24 bg-gray-950 relative">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-4">
                UNSERE WERTE
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Wofür wir{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">stehen</span>
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Unsere Philosophie basiert auf Qualität, Innovation und Kundenzufriedenheit
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Sparkles className="h-10 w-10 text-blue-400" />,
                  title: "Innovation",
                  description: "Wir setzen auf neueste Technologien und entwickeln ständig unsere Methoden weiter.",
                },
                {
                  icon: <Tools className="h-10 w-10 text-blue-400" />,
                  title: "Präzision",
                  description: "Jedes Detail zählt - wir arbeiten mit höchster Genauigkeit und Sorgfalt.",
                },
                {
                  icon: <Shield className="h-10 w-10 text-blue-400" />,
                  title: "Qualität",
                  description: "Nur die besten Materialien und Komponenten finden den Weg in Ihr Fahrzeug.",
                },
                {
                  icon: <Award className="h-10 w-10 text-blue-400" />,
                  title: "Kundenzufriedenheit",
                  description: "Ihr Lächeln bei der Fahrzeugübergabe ist unser größter Erfolg.",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-700"></div>
                  <div className="relative z-10">
                    <div className="mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 bg-gray-950 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-black to-black"></div>
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm font-medium mb-4">
                KONTAKT
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                So erreichen Sie{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">uns</span>
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Wir freuen uns auf Ihre Anfrage und beraten Sie gerne zu allen Möglichkeiten
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-900/30 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Adresse</h3>
                    <p className="text-gray-300">Stadtstraße 3, 72172 Sulz am Neckar</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-900/30 p-3 rounded-lg">
                    <PhoneCall className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Telefon</h3>
                    <p className="text-gray-300">+49 152 2188 2862</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-900/30 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">E-Mail</h3>
                    <p className="text-gray-300">info@sunds-tuning.com</p>
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href="https://api.whatsapp.com/send/?phone=4915221882862&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                    </svg>
                    Kontakt via WhatsApp
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative h-[400px] rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.1040736204!2d8.747445776654256!3d48.34086733827711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799ecc3afb2147f%3A0xc46de1b2fb2c01cb!2sStadtstra%C3%9Fe%203%2C%2072172%20Sulz%20am%20Neckar!5e0!3m2!1sen!2sde!4v1683795422145!5m2!1sen!2sde"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </ShopifyLayout>
  )
}
