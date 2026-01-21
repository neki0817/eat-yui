import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function generateHeroContent(shopInfo: {
  shopName: string
  concept: string
  targetCustomer: string
  keywords: string
}): Promise<{ title: string; subtitle: string; imagePrompt: string }> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `あなたはオンラインショップのブランディング専門のコピーライターです。
以下のショップ情報から、ヒーローセクション（ファーストビュー）用の魅力的なタイトル、サブタイトル、画像生成用プロンプトを作成してください。

ショップ名: ${shopInfo.shopName}
コンセプト: ${shopInfo.concept}
ターゲット顧客: ${shopInfo.targetCustomer}
キーワード: ${shopInfo.keywords}

以下のJSON形式で回答してください:
{
  "title": "メインタイトル（改行を含む印象的なキャッチコピー、20-40文字程度。感覚的な表現や擬音語を効果的に使用。例：心ほどける、ふわっ、もちっ。台湾の幸せを倉敷から。）",
  "subtitle": "サブタイトル（ショップの価値提案を伝える説明文、50-80文字程度。例：国産米粉100%が叶えた、究極の食感。体への優しさと、驚きの美味しさを、倉敷の小さなキッチンからお届けします。）",
  "imagePrompt": "画像生成AI用の英語プロンプト（ヒーロー画像として使えるイメージ。商品や雰囲気を表現。100-150単語程度）"
}

注意:
- titleは感情に訴える、記憶に残るフレーズにしてください
- subtitleはショップの独自性や強みを伝えてください
- imagePromptは高品質な商用写真をイメージした詳細なプロンプトにしてください
- 温かみのある、親しみやすいトーンを心がけてください
- JSON形式のみで回答してください`

  try {
    const result = await model.generateContent(prompt)
    const response = result.response.text()

    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    throw new Error('Failed to parse AI response')
  } catch (error) {
    console.error('Gemini API error:', error)
    return {
      title: `${shopInfo.shopName}へようこそ`,
      subtitle: shopInfo.concept || 'こだわりの商品をお届けします。',
      imagePrompt: 'A warm, inviting product showcase photograph with soft natural lighting'
    }
  }
}

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
