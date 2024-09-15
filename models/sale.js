const mongoose = require('mongoose');

const saleStockSchema = new mongoose.Schema({
    producename: {
        type: String,
        trim: true,
    },
    quantity: {
        type: String, 
        trim: true,
    },
    
    
    price:{
        type: Number,
        trim:true,
    },

    total:{
        type: Number,
        trim:true,
    },
    
});

module.exports = mongoose.model('saleStock', saleStockSchema);
