const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    customerName:{
        type:String,
        required:true
    },
    customerEmail:{
        type:String,
        required:true
    },
    customerMobileNumber:{
        type:Number,
        required:true
    },
    customerAddress:{
        type:String,
        required:true
    },
    customerPassword:{
        type:String,
        required:true

    }
});

module.exports = mongoose.model('Customer', CustomerSchema);
