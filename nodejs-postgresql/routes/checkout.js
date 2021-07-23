const express = require('express');
const db = require('../services/db');
const check = require('../services/books')
const router = express.Router();




// router.post('/', async (req, res) => {
    
// });



router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    const rows = await db.query(
        `SELECT * FROM cart WHERE user_id = ${req.params.id}`
    );
    const total_cost = await db.query(
        `select cart_id, sum(total_price) from cart where user_id = ${req.params.id} group by cart_id`
    );

    console.log(rows);
    if(rows){
        res.json({
            rows,
            total_cost
        });
    }
    else{
        res.json({
            "message": "Cart is empty"
        });
    }
})




router.delete('/', async (req, res) => {
    let user_id = req.body.user_id;
    let book_id = req.body.book_id;

    const rows = await db.query(
        `DELETE FROM cart WHERE user_id = ${user_id} and book_id = ${book_id}`
    );

    if(rows){
        res.json({
            "message": "Deleted",
            "rows": rows[0]
        });
    }
    else{
        res.json({
            "message": "Error while adding to cart. Please try again later."
        });
    }
})




router.put('/', async (req, res) => {
    if(Object.keys(req.body).length && Object.entries(req.body).length){
        let cart_id = req.body.cart_id;
        let user_id = req.body.user_id;
        let book_id = req.body.book_id;
        let quantity = req.body.count;
        let total_price = req.body.total_price;
        if(cart_id && user_id && book_id && quantity && total_price ){
        

            const rows = await db.query(
                `UPDATE cart SET quantity = ${quantity}, total_price = ${total_price} WHERE cart_id = ${cart_id} and user_id = ${user_id} and book_id = ${book_id}`
            );
            console.log(rows);
            // let total_cost = total_price;
            
            if(rows){
                res.json({
                    "message": "Updated",
                    "rows": rows[0]
                });
            }
            else{
                res.json({
                    "message": "Error while adding to cart. Please try again later."
                });
            }
        }
        else{
            res.json({
                "message": "Error while adding to cart. Please try again later."
            });
        }

    }
    else{
        res.json({
            "message": "There's nothing to add"
        });
    }
});




router.post('/', async (req, res) => {
    // var c=1;
    // console.log(Object.keys(req.body).length);
    if(Object.keys(req.body).length && Object.entries(req.body).length){
        let cart_id = req.body.cart_id;
        let user_id = req.body.user_id;
        let book_id = req.body.book_id;
        let quantity = req.body.count;
        let total_price = req.body.total_price;
        if(cart_id && user_id && book_id && quantity && total_price){
        

            const rows = await db.query(
                `INSERT INTO cart values (${cart_id}, ${user_id}, ${book_id}, ${quantity}, ${total_price}) RETURNING *`
            );
            console.log(rows);
            // let total_cost = total_price;
            
            if(rows){
                res.json({
                    "message": "Inserted",
                    "rows": rows[0]
                });
            }
            else{
                res.json({
                    "message": "Error while adding to cart. Please try again later."
                });
            }
        }
        else{
            res.json({
                "message": "Error while adding to cart. Please try again later."
            });
        }

    }
    else{
        res.json({
            "message": "There's nothing to add"
        });
    }

});


module.exports = router;