const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const { connectMongo } = require('./backend/mongo')
const { User } = require('./backend/models/user')
const { Artist } = require('./backend/models/user')
const { Organization } = require('./backend/models/user')
const { Event } = require('./backend/models/user')
const { default: axios } = require('axios')

connectMongo()

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/api/users', async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json('nothing found')
    }
})

app.listen(process.env.PORT || 8000, console.log('port connected successfully'))