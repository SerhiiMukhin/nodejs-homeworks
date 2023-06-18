const nodemailer = require('nodemailer');
require('dotenv').config();

const { MAIL_ADDRESS, MAIL_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: MAIL_ADDRESS,
    pass: MAIL_PASSWORD,
  },
});

const emailSender = async data => {
  const email = { ...data, from: MAIL_ADDRESS };
  await transport.sendMail(email);
  return true;
};

module.exports = emailSender;
