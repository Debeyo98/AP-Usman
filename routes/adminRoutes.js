const express = require("express");
const router = express.Router();
const Comment = require("../models/comment")
const comments = Comment.find({});


router.get('/allComments', (req,res)=>{
    comments.exec((err, comments) => {
        if (err) {
            throw err;
        } else {
            console.log(comments);
        }
        res.render("admin/allComments", {
            comments
        })
    })
})



module.exports = router

