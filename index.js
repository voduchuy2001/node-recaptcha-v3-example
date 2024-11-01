const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const { default: RecaptchaV3 } = require('node-recaptcha-v3')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'node-recaptcha-v3',
    description: 'A Node.js library for verifying Google reCAPTCHA v3 tokens in your applications.'
  })
})

const recaptchaV3 = new RecaptchaV3({
  secretKey: '6LcoOHIqAAAAAEkzmwSiBStyELshcU_FUc41S-A5'
})

app.post('/test', recaptchaV3.verify(0.6, 401, 'Your are a robot'), async (req, res) => {
  const query = req.query
  const params = req.params
  const body = req.body
  const headers = req.headers
  const ip = req.ip
  const score = req.reCaptchaV3Score

  return res.json({ query, params, body, headers, ip, score })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listen on: http://localhost:${PORT}`)
})
