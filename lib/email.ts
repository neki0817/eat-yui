"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: FormData) {
  console.log("=== EMAIL SENDING START ===")

  // API キーの確認
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is not set")
    return {
      success: false,
      error: "メール設定に問題があります。管理者にお問い合わせください。",
    }
  }

  // API キーの形式チェック
  if (!process.env.RESEND_API_KEY.startsWith("re_")) {
    console.error("❌ Invalid API key format")
    return {
      success: false,
      error: "APIキーの設定に問題があります。管理者にお問い合わせください。",
    }
  }

  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // バリデーション
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        error: "必須項目が入力されていません。",
      }
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "メールアドレスの形式が正しくありません。",
      }
    }

    console.log("✅ Validation passed, attempting to send email...")

    // Resend APIを使用してメール送信
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["tsuji.eat7661@gmail.com"],
      subject: `【EAT結】お問い合わせ: ${subject}`,
      html: `
        <div style="font-family: 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <div style="background: linear-gradient(135deg, #c8102e 0%, #d4af37 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
              🍽️ EAT結 お問い合わせ
            </h1>
            <p style="color: #f7f3e9; margin: 10px 0 0 0; font-size: 16px;">
              新しいお問い合わせが届きました
            </p>
          </div>
          
          <div style="padding: 30px;">
            <div style="background-color: #f7f3e9; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 5px solid #c8102e;">
              <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 20px;">👤 お客様情報</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #2d2d2d; width: 120px;">お名前:</td>
                  <td style="padding: 8px 0; color: #1a1a1a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #2d2d2d;">メール:</td>
                  <td style="padding: 8px 0; color: #1a1a1a;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #2d2d2d;">電話番号:</td>
                  <td style="padding: 8px 0; color: #1a1a1a;">${phone || "未入力"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #2d2d2d;">種別:</td>
                  <td style="padding: 8px 0; color: #1a1a1a;">${subject}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #ffffff; padding: 25px; border: 2px solid #d4af37; border-radius: 12px;">
              <h2 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 20px;">💬 お問い合わせ内容</h2>
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
                <p style="white-space: pre-wrap; line-height: 1.8; margin: 0; color: #2d2d2d;">${message}</p>
              </div>
            </div>
          </div>
          
          <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
            <p style="margin: 0; color: #d4af37; font-size: 18px; font-weight: bold;">
              🍽️ 食を通じて皆様に幸福を
            </p>
            <p style="margin: 5px 0 0 0; color: #f7f3e9; font-size: 14px;">
              株式会社EAT結
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("❌ Resend API error:", error)
      return {
        success: false,
        error: "メール送信に失敗しました。しばらく時間をおいて再度お試しください。",
      }
    }

    console.log("✅ Email sent successfully!")
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error)
    return {
      success: false,
      error: "システムエラーが発生しました。しばらく時間をおいて再度お試しください。",
    }
  }
}
