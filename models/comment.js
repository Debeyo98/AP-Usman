const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    subject:{
        type: String
    },
    message:{
        type: String
    }
});

module.exports = comment = mongoose.model('comment', commentSchema);