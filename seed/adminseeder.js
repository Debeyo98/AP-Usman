const Admin = require('../models/admin')
const mongoose =  require('mongoose')
const bcrypt = require('bcryptjs')



mongoose.connect("mongodb://localhost/apusmanfoundation", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((response) => {
    console.log("AP Usman Foundation database connected successfully");
}).catch((error) => {
    console.log(error);
});

const admin = new Admin({
    username:"Debyo",
    password: "1234abcd"
})

bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(admin.password, salt, (err, hash)=>{
        if (err){
            throw err
        }
        admin.password = hash
        admin.save().then((admin)=>{
            console.log('admin saved')
        }).catch(err=>console.log(err))
    })
})