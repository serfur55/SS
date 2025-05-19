"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Check } from "lucide-react"

type InquiryFormProps = {
  productName: string
  productId: number
}

export default function InquiryForm({ productName, productId }: InquiryFormProps) {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    // Simuliere API-Anfrage
    try {
      // In einer echten Anwendung würde hier ein API-Aufruf stehen
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Erfolgreiche Anfrage
      setFormState("success")
      // Formular zurücksetzen
      setFormData({
        name: "",
        email: "",
        phone: "",
        vehicle: "",
        message: "",
      })
    } catch (error) {
      console.error("Fehler beim Senden der Anfrage:", error)
      setFormState("error")
    }
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-6">Anfrage für {productName}</h3>

      {formState === "success" ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-white" />
          </div>
          <h4 className="text-xl font-bold mb-2">Anfrage erfolgreich gesendet!</h4>
          <p className="text-gray-400 mb-6">
            Vielen Dank für Ihre Anfrage. Wir werden uns in Kürze mit Ihnen in Verbindung setzen.
          </p>
          <button
            onClick={() => setFormState("idle")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Neue Anfrage
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="productId" value={productId} />

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                E-Mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label htmlFor="vehicle" className="block text-sm font-medium text-gray-400 mb-1">
              Fahrzeug (Marke, Modell, Baujahr) *
            </label>
            <input
              type="text"
              id="vehicle"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              required
              placeholder="z.B. Mercedes C-Klasse W205, 2018"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
              Ihre Nachricht
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Beschreiben Sie Ihre Wünsche oder stellen Sie Fragen..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={formState === "submitting"}
              className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {formState === "submitting" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Wird gesendet...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Anfrage senden
                </>
              )}
            </button>
          </div>

          {formState === "error" && (
            <div className="text-red-500 text-sm text-center">
              Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
            </div>
          )}

          <p className="text-xs text-gray-500 text-center mt-4">
            * Pflichtfelder. Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
          </p>
        </form>
      )}
    </div>
  )
}
