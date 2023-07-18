// domain.com/verifytoken/dsaksakjndas ---> Better for server-side component
// domain.com/verifytoken?token=12345678 ---> Better for client-side component

import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const DOMAIN = "https://authnextjs-mongo.vercel.app";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log(process.env.GMAIL_USER);

    //  Verification based on Email Type
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    //  make transporter for mails
    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
        // TODO: add these credentials to .env
      },
    });

    // specify mailOptions
    const mailOptions = {
      from: "samplesm56@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        emailType === "VERIFY"
          ? `<p>Click <a href="${DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
      to verify your email or copy and paste the link below in your browser. 
      <br> ${DOMAIN}/verifyemail?token=${hashedToken}
      </p>`
          : `<p>Click <a href="${DOMAIN}/password?token=${hashedToken}">here</a> 
      to reset your password or copy and paste the link below in your browser. 
      <br> ${DOMAIN}/password?token=${hashedToken}
      </p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
