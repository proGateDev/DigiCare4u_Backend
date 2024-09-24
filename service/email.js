const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

const sendEmail = (to, subject, htmlContent) => {
  mg.messages.create('your-domain.com', {
    from: 'your-email@your-domain.com',
    to,
    subject,
    html: htmlContent,
  })
  .then(response => console.log('Email sent', response))
  .catch(error => console.error('Error sending email', error));
};



module.exports = sendEmail