import nodemailer from 'nodemailer';
import { setting } from '../config/setting';

interface EmailConfig {
  service: string;
  auth: {
    user: string;
    pass: string;
  };
}

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

class Mailer {
  private transporter: nodemailer.Transporter;

  constructor(private emailConfig: EmailConfig) {
    this.transporter = nodemailer.createTransport(emailConfig);
  }

  public async sendMail(
    mailOptions: MailOptions
  ): Promise<nodemailer.SentMessageInfo> {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }
}

// Create a new Mailer instance
export const mailer = new Mailer(setting.emailConfig);
