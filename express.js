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
const cookieParser = require('cookie-parser')

connectMongo()

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

// MiddleWares

const ProtectedUserRoutes = async (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        const decodToken = jwt.verify(token, process.env.JWT_SECRET)
        const authUser = await User.findById(decodToken.userId)
        if(authUser){
            req.user = authUser
            next()
        }
        else {
            res.status(404).json({message: 'user not found'})
        }
    }
    else {
        res.status(401).json({message: 'this route need authentification'})
    }
}

const ProtectedOrganizationRoutes = async (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        const decodToken = jwt.verify(token, process.env.JWT_SECRET)
        const authOrganization = await Organization.findById(decodToken.organizationId)
        if(authOrganization){
            req.organization = authOrganization._id
            next()
        }
        else {
            res.status(404).json({message: 'organization not found'})
        }
    }
    else {
        res.status(401).json({message: 'this route need authentification'})
    }
}

// User Routes

app.get('/api/users', ProtectedUserRoutes,async(req, res) => {
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

app.get('/api/organizations', ProtectedOrganizationRoutes, async (req, res) => {
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

app.post('/api/organization/addEvent', ProtectedOrganizationRoutes, async (req, res) => {
    try {
        const organizationId = req.organization
        const {title, description, date, location} = req.body

        const existedEvent = await Event.findOne({title, description, date, location})
        if(existedEvent){
            return res.status(401).json({message: 'this event already exists'})
        }

        const newEvent = await Event.create({
            title,
            description,
            date,
            location,
            organizater: organizationId,
            artists: [],
        }).catch(error => console.error('Error creating event:', error));
        
        if(newEvent){
            const updateOrganization = await Organization.findByIdAndUpdate(organizationId, {$push: {events: newEvent._id}})
            if(updateOrganization){
                res.status(200).json({message: 'event created successfully'})
            }
        }
        else{
            console.log('something went wrong on new event')
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
    
})

app.delete('/api/organization/deleteEvent', ProtectedOrganizationRoutes, async (req, res) => {
    try {
        const organizationId = req.organization;
        const eventId = req.body.eventId;

        // Check if the event exists in the organization's events array
        const organization = await Organization.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found or already deleted' });
        }

        const updatedOrganization = await Organization.findByIdAndUpdate(
            organizationId,
            { $pull: { events: eventId } },
            { new: true }
        );

        if (updatedOrganization) {
            return res.status(200).json({ message: 'Event deleted successfully' });
        } else {
            return res.status(500).json({ message: 'Failed to update the organization' });
        }
    } catch (error) {
        console.error('Error deleting event:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



// App Connection

app.listen(process.env.PORT || 8000, console.log('port connected successfully'))