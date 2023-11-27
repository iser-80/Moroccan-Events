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
const { useParams } = require('react-router-dom')

connectMongo()

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));
app.use(cors({
    origin: "http://localhost:5001", // Allow requests from any origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If your API uses cookies or sessions
  }))

const stripe = require('stripe')('sk_test_51OFDmEBMTJml9ldY2z8AdE9eocLCIp5onafQxlnA760LQ1WW3I8F6meQ5ibAiWbbslYaCNsMjQ9WWfmjgfWlSKQA00NifX6QqQ');


// MiddleWares

const authenticateUser = async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
  
      if (!token) {
        return next();
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findById(decoded.userId);
  
      if (!user) {
        // User not found, token is invalid
        return next();
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Error in authentication middleware:', error);
      next(error); // Pass the error to the error handler
    }
  };

const ProtectedOrganizationRoutes = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const authOrganization = await Organization.findById(decodedToken.organizationId);
        //console.log(authOrganization)
        
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
                const token = jwt.sign({userId, role: 'user'}, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.cookie('jwt', token, {
                    httponly: true,
                    secure: false,
                    sameSite: 'strict',
                    maxAge: 1000 * 60 * 60,
                    // Specify the path where the cookie is accessible
                    path: '/api/user',
                });

                const authUser = {
                    name: foundUser.name,
                    email: foundUser.email,
                    phone: foundUser.phone
                }
                return res.status(200).json(authUser);
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

app.post('/api/user/logout', async (req, res) => {
    try {
        res.cookie('jwt', '',{httpOnly: true, expires: new Date(0), path: '/api/user'})
        return res.status(200).json({message: 'user logout success'})
    } catch (error) {
        return res.status(500).json({message: 'an error occured while logout user'})
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
            const token = jwt.sign({organizationId, role: 'organization'}, process.env.JWT_SECRET, {expiresIn: '1h'})
            res.cookie('jwt', token, {
                httponly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60,
                // Specify the path where the cookie is accessible
                path: '/api/organization',
            });
            
            const authOrg = {
                name: foundedOrganization.name,
                email: foundedOrganization.email,
                phone: foundedOrganization.phone
            }
            res.status(200).json(authOrg)
        }
    }
    else {
        res.status(404).json({message: 'this account not found'})
    }
})


app.post('/api/organization/logout', async (req, res) => {
    try {
        // Clear the cookie with the same path
        res.cookie('jwt', '', { httpOnly: true, expires: new Date(0), path: '/api/organization' });
        res.status(200).json({ message: 'organization logout success' });
    } catch (error) {
        res.status(500).json({ message: 'an error occurred while logout organization' });
    }
});


app.get('/api/events/getUpComingEvents', async (req, res) => {
    try {
        const upComingEvents = [];
        const organizations = await Organization.find();

        if (organizations.length > 0) {
            for (const organization of organizations) {
                const currentDate = new Date();
                const allEventsId = organization.events;

                // Skip to the next organization if events are null or undefined
                if (!allEventsId) {
                    // console.log('No events for this organization, skipping...');
                    continue;
                }

                const allEvents = await Promise.all(allEventsId.map(async (eventId) => {
                    const event = await Event.findById(eventId);

                    // Skip to the next event if it's null
                    if (!event) {
                        // console.log('Null event found, skipping...');
                        return null;
                    }

                    return event;
                }));

                // Filter out null events before processing
                const validEvents = allEvents.filter((event) => event !== null);

                // Now reset eventDate for each organization
                for (const event of validEvents) {
                    const eventDate = new Date(event.date);

                    if (
                        eventDate >= currentDate &&
                        eventDate.getMonth() === currentDate.getMonth() &&
                        eventDate.getFullYear() === currentDate.getFullYear()
                    ) {
                        // Only push events if there are upcoming events
                        upComingEvents.push({ organizationId: organization._id, events: [event] });
                    }
                }
            }

            res.status(200).json(upComingEvents);
        } else {
            res.status(404).json({ message: 'organizations not found' });
        }

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'internal error in get Upcoming Events' });
    }
});


// return the close event (date) for each organization
app.get('/api/events/getMainEvents', async (req, res) => {
    try {
        const organizations = await Organization.find()
        const mainEvents = []

        if(organizations.length > 0){
            for (const organization of organizations){
                const allEventsIds = organization.events

                if(!allEventsIds){
                    // console.log('No main events for this organization, skipping...');
                    continue;
                }

                const allEvents = await Promise.all(
                    allEventsIds.map(async (eventId) => {
                        const event = await Event.findById(eventId)
                        if(!event){
                            // console.log('null main event found')
                            return null
                        }
                        return event
                    })
                )

                let closestDate = null;
                let minTimeDiff = Infinity;
                let main_Event = null
                const currentDate = new Date()
                const validEvents = allEvents.filter((event) => event !== null) 
  
                for (const mainEvent of validEvents){
                    const timeDiff = mainEvent.date - currentDate 
                    if(timeDiff > 0 && timeDiff < minTimeDiff){
                        closestDate = mainEvent.date
                        minTimeDiff = timeDiff
                        main_Event = mainEvent
                    }
                }

                if(closestDate){
                    mainEvents.push(main_Event)
                }
            }
            res.status(200).json(mainEvents)
        }
    } catch (error) {
        res.status(500).json({message: 'internel error, getting organization events'})
    }
})

app.get('/api/organization/getEvents/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;

        // get the organization id based on the event id
        const organizations = await Organization.find();

        const organizationId = organizations.find((organization) => {
            const orgEvents = organization.events;

            if (!orgEvents || orgEvents.length === 0) {
                // console.log('There are no events in this organization');
                return false;
            }

            return orgEvents.includes(eventId);
        });

        if (organizationId) {
            console.log('organization founded')
        } else {
            console.log('Event not found in any organization');

        }

        const organization = await Organization.findById(organizationId)
        if(organization){
            const allEvents = organization.events
            //console.log('wait : ', organizationId)
            if(!allEvents || allEvents.length === 0) {
                return res.status(404).json({message: 'there is no events in this organization'})
            }
            
            const events = await Event.find({
                _id: { $in: allEvents, $ne: eventId }
              });
              
            res.status(200).json(events)
        }
    } catch (error) {
        res.status(500).json({message: 'internel error, getting organization events'})
    }
})

app.get('/api/organization/getMainEvents', ProtectedOrganizationRoutes, async (req, res) => {
    const organizationId = req.organization;

    try {
        const organization = await Organization.findById(organizationId);

        if (organization) {
            const currentDate = new Date();
            const orgEvents = organization.events;

            if (orgEvents.length > 0) {
                // Fetch complete event details based on event IDs
                const eventDetailsPromises = orgEvents.map(eventId => Event.findById(eventId));
                const eventDetails = await Promise.all(eventDetailsPromises);

                // Filter events based on date and whether they are considered main events
                const upcomingMainEvents = eventDetails.filter(event => event && new Date(event.date) >= currentDate );

                if (upcomingMainEvents.length > 0) {
                    res.status(200).json(upcomingMainEvents);
                } else {
                    res.status(404).json({ message: 'There are no upcoming main events in this organization' });
                }
            } else {
                res.status(400).json({ message: 'There are no events yet in this organization' });
            }
        } else {
            res.status(404).json({ message: 'Organization not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error, getting main organization events' });
    }
});

app.get('/api/organization/getPastEvents',ProtectedOrganizationRoutes, async (req, res) => {
    const organizationId = req.organization;

    try {
        const organization = await Organization.findById(organizationId);

        if (organization) {
            const currentDate = new Date();
            const orgEvents = organization.events;

            if (orgEvents.length > 0) {
                // Fetch complete event details based on event IDs
                const eventDetailsPromises = orgEvents.map(eventId => Event.findById(eventId));
                const eventDetails = await Promise.all(eventDetailsPromises);

                console.log(eventDetails)
                // Filter events based on date and whether they are considered main events
                const pastEvents = eventDetails.filter(event => event && new Date(event.date) < currentDate );
                
                if (pastEvents.length > 0) {
                    res.status(200).json(pastEvents);
                } else {
                    res.status(404).json({ message: 'There are no past events in this organization' });
                }
            } else {
                res.status(400).json({ message: 'There are no events yet in this organization' });
            }
        } else {
            res.status(404).json({ message: 'Organization not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error, getting past organization events' });
    }
})


app.post('/api/organization/addEvent', ProtectedOrganizationRoutes, async (req, res) => {
    try {
        const organizationId = req.organization;
        const { title, description, date, location, ticket, artists } = req.body;

        //console.log(title, description, date, location, artists); // Check the log

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
            ticket,
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
                const { title, description, date, location, ticket, artists } = event;

                // Send the event details as JSON
                res.status(200).json({
                    title,
                    description,
                    date,
                    location,
                    ticket,
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

app.put('/api/event/updateEvent', async (req, res) => {
    const eventId = req.body.eventId;
    const { title, description, date, location, ticket, eventArtists } = req.body;

    try {
        // Update the main event details
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId, 
            {
                $set: {
                    title,
                    description,
                    date, 
                    location, 
                    ticket,
                }
            },
            { new: true }
        );

        // Update the artists field in the same event
        const updateEventArtists = await Event.updateOne(
            { _id: eventId }, // Query condition
            {
                $set: {
                    artists: eventArtists.map(artist => artist.value)
                }
            }
        );

        if (updatedEvent && updateEventArtists) {
            res.status(200).json({ message: 'event updated successfully' });
        } else {
            res.status(401).json({ message: 'something went wrong while updating event' });
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
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
            //console.log(artist)
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

app.get('/api/artists/getArtist/:artistId', async (req, res) => {
    const { artistId } = req.params

    if(artistId){
        const artist = await Artist.findById(artistId)
        res.status(200).json(artist)
    }else{
        res.status(404).json({message: 'artist not found'})
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


// Stripe Payment 
app.post('/create-checkout-session', async (req, res) => {
    const line_items = [
        {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: `Ticket for ${req.body.data.title}`, // Include event title in the name
                },
                unit_amount: req.body.data.ticket * 100,
            },
            quantity: 1,
        }
    ];

    try {
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: 'http://localhost:5001/checkout-success',
            cancel_url: 'http://localhost:5001/checkout-failed',
        });

        res.send({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


  
// App Connection

app.listen(process.env.PORT || 8000, console.log('port connected successfully'))