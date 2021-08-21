const nodemailer = require('nodemailer')
require('dotenv').config()

const { EMAIL_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'aeritnu3000@meta.ua',
    pass: EMAIL_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendMail = async ({ to, subject, text }) => {
  const mail = {
    from: 'aeritnu3000@meta.ua',
    to,
    subject,
    text,
  }

  transporter.sendMail(mail)
    .then(info => console.log(info))
    .catch(error => console.log(error))
}

module.exports = sendMail
