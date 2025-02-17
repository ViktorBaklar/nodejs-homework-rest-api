const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const apiRouter = require('./routes/api')

require('./config/config-passport')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', apiRouter.contacts)
app.use('/api/users', apiRouter.users)

app.use(express.static('public'))

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
