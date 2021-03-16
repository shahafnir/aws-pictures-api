const express = require('express')
const cors = require('cors')
require('./db/mongoose')

const pictureRouter = require('./routers/picture')

const port = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(pictureRouter)

app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})
