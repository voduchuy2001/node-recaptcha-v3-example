const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

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

const { default: Recaptcha } = require('node-recaptcha-v3')

const recaptcha = new Recaptcha({
  secretKey: '6LcFp3EqAAAAAHeyumi5hMzSBIlpggt0Vz-XgpG6'
})

app.post('/test', recaptcha.v3(0.6, 401, 'Your are a robot'), async (req, res) => {
  const query = req.query
  const params = req.params
  const body = req.body
  const headers = req.headers
  const ip = req.ip
  const score = req.recaptchaV3Score

  return res.json({ query, params, body, headers, ip, score })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listen on: http://localhost:${PORT}`)
})
