const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a username"]
        },
        roomid: {
            type: String,
            required: [true, "Please enter a room id"]
        }
    },
    {
        timestamps: true
    }
)


const Users = mongoose.model('Users', userSchema);

module.exports = Users;