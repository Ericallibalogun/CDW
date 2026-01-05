import { resend } from "@/lib/resend";
import { env } from "@/env";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await resend.emails.send({
      from: env.FROM_EMAIL_ADDRESS,
      to: "allieric28@gmail.com", // Send to yourself for testing
      subject: "Test Email from Majestic Motors",
      html: "<h1>Test Email</h1><p>If you receive this, your email configuration is working!</p>",
    });

    if (error) {
      console.error("Email error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ success: false, error: "Unexpected error" }, { status: 500 });
  }
}