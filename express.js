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
const cors = require('cors')

connectMongo()

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5001", // Allow requests from any origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If your API uses cookies or sessions
  }))

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
    const token = req.cookies.jwt;

    if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const authOrganization = await Organization.findById(decodedToken.organizationId);
        console.log(authOrganization)
        
        if (authOrganization) {
            req.organization = authOrganization._id; // Corrected property name

            next();
        } else {
            res.status(404).json({ message: 'organization not found' });
        }
    } else {
        res.status(401).json({ message: 'this route needs authentication' });
    }
};



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
    const { email, password } = req.body;
    console.log(email)

    try {
        const foundUser = await User.findOne({email});
        console.log(foundUser)

        if (foundUser) {
            const matchedPassword = await bcrypt.compare(password, foundUser.password);

            if (matchedPassword) {
                const userId = foundUser._id;
                const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.cookie('jwt', token, {
                    httponly: true,
                    secure: false,
                    sameSite: 'strict',
                    maxAge: 1000 * 60 * 60,
                });

                return res.status(200).json({ message: 'Authentication success', userId });
            } else {
                return res.status(401).json({ message: 'Incorrect password' });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


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


// should be updated regarding on the main events algorithm
app.get('/api/organization/getMainEvents', ProtectedOrganizationRoutes, async (req, res) => {
    try {
        const organizationId = req.organization
        console.log('organization id: ', organizationId)

        const organization = await Organization.findById(organizationId)
        if(organization){
            const allEvents = organization.events
            console.log('wait : ', organizationId)
            if(!allEvents || allEvents.length === 0) {
                return res.status(404).json({message: 'there is no events in this organization'})
            }
            
            const mainEvents = []
            if(allEvents.length > 3){
                for (let i = 0; i < 3; i++) {
                    const event = await Event.findById(allEvents[i])
                    mainEvents.push(event)
                }
            }
            else{
                for (let i = 0; i < allEvents.length; i++) {
                    const event = await Event.findById(allEvents[i])
                    mainEvents.push(event)
                }
            }

            console.log('main events : ', mainEvents)
            res.status(200).json(mainEvents)
        }
    } catch (error) {
        res.status(500).json({message: 'internel error, getting organization events'})
    }
})

app.get('/api/organization/getEvents/:eventId', ProtectedOrganizationRoutes, async (req, res) => {
    try {
        const { eventId } = req.params
        const organizationId = req.organization
        console.log('organization id: ', organizationId)

        const organization = await Organization.findById(organizationId)
        if(organization){
            const allEvents = organization.events
            console.log('wait : ', organizationId)
            if(!allEvents || allEvents.length === 0) {
                return res.status(404).json({message: 'there is no events in this organization'})
            }
            
            const events = await Promise.all(allEvents.map(async (event_id) => {
                if(event_id !== eventId){
                    const event = await Event.findById(event_id)
                    return event
                }
            }))
            res.status(200).json(events)
        }
    } catch (error) {
        res.status(500).json({message: 'internel error, getting organization events'})
    }
})

app.post('/api/organization/addEvent', ProtectedOrganizationRoutes, async (req, res) => {
    try {
        const organizationId = req.organization;
        const { title, description, date, location, artists } = req.body;

        console.log(title, description, date, location, artists); // Check the log

        try {
            const existedEvent = await Event.findOne({ title, description, date, location });
            if (existedEvent) {
                return res.status(401).json({ message: 'This event already exists' });
            }
        } catch (error) {
            console.log(error);
        }

        const newEvent = await Event.create({
            title,
            description,
            date,
            location,
            organizater: organizationId,
            artists: artists.map((artist) => artist.value),
        }).catch((error) => console.error('Error creating event:', error));

        if (newEvent) {
            const updateOrganization = await Organization.findByIdAndUpdate(
                organizationId,
                { $push: { events: newEvent._id } }
            );

            if (updateOrganization) {
                res.status(200).json({ message: 'Event created successfully', eventId: newEvent._id });
            }
        } else {
            console.log('Something went wrong with creating a new event');
        }
    } catch (error) {
        console.error('Error in the addEvent route:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



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



// Events

app.get('/api/event/:eventId', async (req, res) => {
    try {
        const {eventId} = req.params
        if(eventId){
            const event = await Event.findById(eventId)
            if(event){
                const { title, description, date, location, artists } = event;

                // Send the event details as JSON
                res.status(200).json({
                title,
                description,
                date,
                location,
                artists,
                // Add any other details you need
                });
            }
            else{
                res.status(404).json({message: 'the event not found'})
            }
        }
    } catch (error) {
        res.status(500).json({message: 'internet server error'})
    }
})

app.get('/api/event/getArtists/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId);
        const allArtists = event.artists;

        if (!allArtists || allArtists.length === 0) {
            return res.status(404).json({ message: 'There are no artists in this event' });
        }

        // we use the promise.all is to resolve the map issue (async dosent work with map())
        const artists = await Promise.all(allArtists.map(async (artistId) => {
            const artist = await Artist.findById(artistId);
            return artist;
        }));
        // for testing to remove
        // console.log('This is the event: ', event);
        // console.log('These are the event artists: ', artists);
        res.status(200).json(artists);
    } catch (error) {
        console.error('Error fetching artists for the event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.put('/api/event/addArtist', async (req, res) => {
    try {
        const {first_name, last_name, genre} = req.body
        const eventId = req.body.eventId

        const foundedEvent = await Event.findById(eventId)
        if(foundedEvent){
            const artist = await Artist.findOne({first_name, last_name})
            if(!artist){
                const newArtist = await Artist.create({
                    first_name,
                    last_name,
                    genre,
                })
                artist = newArtist
            }
            console.log(artist)
            const updatedEvent = await Event.updateOne(foundedEvent, {$push: {artists: artist._id}})
            if(updatedEvent){
                res.status(201).json({message: 'artist added to the event successfully'})
            }else{
                res.status(401).json({message: 'artist cant be added to the event'})
            }
        }else {
            res.status(404).json({message: 'event not found'})
        }
    } catch (error) {
        res.status(500).json({message: 'internel server error'})
    }
})

// we only delete the artist from the event & keep it in the artist ModelDB
app.put('/api/event/deleteArtist', async (req, res) => {
    try {    
        const eventId = req.body.eventId
        const artistId = req.body.artistId
    
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            {$pull: {artists: artistId}},
            {new: true})
    
        if(updatedEvent){
            res.status(201).json({message: 'event updated successfully'})
        }else{
            res.status(404).json({message: 'event cant be updated or found'})
        }
    } catch (error) {
        res.status(500).json({message: 'internel server error'})
    }
})


// Artists

app.get('/api/artists', async (req, res) => {
    const allArtists = await Artist.find()

    if(allArtists){
        return res.status(200).json(allArtists)
    }else{
        return res.status(404).json({message: 'Artists field not found'})
    }
})


app.post('/api/artists/addArtist', async (req, res) => {
    const { first_name, last_name, genre } = req.body
    const existedArtist = await Artist.findOne({first_name, last_name})
    if(existedArtist){
        return res.status(401).json({message: 'this artist already existed in the database'})
    }

    const newArtist = await Artist.create({
        first_name, 
        last_name, 
        genre,
    })
    if(newArtist){
        res.status(200).json({message: 'new Artist has been added'})
    }else{
        res.status(500).json({message: 'cant create new artist'})
    }
})

// App Connection

app.listen(process.env.PORT || 8000, console.log('port connected successfully'))