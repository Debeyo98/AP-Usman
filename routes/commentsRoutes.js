const express = require("express");
const router = express.Router();
const Comment = require("../models/comment")


router.get('/delete/:commentId', (req,res)=>{
    Comment.findByIdAndRemove(req.params.commentId)
        .then(deletedComment => {
            console.log(deletedComment);
            res.redirect("/admin/allComments")
        })
        .catch(err => console.log(err))
})

router.get('/approve/:commentId', (req,res)=>{
    Comment.findOne({_id: req.params.commentId})
        .then(comment => {
            console.log(comment);
            comment.approved = true;
            comment.save();
            res.redirect("/admin/allComments")
        })
        .catch(err => console.log(err))
})


module.exports = router

