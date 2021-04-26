const express=require('express')
const app=express();
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const dotenv=require('dotenv')
dotenv.config();
const userRouter=require('./routes/user')
const pictureRouter=require('./routes/picture')
const jwt=require('jsonwebtoken')
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter)
app.use('/picture',pictureRouter)

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    usenifiedTopolUogy: true
}

mongoose.connect(process.env.DB_CONNECT,connectionParams)
.then(()=>{
console.log('connect')
})
.catch((err)=>{
console.log(err)
})
app.listen(9000,()=>{
    console.log('listen port 9000')

})