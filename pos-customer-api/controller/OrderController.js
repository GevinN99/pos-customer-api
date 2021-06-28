const Order = require('../model/OrderSchema');
const Customer = require('../model/CustomerSchema');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const express = require('express')
const app = express()

app.use(express.json())


const saveOrder = async (req, resp) => {

    const order = new Order({
        orderName: req.body.orderName,
        orderColour: req.body.orderColour,
        orderSize: req.body.orderSize,
        orderPrice: req.body.orderPrice,
        orderQuantity: req.body.orderQuantity,
        total: req.body.total
    });

    order.save().then(result => {
        resp.status(200).json({state: true, "message": "Saved"});
    }).catch(error => {
        resp.status(500).json(error)
    });
}


const deleteOrder = (req, resp) => {
    Order.deleteOne({orderName: req.headers.id}).then(deleteResponse => {
        if (deleteResponse.deletedCount > 0) {
            resp.status(200).json({message: 'Deleted'});
        } else {
            resp.status(200).json({message: 'Try Again'});
        }
    }).catch(error => {
        resp.status(500).json(error)
    })
}


const getOrder = (req, resp) => {
    Order.findOne({orderName: req.headers.id}).then(result => {
        if (result !== null) {
            resp.status(200).json({state: true, data: result});
        } else {
            resp.status(200).json({state: false});
        }
    }).catch(error => {
        resp.status(500).json(error);
    })
}

const updateOrder = (req, resp) => {

}

const getAllOrders = (req, resp) => {

}




module.exports = {
    saveOrder,
    deleteOrder,
    getOrder,
    updateOrder,
    getAllOrders
}
