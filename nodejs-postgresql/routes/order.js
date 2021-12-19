var express = require('express');
var router = express.Router();
var db = require('../services/db');

router.post('/', (req, res) => {
    console.log(req.body);
    const user_id = req.body.user_id;
    const amt = req.body.amount;
    const deliveryAdd = req.body.address;
    const order_details = req.body.products;
    console.log(JSON.stringify(order_details));
    const rows = db.query(
        `INSERT INTO orders (amount, delivery_address, user_id, order_details) VALUES (${amt}, '${deliveryAdd}', ${user_id}, '${JSON.stringify(order_details)}')`
        // `INSERT INTO orders (amount, delivery_address, user_id, order_details) select amount, address, user_id, products from json_populate_record (NULL::orders, '${req.body}') RETURNING *`
    ); 
    if(rows)
        res.json({"message": "Your order has been placed"});
    else
        res.json({"message": "Order not placed. Please try again later"});
})



router.get('/:id', async (req, res) => {
    const user_id = req.params.id;
    console.log(user_id);
    const rows = await db.query(
        `SELECT * FROM orders WHERE user_id = ${user_id}`
    );
    if(rows)
        res.json(rows);
})



module.exports = router