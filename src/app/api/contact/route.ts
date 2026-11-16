import { contactEmail, emailDraft } from "@/content/contact";
import { contactSchema } from "@/lib/portfolio";
import { rateLimit, readBody, sameOrigin } from "@/lib/server";
export async function POST(request: Request) {
  const reply = (message: string, status: number) =>
    Response.json({ message }, { status });
  if (!sameOrigin(request)) return reply("Request not allowed.", 403);
  if (!rateLimit(request))
    return reply("Please wait a minute and try again.", 429);
  let input;
  try {
    input = contactSchema.parse(await readBody(request));
  } catch {
    return reply(
      "Please include your name, a valid email and a message of 20–3000 characters.",
      400,
    );
  }
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.CONTACT_TO ||
    !process.env.CONTACT_FROM
  )
    return Response.json(
      {
        message: `Email delivery is not configured. No message was sent. Open the prepared email draft to ${contactEmail} and send it from your email app.`,
        mailto: emailDraft(input),
      },
      { status: 503 },
    );
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [process.env.CONTACT_TO],
        reply_to: input.email,
        subject: "Portfolio enquiry",
        text: `From: ${input.name}\nReply to: ${input.email}\n\n${input.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    const data = await response.json();
    if (!response.ok || typeof data.id !== "string")
      throw new Error("Unconfirmed");
    return reply(
      "Your message was accepted by the email service. Thank you for getting in touch.",
      200,
    );
  } catch {
    return reply(
      `Delivery could not be confirmed. Please try again or email ${contactEmail}.`,
      502,
    );
  }
}
