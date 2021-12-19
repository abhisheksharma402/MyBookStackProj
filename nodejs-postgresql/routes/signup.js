const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
const validUser = require('../services/validate');
// const booksSvc = require('../services/books');


router.post('/', async function(req, res, next){
    if(req.body.name == "" || req.body.email == "" || req.body.password == ""){
        res.json({"error": "Please enter all the details"});
        return;
    }
    const response = await validUser.check(req.body);
    if(response) 
        res.json({"error": "Email already in use"});
    else if(!response){
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(req.body.email)) {
            res.json({"error": "Please enter a valid email address. Email must be of the form 'abc@example.com'"})
            return;
        }
        // if(req.body.password.length < 6){
        //     // errors["password"] = "Please add at least 6 charachter.";
        //     res.json({"error": "Password must be atleast 6 characters long"});
        // }
        if (!validator.isStrongPassword(req.body.password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })) {
            res.json({"error": "Password must be atleast 6 characters long, must contain atleast 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character"});
            return;
        }
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