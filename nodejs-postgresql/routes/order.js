var express = require('express');
var router = express.Router();
var db = require('../services/db');

router.post('/:id', (req, res) => {
    console.log(req.body);
    const user_id = req.params.id;
    const amt = req.body.amount;
    const deliveryAdd = req.body.address;
    const rows = db.query(
        `INSERT INTO orders (amount, delivery_address, user_id) VALUES (${amt}, '${deliveryAdd}', ${user_id}) RETURNING *`
    ); 
    if(rows)
        res.json({"message": "Your order has been placed"});
    else
        res.json({"message": "Order not placed. Please try again later"});
})

module.exports = router