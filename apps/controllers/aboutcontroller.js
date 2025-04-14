const express = require('express');
const router = express.Router();

// Trang giới thiệu (GET)
router.get('/', (req, res) => {
    res.render('about');
});

module.exports = router;