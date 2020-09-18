const express = require("express");
const router = express.Router();
const comment = require("../models/comment");
const comments = comment.find({});

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