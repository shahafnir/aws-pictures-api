const mongoose = require('mongoose')

const pictureSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            default: 'Picture',
        },
        data: {
            type: Buffer,
        },
    },
    {
        timestamps: true,
    }
)

const Picture = mongoose.model('Picture', pictureSchema)

module.exports = Picture
