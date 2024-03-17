import nodemailer from "nodemailer";
import { InternalError } from "./ErrorHandling/customErrors.mjs";
import logCollector from "./logCollector.mjs";

class EmailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.APP_EMAILER_HOST,
      port: process.env.APP_EMAILER_PORT,
      secure: process.env.APP_EMAILER_SECURITY,
      tls: {
        rejectUnauthorized: false,
      },
      auth: {
        user: process.env.APP_EMAILER_USER,
        pass: process.env.APP_EMAILER_PSW,
      },
    });
  }

  async sendMail(to, subject, text) {
    try {
      await this.transporter.sendMail({
        to: to,
        subject: subject,
        text: text,
      });
      logCollector.log(`Confirmation email sent to: ${to}`);
    } catch (error) {
      throw new InternalError("Email could not be sent." + error.message);
    }
  }
}

export default new EmailSender();
