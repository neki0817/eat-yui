import { NextRequest, NextResponse } from "next/server"
import { generateHeroContent } from "@/lib/gemini"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { shopName, concept, targetCustomer, keywords } = body

    if (!shopName || !keywords) {
      return NextResponse.json(
        { error: "ショップ名とキーワードは必須です" },
        { status: 400 }
      )
    }

    const result = await generateHeroContent({
      shopName,
      concept: concept || "",
      targetCustomer: targetCustomer || "",
      keywords,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Generate hero error:", error)
    return NextResponse.json(
      { error: "ヒーローコンテンツの生成に失敗しました" },
      { status: 500 }
    )
  }
}
