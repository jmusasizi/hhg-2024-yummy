const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
 stockname: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema)