const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validUser = require('../services/validate');
// const booksSvc = require('../services/books');


router.post('/', async function(req, res, next){
    const response = await validUser.check(req.body);
    if(response) 
        res.json({"message": "Email in use"});
    else if(!response){
        bcrypt.hash(req.body.password, 5)
        .then(async (hash) => {
            const user = {
                name: req.body.name,
                email: req.body.email,
                password: hash
            };
            res.json(await validUser.insertNewUser(user));
        });
    }
    else{
        next(new Error('Email in use'));
    }

});


module.exports = router;