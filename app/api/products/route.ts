import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { Product } from "@/services/product-service"

export async function GET() {
  try {
    const productsDir = path.join(process.cwd(), "data/products")
    const productsFromFiles: Product[] = []

    if (fs.existsSync(productsDir)) {
      const files = fs.readdirSync(productsDir)

      for (const file of files) {
        if (file.endsWith(".json")) {
          const filePath = path.join(productsDir, file)
          const fileContent = fs.readFileSync(filePath, "utf8")
          const product = JSON.parse(fileContent) as Product
          productsFromFiles.push(product)
        }
      }
    }

    return NextResponse.json(productsFromFiles)
  } catch (error) {
    console.error("Fehler beim Laden der Produktdateien:", error)
    return NextResponse.json([], { status: 500 })
  }
}
