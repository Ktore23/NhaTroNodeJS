const express = require('express');
const router = express.Router();
const DatabaseConnection = require('../database/database');

// Trang liên hệ (GET)
router.get('/', (req, res) => {
    res.render('contact', { error: null, success: null });
});

// Xử lý gửi thông tin liên hệ (POST)
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    const client = DatabaseConnection.getMongoClient();

    try {
        await client.connect();
        const db = client.db('nhatro_db');
        const contactsCollection = db.collection('contacts');

        // Kiểm tra dữ liệu đầu vào
        if (!name || !email || !message) {
            return res.render('contact', { error: 'Vui lòng điền đầy đủ thông tin', success: null });
        }

        // Lưu thông tin liên hệ vào MongoDB
        const contact = {
            name,
            email,
            message,
            createdAt: new Date()
        };
        await contactsCollection.insertOne(contact);

        res.render('contact', { error: null, success: 'Gửi thông tin liên hệ thành công!' });
    } catch (err) {
        console.error('Contact error:', err);
        res.render('contact', { error: 'Lỗi khi gửi thông tin liên hệ', success: null });
    } finally {
        await client.close();
    }
});

module.exports = router;