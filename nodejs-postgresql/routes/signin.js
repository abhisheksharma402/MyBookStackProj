const express = require('express');
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const router = express.Router();
const bcrypt = require('bcrypt');
const checkUser = require('../services/validate');


router.post('/', async function(req, res, next){
    if(req.body.email == "" || req.body.password == ""){
        res.json({"error": "Please enter all the details"});
        return;
    }
    const response = await checkUser.check(req.body);
    console.log(response);
    if(response){
        const user = await checkUser.getUserByEmail(req.body.email);
        bcrypt.compare(req.body.password, user[0].password)
        .then((result) => {
            // console.log("result: ", result);
            if(result){
                const id = user[0].user_id
                const name = user[0].name;
                const email = user[0].email;
                const user_info = {
                    id,
                    name,
                    email
                }
                const token = jwt.sign({ id }, 'secret');
                res.cookie("t", token, { expire: new Date() + 9999 });
                res.json({ token, user_info });
                // setting the 'set-cookie' header
                // res.cookie('user_id', user[0].user_id, {
                //     httpOnly: true,
                //     // secure: true, secure when in production
                //     signed: true
                // });
                // res.json({
                //     "result": result,
                //     "message": "Logged In.."
                // });
            }
            else{
                res.json({"error": "Incorrect email or password"});
            }
        })
    }
    else if(!response){
        res.json({"error": "Account with this email id does not exist. Please Register first."});
    }
    else{
        res.json({"error": "Incorrect email or password"});
    }
});





module.exports = router;



