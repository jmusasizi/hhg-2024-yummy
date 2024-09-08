const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    branchname: {
        type: String,
        trim: true,
    },
    location:{
        type: String,
        trim:true,
    },
    contact:{
        type: Number,
        trim:true,
    }
});
module.exports = mongoose.model('Branch', branchSchema);
