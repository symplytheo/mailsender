const express = require('express');
const cors = require('cors');
const sendEmailMessage = require('./nodemailer.handler');

require('dotenv').config();

const app = express();

app.use(cors({ origin: '*', credentials: true, optionsSuccessStatus: 200 }));

const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Welcome to MailSender');
});
app.post('/send', async (req, res) => {
  try {
    const mail = await sendEmailMessage({ ...req.body });
    return res
      .status(200)
      .json({ success: true, message: 'OK', message_id: mail.messageId });
  } catch (error) {
    console.log({ error });
  }
});

app.listen(PORT, () => {
  console.log('[server]  Listening at localhost:' + PORT);
});

module.exports = app;
