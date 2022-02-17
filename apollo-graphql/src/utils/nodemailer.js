require('dotenv').config()
const from = process.env.replyEmailAddress
const smtpUser = process.env.smtpUser
const smtpPassword = process.env.smtpPassword

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  "host": "smtpdm.aliyun.com",
  "port": 465,
  "secureConnection": true, // use SSL, the port is 465
  "auth": {
      "user": smtpUser, // user name
      "pass": smtpPassword // password
  }
});

module.exports = {
  mailto: async (to, subject, body) => {
    const mailOptions = {
      from: "RELAX<reylax@anotherview.club>", // sender address mailfrom must be same with the user
      to: to, // list of receivers
      // cc:'haha<xxx@xxx.com>', // copy for receivers
      // bcc:'haha<xxxx@xxxx.com>', // secret copy for receivers
      subject: subject, // Subject line
      replyTo: from,//custom reply address
      html: body
      
    };
    await transporter.sendMail(mailOptions)
  }
}