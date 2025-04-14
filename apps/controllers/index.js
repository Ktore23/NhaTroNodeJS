var express = require("express");
var router = express.Router();
const DatabaseConnection = require('../database/database');

router.use("/search", require(__dirname + "/searchcontroller"));
router.use("/post", require(__dirname + "/postcontroller"));
router.use("/contact", require(__dirname + "/contactcontroller"));
router.use("/about", require(__dirname + "/aboutcontroller"));
router.use("/help", require(__dirname + "/helpcontroller"));
router.use("/user", require(__dirname + "/usercontroller"));
router.use("/admin", require(__dirname + "/admin/admincontroller")); 

router.get("/", async (req, res) => {
    const client = DatabaseConnection.getMongoClient();
    try {
        await client.connect();
        const db = client.db('nhatro_db');
        const collection = db.collection('posts');
        
        const posts = await collection.find().toArray(); 

        res.render("index", { posts: posts });
    } catch (err) {
        res.render("index", { posts: [] }); 
    } finally {
        await client.close();
    }
});

module.exports = router;