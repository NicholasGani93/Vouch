const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a username"]
        },
        roomid: {
            type: String,
            required: [true, "Please enter a room id"]
        },
        message: {
            type: String,
            required: [true, "Please enter a message"]
        }
    },
    {
        timestamps: true
    }
)


const Messages = mongoose.model('Messages', messageSchema);

module.exports = Messages;