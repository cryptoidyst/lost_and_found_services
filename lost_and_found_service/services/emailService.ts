import nodemailer from 'nodemailer';

export class EmailService {
    private transporter: nodemailer.Transporter;
  
    constructor() {
      this.transporter = nodemailer.createTransport({
        // Configure your email service provider settings
        service: 'Gmail',
        auth: {
          user: 'richfreelanceteam@gmail.com',
          pass: 'nupgopavhbtduqff',
        },
      });
    }
  
    async sendEmail(subject:any = "", text:any = "", html: any = "", to: any = "aniyahbip@gmail.com"): Promise<void> {
      const mailOptions: nodemailer.SendMailOptions = {
        from: 'lost-and-found-app@test.com',
        to: to,
        subject: subject,
        text: text,
        html: html,
      };
  
      try {
        await this.transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        throw error;
      }
    }
  }