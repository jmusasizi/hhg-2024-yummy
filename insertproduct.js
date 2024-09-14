const mongoose = require('mongoose');
const Product = require('./models/insertproduct'); 

mongoose.connect('mongodb://localhost:27017/yummy', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
    return Product.insertMany([
      {stockname: "beans", },
      { stockname: "cowpeas",  },
      { stockname: "rice",   },
      { stockname: "gnuts",   },
      { stockname: "soyabeans", },
      { stockname: "maize",  },
    ]);
  })
  .then(() => {
    console.log('Products inserted successfully');
mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error inserting products:', err);
    mongoose.connection.close();
  });
