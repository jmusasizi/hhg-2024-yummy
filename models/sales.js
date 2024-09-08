const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    salesname: {
        type: String,
        trim: true,
    },
    salestype: {
        type: String,  // Use 'String' with an uppercase 'S'
        trim: true,
    },
    tonnage:{
        type: Number,
        trim:true,
    },
    cost:{
        type: Number,
        trim:true,
    },
    dealer:{
        type: String,
        trim:true,
    },
    storagebranch:{
        type: String,
        trim:true,
    },
    contact:{
        type: String,
        trim:true,
    },
    sellingprice:{
        type: Number,
        trim:true,
    },
});

module.exports = mongoose.model('Sales', salesSchema);
