const mongoose = require('mongoose');

const creditsalesSchema = new mongoose.Schema({
    stocksname: {
        type: String,
        trim: true,
    },
    creditsalestype: {
        type: String,  // Use 'String' with an uppercase 'S'
        trim: true,
    },
    tonnage:{
        type: Number,
        trim:true,
    },
    amountdue:{
        type: Number,
        trim:true,
    },
    buyername:{
        type: String,
        trim:true,
    },
    storagebranch:{
        type: String,
        trim:true,
    },
    location:{
        type: String,
        trim:true,
    },
    nationalid :{
        type: String,
        trim:true,
    },
    contact:{
        type: String,
        trim:true,
    },
    duedate:{
        type: String,
        trim:true,
    },
    dateofdispatch:{
        type: String,
        trim:true,
    },
    receipt:{
        type: String,
        trim:true,
    },
});
module.exports = mongoose.model('Creditsales', creditsalesSchema);
