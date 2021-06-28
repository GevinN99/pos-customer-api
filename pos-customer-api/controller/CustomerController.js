const Customer = require('../model/CustomerSchema');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const express = require('express')
const app = express()

app.use(express.json())

const loginCustomer = async (req, resp) => {


    const user = Customer.find(user => user.customerEmail === req.body.customerEmail)
    if (user == null) {
        return resp.status(400).send('Cannot find user')
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            resp.send('Success')
        } else {
            resp.send('Not Allowed')
        }
    } catch {
        resp.status(500).send()
    }
}

const saveCustomer = async (req, resp) => {
    /*
    * POST(save)--->(body)
    * GET(fetch)--->(headers)
    * PUT(update)--->(body)
    * DELETE(delete records)--->(headers)
    * */


    const customer = new Customer({
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        customerMobileNumber: req.body.customerMobileNumber,
        customerAddress: req.body.customerAddress,
        customerPassword: req.body.customerPassword
    });

    customer.save().then(result => {
        resp.status(200).json({state: true, "message": "Saved"});
    }).catch(error => {
        resp.status(500).json(error)
    });
}
const deleteCustomer = (req, resp) => {
    Customer.deleteOne({customerId: req.headers.id}).then(deleteResponse => {
        if (deleteResponse.deletedCount > 0) {
            resp.status(200).json({message: 'Deleted'});
        } else {
            resp.status(200).json({message: 'Try Again'});
        }
    }).catch(error => {
        resp.status(500).json(error)
    })
}
const getCustomer = (req, resp) => {
    Customer.findOne({customerId: req.headers.id}).then(result => {
        if (result !== null) {
            resp.status(200).json({state: true, data: result});
        } else {
            resp.status(200).json({state: false});
        }
    }).catch(error => {
        resp.status(500).json(error);
    })
}

const updateCustomer = (req, resp) => {
    console.log(req.body);
    Customer.updateOne(
        {customerId: req.body.id},
        {
            $set: {
                customerName: req.body.name,
                customerSalary: req.body.salary,
                customerAddress: req.body.address
            }
        }
    ).then(updateResult => {
        console.log(updateResult);
        if (updateResult.nModified > 0) {
            resp.status(200).json({message: 'updated'});
        } else {
            resp.status(200).json({message: 'try Again'});
        }

    }).catch(updateError => {
        resp.status(500).json(updateError);
    })
}

const getAllCustomers = async (req, resp) => {
    result = null;
    const user = Customer.find({ customerEmail : req.headers.email }).then(data => {
        result = data.toJSON;

    })



    if (user.size == 0) {
        return resp.status(400).send('Cannot find user')
    }


    // console.log(result)
    //console.log(await bcrypt.compare(req.headers.password, user.customerPassword))

    try {
        if (req.headers.password === result.customerPassword) {
            console.log("sdfsdfsdfsd")
            resp.send('Success')

  } else {
            console.log("sdfsdfsdfsd")
            resp.send('Not Allowed')
        }
    } catch {
        console.log("sdfsdfsdfsd")
        resp.send("Error")

    }
    //
    // Customer.find({ customerEmail : req.headers.email }).then(result => {
    //     resp.status(200).json({dataSet: result});
    //     if (user == null) {
    //         return resp.status(400).send('Cannot find user')
    //     }
    //
    //
    //
    //     if (bcrypt.compare(req.body.password, user.password)) {
    //         resp.send('Success')
    //     } else {
    //         resp.send('Not Allowed')
    //     }
    //
    //
    //
    // }).catch(error => {
    //     resp.status(500).json(error);
    // });
    console.log(req.headers.email);
    //
    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     const dbo = db.db("BloomingDale");
    //     const query = { customerEmail : "abcd@gmail.com" };
    //     dbo.collection("customers").find(query).toArray(function(err, result) {
    //         if (err) throw err;
    //         console.log(result);
    //         db.close();
    //     });
    // });
}

module.exports = {
    saveCustomer,
    deleteCustomer,
    getCustomer,
    updateCustomer,
    getAllCustomers
}
