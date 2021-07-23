const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Signout success" });
});

module.exports = router;

  