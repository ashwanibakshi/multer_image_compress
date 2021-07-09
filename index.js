const express   = require('express');
const mongoose  = require('mongoose');
const connect   = require('./config/db').conn;
const path      = require('path');

const app  = express();

mongoose.connect(connect,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('connected to database'))
.catch((err)=>console.log('error in db connection',err));

app.use(express.static(path.resolve(__dirname,'public')));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api',require('./routes/userRoute'));

const port =  process.env.PORT || 3000;

app.listen(port,()=>{console.log(`server run at ${port}`)});