import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactFormData, ContactFormResponse } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          message: "Missing required fields",
          error: "Name, email, and message are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          message: "Invalid email format",
          error: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    // Validate message length
    if (body.message.length < 20) {
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          message: "Message too short",
          error: "Message must be at least 20 characters long",
        },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || "contact@jdevelop.io";

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "JDevelop Contact Form <onboarding@resend.dev>",
      to: [contactEmail],
      replyTo: body.email,
      subject: `New Contact Form Submission from ${body.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        ${body.company ? `<p><strong>Company:</strong> ${body.company}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json<ContactFormResponse>(
        {
          success: false,
          message: "Failed to send email",
          error: error.message || "An error occurred while sending the email",
        },
        { status: 500 }
      );
    }

    return NextResponse.json<ContactFormResponse>(
      {
        success: true,
        message: "Message sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json<ContactFormResponse>(
      {
        success: false,
        message: "Internal server error",
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
