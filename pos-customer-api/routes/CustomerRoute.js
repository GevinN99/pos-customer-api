const express = require('express');
const CustomerController = require('../controller/CustomerController');

const router = express.Router();

router.post('/saveCustomer', CustomerController.saveCustomer);
router.delete('/deleteCustomer', CustomerController.deleteCustomer);
router.get('/getCustomer', CustomerController.getCustomer);
router.put('/updateCustomer', CustomerController.updateCustomer);
router.get('/getAllCustomers', CustomerController.getAllCustomers);
router.route('/login').get(CustomerController.getCustomer);

module.exports = router;
