import { NextRequest, NextResponse } from "next/server"
import { generateProductStory } from "@/lib/gemini"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, price, weight, ingredients, keywords } = body

    if (!name || !keywords) {
      return NextResponse.json(
        { error: "商品名とキーワードは必須です" },
        { status: 400 }
      )
    }

    const result = await generateProductStory({
      name,
      price: price || 0,
      weight: weight || "",
      ingredients: ingredients || "",
      keywords,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Generate story error:", error)
    return NextResponse.json(
      { error: "ストーリー生成に失敗しました" },
      { status: 500 }
    )
  }
}
