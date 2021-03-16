const mongoose = require('mongoose')

const pictureSchema = new mongoose.Schema({
    data: mongoose.Schema.Types.Buffer,
})
