const mongoose = require ("mongoose");
const shortid = require('shortid');


const Product = mongoose.model (
    "Product" , 
    new mongoose.Schema ({
        _id: {type: String , default: shortid.generate},
        image: String,
        title: String,
        descrition: String, 
        availableSizes: [String],
        price: Number,
    }) , 'products'
)
module.exports = Product