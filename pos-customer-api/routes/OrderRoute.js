const express = require('express');
const OrderController = require('../controller/OrderController');

const router1 = express.Router();

router1.post('/saveOrder', OrderController.saveOrder);
router1.delete('/deleteOrder', OrderController.deleteOrder);
router1.get('/getOrder', OrderController.getOrder);
router1.put('/updateOrder', OrderController.updateOrder);
router1.get('/getAllOrders', OrderController.getAllOrders);

module.exports = router1;
