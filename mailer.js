const nodemailer = require('nodemailer')

const senderMail = {
    user: "exemplesender@yahoo.com",
    pass: "exemplepass"
}

async function mailer(req, res) {
    let transporter = await nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 587,
        service: 'yahoo',
        secure: false,
        auth: {
            user: senderMail.user,
            pass: senderMail.pass
        }
    })
    
    await transporter.verify((err, success) => {
        if(err) {
            console.log(err)
        } else if (req) {
            console.log("Server ready for sending e-mails...")
            
            const msg = {
                subject: 'Subject',
                text: `Text test for '${req.body.name}'`
            }
            
            const mailOptions = {
                from: senderMail.user,
                to: req.body.email,
                subject: msg.subject,
                text: msg.text
            }
            
            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    res.send(`Error sending e-mail to : ${mailOptions.to}`)
                } else {
                    res.send(`E-mail sent with success to : ${mailOptions.to}`)
                }
                transporter.close()
            })
        }
    })    
}

mailer()
    .catch(err => console.log(err))
    

module.exports = { mailer }