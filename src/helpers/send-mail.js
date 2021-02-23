import sgMail from '@sendgrid/mail'

export const sendVerificationMail = (user) => {
    const {SENDGRID_API_KEY,PORT,SENDER_EMAIL}=process.env
    sgMail.setApiKey(SENDGRID_API_KEY)
    const { email, verificationToken } = user
    const verificationLink = `http://localhost:${PORT}/auth/verify/${verificationToken}`;
    const msg = {
    to: email,
    from: SENDER_EMAIL,
    subject: 'Confirm your registration',
    html: `<h2>Welcome to the Contacts app!</h2><a href=${verificationLink} target="_blank">Click here to verify your email</a>`,
  };
  sgMail.send(msg).then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}




