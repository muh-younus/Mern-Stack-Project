const mongoose = require('mongoose')

const spotifySchema = new mongoose.Schema({
    
        username: {
            type: String,
            required: true
        },
        email: {
            type: string,
            unique: true
        },
        password: string
    
})
   
const userModel = mongoose.model('Spotify', spotifySchema)

module.exports = userModel
