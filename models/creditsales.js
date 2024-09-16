const mongoose = require('mongoose');

const creditsalesSchema = new mongoose.Schema({
    customername: {
        type: String,
        trim: true,
    },
    customercontact: {
        type: String,
        trim: true,
    },
    
    productname: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        trim: true,
    },
    total: {
        type: Number,  // Use 'String' with an uppercase 'S'
        trim: true,
    },
    // tonnage:{
    //     type: Number,
    //     trim:true,
    // },
    // amountdue:{
    //     type: Number,
    //     trim:true,
    // },
    // buyername:{
    //     type: String,
    //     trim:true,
    // },
    storagebranch:{
        type: String,
        trim:true,
    },
    location:{
        type: String,
        trim:true,
    },
    nationalid :{
        type: Number,
        trim:true,
    },
    // contact:{
    //     type: Number,
    //     trim:true,
    // },
    duedate:{
        type: Number,
        trim:true,
    },
    dateofdispatch:{
        type: Number,
        trim:true,
    },
    quantity:{
        type: Number,
        trim:true,
    },
});
module.exports = mongoose.model('Creditsales', creditsalesSchema);
