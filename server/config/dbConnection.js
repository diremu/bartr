const mongoose = require("mongoose")

//to try and connect to the db
// a seperate file and is called before any thing is run
const connectDB = async() => {
    try {
        //the parameters are the connection string and the connection object
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
    } catch(error) {
        console.error(error)
    }
}

module.exports = connectDB