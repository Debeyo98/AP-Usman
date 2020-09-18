//Bring in dependencies/Modules
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");
const Comment  = require('./models/comment');


// Define express function
const app = express();
const PORT = 7000;

// Configure mongoose to connect to database
mongoose.connect("mongodb://localhost/apusmanfoundation", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then( (response) => {
    console.log("AP Usman Foundation database connected successfully");
}).catch( (error) => {
    console.log(error);
});

//Configuring Express App 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//Cookie setup
app.use(cookieParser());

// Setup Flash and Session
app.use(session({
    secret: 'djnf;fhurhw8r42080ef,;;dfhdd;;BFIFHjfjBHFDFJMIR8;MF',
    saveUninitialized: false, //If set to true, this session will be saved 
    // on the server on each request no matter if something is changed or not.
    resave: false,
    cookie: { maxAge: Date.now() + 3600000 }
}));


// Configure logger
app.use(logger('dev'));
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_message = req.flash("success-message");
    res.locals.error_message = req.flash("error-message");
    res.locals.messages = require("express-messages")(req, res);
    res.locals.isAuthenticated = req.user ? true : false;
    res.locals.comment = req.message
    res.locals.user = req.user || null; 
    next()
});

//Configure EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




//Home route
const index = require("./routes/index");
app.use("/", index)
// app.get("/", async (req, res) => {
//     const comments  = await Comment.find();
//     console.log(comments);
//     // res.send("This is the homepage!!!!!!");
//     res.render("index.ejs", {comments:comments});
// }); 

app.post('/comment', (req, res) =>{
    let {
        name,
        email,
        subject,
        message
    } = req.body

    let newComment = new Comment({
        name,
        email,
        subject,
        message
    });

    newComment.save()
    .then(comment =>{
        req.flash("comment successfully created");
        console.log(comment);
    });

});


app.listen(PORT, () => {
    console.log(`Server started on port:::: ${PORT}`)
});