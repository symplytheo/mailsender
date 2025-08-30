require('dotenv').config();
const nodemailer = require('nodemailer');

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass },
});

const sendEmailMessage = async ({ to, subject, message, message_html, cc, name, from }) => {
  try {
    const result = await transport.sendMail({
      from: { name: name || 'MailSender', address: from || user },
      to,
      subject,
      text: message,
      html: message_html,
      cc
    });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = sendEmailMessage;
