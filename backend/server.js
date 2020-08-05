const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser:true , useCreateIndex:true, useUnifiedTopology: true });

//connect to MongoDB
const db = mongoose.connection;
db.once('open', ()=> {
    console.log("Database connected!")
})
 

const bugsRouter = require('./routes/bugs');
const designBoardRouter = require ('./routes/design-board');
const feedbackRouter = require ('./routes/feedback');
const usersRouter = require ('./routes/users');
 
//use routes 
app.use('/bugs', bugsRouter);
app.use('/designboard', designBoardRouter);
app.use('/feedback', feedbackRouter);
app.use('/users', usersRouter)

// 
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('/build'))
}

app.listen(port, () =>{
    console.log("Listening on port:" + port)
})

module.exports = db;
