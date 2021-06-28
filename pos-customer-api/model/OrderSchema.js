const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderName:{
        type:String,
        required:true
    },
    orderColour:{
        type:String,
        required:true
    },
    orderSize:{
        type:String,
        required:true
    },
    orderPrice:{
        type:Number,
        required:true
    },
    orderQuantity:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Order', OrderSchema);
