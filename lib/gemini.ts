import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function generateProductStory(product: {
  name: string
  price: number
  weight: string
  ingredients: string
  keywords: string
}): Promise<{ catchphrase: string; headline: string; description: string }> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `あなたは台湾スイーツ専門店「小陽春」のコピーライターです。
以下の商品情報から、魅力的なキャッチフレーズ、見出し、説明文を生成してください。

商品名: ${product.name}
価格: ${product.price}円
内容量: ${product.weight}
原材料: ${product.ingredients}
特徴キーワード: ${product.keywords}

以下のJSON形式で回答してください:
{
  "catchphrase": "商品の魅力を一言で表すキャッチフレーズ（改行を含む短いフレーズ、擬音語推奨。例：「しゅわっ、ふわっ」一口で魔法にかかる、米粉の奇跡。）",
  "headline": "ストーリー性のある詩的な見出し（改行を含む2行程度。例：雲を食べる、贅沢な瞬間。/ 紅白が結ぶ、「円満」の願い。/ 黒胡麻の、深い深い癒やし。）",
  "description": "商品の魅力を伝える説明文（3段落、各段落80-120文字程度。段落間は空行で区切る）"
}

注意:
- headlineは商品名ではなく、詩的で情緒的な見出しにしてください
- descriptionは3つの段落に分け、それぞれストーリーテリング形式で書いてください
- 「ふわ・しゅわ」「もちっ、ぷるん」のような感覚的な表現を心がけてください
- 国産素材やグルテンフリーなどの健康面もアピールしてください
- 温かみのある、親しみやすい文体で書いてください
- JSON形式のみで回答してください`

  try {
    const result = await model.generateContent(prompt)
    const response = result.response.text()

    // JSONを抽出してパース
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    throw new Error('Failed to parse AI response')
  } catch (error) {
    console.error('Gemini API error:', error)
    return {
      catchphrase: 'おいしさ、届けます',
      headline: product.name,
      description: product.keywords || '心を込めてお作りしています。'
    }
  }
}
