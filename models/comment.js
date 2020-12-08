const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    message:{
        type: String 
    },
    approved: {
        type: Boolean,
        default: false
    },

    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = Comment = mongoose.model('comment', commentSchema);