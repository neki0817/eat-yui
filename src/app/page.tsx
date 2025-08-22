"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const text = formData.get("message");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message: text }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("メール送信に成功しました 🚀");
      } else {
        setMessage(`エラー: ${data.error}`);
      }
    } catch (err) {
      setMessage("送信中にエラーが発生しました。");
    }
  };

  return (
    <main>
      <h1>V0からCursorへ移行テスト</h1>
      <p>これはNext.jsで動いている新しいページです 🚀</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>名前:</label>
          <input type="text" name="name" required />
        </div>
        <div>
          <label>メール:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>メッセージ:</label>
          <textarea name="message" required />
        </div>
        <button type="submit">送信</button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}
