const mongoose = require('mongoose')

const connectMongo= async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL).then((res) => {
            console.log("mongo connection is done");
        });   
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    connectMongo,
}