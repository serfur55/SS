import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { Product } from "@/services/product-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Ungültige Produkt-ID" }, { status: 400 })
    }

    const productsDir = path.join(process.cwd(), "data/products")

    if (fs.existsSync(productsDir)) {
      const files = fs.readdirSync(productsDir)

      for (const file of files) {
        if (file.endsWith(".json")) {
          const filePath = path.join(productsDir, file)
          const fileContent = fs.readFileSync(filePath, "utf8")
          const product = JSON.parse(fileContent) as Product

          if (product.id === id) {
            return NextResponse.json(product)
          }
        }
      }
    }

    return NextResponse.json({ error: "Produkt nicht gefunden" }, { status: 404 })
  } catch (error) {
    console.error("Fehler beim Laden der Produktdatei:", error)
    return NextResponse.json({ error: "Interner Serverfehler" }, { status: 500 })
  }
}
