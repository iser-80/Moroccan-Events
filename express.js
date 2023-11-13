const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const { connectMongo } = require('./backend/mongo')
const { User } = require('./backend/models/user')
const { Artist } = require('./backend/models/artist')
const { Organization } = require('./backend/models/organization')
const { Event } = require('./backend/models/event')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

connectMongo()

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())


// MiddleWares

// User Routes

app.get('/api/users', async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json('nothing found')
    }
})

app.post('/api/user/login', async (req, res) => {
    const {email, password} = req.body

    const foundedUser = await User.findOne({email})
    if(foundedUser){
        const matchedPassword = bcrypt.compare(password, foundedUser.password)
        if(matchedPassword){
            const userId = foundedUser._id
            const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '1h'})
            res.cookie('jwt', token, {
                httponly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60,
            })     
            res.status(200).json({message: 'authentification success'})
        }
        else{
            res.status(401).json({message: 'password is incorrect'})
        }
    }
    else {
        res.status(404).json({message: 'user not found'})
    }
})

app.post('/api/user/register', async (req, res) => {
    const {name, email, phone, password} = req.body

    const existedUser = await User.findOne({email})
    if(existedUser){
        res.status(401).json({message: 'this account already exists'})
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name, 
            email, 
            phone, 
            password: hashedPassword,
        })
        if(newUser){
            res.status(200).json({message: 'registrition success'})
        }
    }

})  


// Organization Routes

app.get('/api/organizations', async (req, res) => {
    const data = await Organization.find()
    if(data){
        res.status(200).json(data)
    }
    else {
        res.status(404).json({message: 'something went wrong'})
    }
})

app.post('/api/organization/register', async (req, res) => {
    const {name, description, email, password} = req.body

    const existedOrganization = await Organization.findOne({email})
    if(existedOrganization){
        res.status(401).json({message: 'this organization email already exists'})
    }
    else {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newOrganization = await Organization.create({
            name,
            description, 
            email, 
            password: hashedPassword,
        })
        if(newOrganization){
            res.status(200).json({message: 'new Organization added'})
        }
    }
})

app.post('/api/organization/login', async (req, res) => {
    const {email, password} = req.body

    const foundedOrganization = await Organization.findOne({email})
    if(foundedOrganization){
        const matchedPassword = bcrypt.compare(password, foundedOrganization.password)
        if(matchedPassword){
            const organizationId = foundedOrganization._id
            const token = jwt.sign({organizationId}, process.env.JWT_SECRET, {expiresIn: '1h'})
            res.cookie('jwt', token, {
                httponly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60,
            })   
            res.status(200).json({message: 'organization login successfully'})
        }
    }
    else {
        res.status(404).json({message: 'this account not found'})
    }
})

// App Connection

app.listen(process.env.PORT || 8000, console.log('port connected successfully'))