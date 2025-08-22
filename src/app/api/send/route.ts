import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "tsuji.eat7661@gmail.com",
      subject: `New message from ${name}`,
      text: `Email: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Resend API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
