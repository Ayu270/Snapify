import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return Response.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev", 
      to: "krayush270@gmail.com",    
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: sans-serif;">
          <h2>Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        </div>
      `,
    });

    return Response.json({ message: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Resend email error:", error);
    return Response.json({ message: "Failed to send message." }, { status: 500 });
  }
}