import nodemailer from "nodemailer";
import { InternalError } from "./ErrorHandling/customErrors.mjs";
import logCollector from "./logCollector.mjs";
import jwt from "jsonwebtoken";

class EmailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.APP_EMAILER_HOST,
      port: 25,
      secure: false,
      auth: {
        user: process.env.APP_EMAILER_USER,
        pass: process.env.APP_EMAILER_PSW,
      },
    });
  }

  formLink(email) {}

  async sendMail(to, subject) {
    try {
      const token = jwt.sign({ email: to }, process.env.EMAIL_JWT_SECRET, {
        expiresIn: "1h",
      });

      const url = `${process.env.URI}/user/confirm/${token}`;
      console.log(to, " ", subject, " ", url);

      const info = await this.transporter.sendMail({
        to: to,
        subject: subject,
        text: url,
      });
      logCollector.log("Confirmation email sent to: " + info.messageId);
    } catch (error) {
      throw new InternalError("Email could not be sent." + error.message);
    }
  }
}

export default new EmailSender();
