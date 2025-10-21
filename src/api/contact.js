import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ ok: false, error: "Missing fields" });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.CONTACT_TO || "alinihatpuytu@gmail.com";

    await resend.emails.send({
      from: "Portfolio <no-reply@your-domain.com>",
      to,
      subject: `New message from ${name}`,
      reply_to: email,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Server error" });
  }
}
