const app = require('express')()
const bodyParser = require('body-parser')
const { mailer } = require('./mailer')

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/contact/sendEmail', (req, res) => {
    mailer(req, res)
})

app.listen(3000, () => {
    console.log("Executing system...")
})