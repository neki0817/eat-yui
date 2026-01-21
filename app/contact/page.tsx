"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sendContactEmail } from "@/lib/email"
import { CheckCircle, AlertCircle, Mail, Phone, User, MessageSquare } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value)
      })

      const result = await sendContactEmail(formDataObj)

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "お問い合わせを正常に受け付けました。ありがとうございます。",
        })
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        })
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "メール送信に失敗しました。",
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "予期しないエラーが発生しました。",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="pt-24 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">お問い合わせ</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ご質問、ご相談、採用に関するお問い合わせなど、お気軽にご連絡ください。
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-xl flex items-center">
                <Mail className="w-6 h-6 mr-2 text-accent-red" />
                お問い合わせフォーム
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-accent-gold" />
                      お名前 *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="mt-1"
                      disabled={isSubmitting}
                      placeholder="山田太郎"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-accent-gold" />
                      メールアドレス *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="mt-1"
                      disabled={isSubmitting}
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-accent-gold" />
                      電話番号
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="mt-1"
                      disabled={isSubmitting}
                      placeholder="090-1234-5678"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2 text-accent-gold" />
                      お問い合わせ種別 *
                    </Label>
                    <Select
                      onValueChange={(value) => handleChange("subject", value)}
                      disabled={isSubmitting}
                      value={formData.subject}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recruitment">📝 採用に関するお問い合わせ</SelectItem>
                        <SelectItem value="business">🏢 事業に関するお問い合わせ</SelectItem>
                        <SelectItem value="general">💬 一般的なお問い合わせ</SelectItem>
                        <SelectItem value="other">❓ その他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-accent-gold" />
                    お問い合わせ内容 *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="mt-1"
                    placeholder="お問い合わせ内容を詳しくご記入ください"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <p className="flex items-center mb-2">
                    <span className="text-accent-red mr-1">*</span>
                    は必須項目です
                  </p>
                  <p className="text-xs">
                    個人情報の取り扱いについては、当社のプライバシーポリシーに従って適切に管理いたします。
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent-red hover:bg-accent-red/90 text-white font-bold text-lg py-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      送信中...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      送信する
                    </div>
                  )}
                </Button>

                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    <div className="flex items-center">
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="w-5 h-5 mr-2" />
                      ) : (
                        <AlertCircle className="w-5 h-5 mr-2" />
                      )}
                      <p>{submitStatus.message}</p>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
