require('dotenv').config();
const express = require('express');
const path = require('path');
const nodeMailer = require('nodemailer');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());

app.post('/contact', cors(), (req, res, next) => {
  const transporter = nodeMailer.createTransport({
    host: 'mail.medicated.rs',
    port: 465,
    auth: {
      user: `${process.env.USER4MAIL}`,
      pass: `${process.env.PASS4MAIL}`,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: req.body.name,
    to: 'test@medicated.rs',
    subject: `Message from ${req.body.name} - ${req.body.email}`,
    text: `
    Contact phone: ${req.body.phone}

    Name: ${req.body.name}

    Email: ${req.body.email}

    Message:
    ${req.body.message}
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error); // Printed in server terminal in case of error
      res.send('error'); // Sent to application in case of error
    } else {
      console.log('Email successfuly sent! ' + info.response); // Printed in server terminal in case of success
      res.send('Email successfuly sent!'); // Sent to application in case of success
      res.end();
    }
  });
});

app.use(cors());

app.listen(port, () => {
  console.log('Server started on port ' + port);
});
