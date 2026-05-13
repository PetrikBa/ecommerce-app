import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.SMTP_USER,
    clientId: process.env.SMTP_CLIENT_ID,
    clientSecret: process.env.SMTP_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

const sendMail = async ({email, subject, text}: {email: string; subject: string; text: string}) => {
  const res = await transporter.sendMail({
    from: `"E-commerce App" <${process.env.SMTP_USER}>`,
    to: email,
    subject,
    text,
  });
  console.log("Message sent: %s", res);
};

export default sendMail;