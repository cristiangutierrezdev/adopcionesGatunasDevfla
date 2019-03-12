const express = require('express')
const router = require('./routes')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const { dbConnection } = require('./models')

const app = express()

app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/api/v1', router)

dbConnection
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
