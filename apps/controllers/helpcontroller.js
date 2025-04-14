const express = require('express');
const router = express.Router();

// Trang hướng dẫn (GET)
router.get('/', (req, res) => {
    res.render('help');
});

module.exports = router;