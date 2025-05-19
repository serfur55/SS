import type React from "react"
import ShopifyLayout from "@/components/shopify-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Codierungen | S&S Tuning",
  description:
    "Professionelle Codierungen und Freischaltungen für Mercedes, BMW und VAG-Fahrzeuge. Komfortfeatures, Multimedia-Updates und individuelle Anpassungen.",
}

export default function CodierungenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ShopifyLayout>{children}</ShopifyLayout>
}
