const express = require('express');
const router = express.Router();
const booksSvc = require('../services/books');



/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await booksSvc.getAllBooks());
  } catch (err) {
    console.error(`Error while getting Books`, err.message);
    next(err);
  }

  // let page = (req.query.page != undefined && req.query.page != 0) ? req.query.page : 1;
  // const limit = (req.query.limit != undefined && req.query.limit != 0) ? req.query.limit : 10;

  // let startValue;
  // let endValue;

  // if(page > 0){
  //   startValue = (page * limit) - limit; // 0, 10, 20, 30..
  //   endValue = page*limit;
  // }else{
  //   startValue = 0;
  //   endValue = 10;
  // }

});



router.post('/', async function(req, res, next) {
  try {
    console.log(req.body);
    res.json(await booksSvc.getBooksBySchoolAndClass(req.body));
  } catch (err) {
    console.error(`Error while getting Books`, err.message);
    next(err);
  }

});



module.exports = router;
