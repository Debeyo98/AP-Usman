const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const comments = Comment.find({});

router.get("/", (req, res, next) => {
    comments.exec((err, data) => {
        if (err) {
            throw err;
        } else {
            console.log(data);
        }
        res.render("index", {
            records: data
        })
    })
});






module.exports = router;