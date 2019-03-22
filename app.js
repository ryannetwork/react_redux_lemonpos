const express = require('express');
const app =express();
const morgan =require('morgan');
const bordParser =require('body-parser');
const demoApi =require('./api/routes/demo');
const mongoose =require('mongoose');
mongoose.connect('mongodb+srv://lemoncloud:lemoncloud@lemontech-msxsz.mongodb.net/test?retryWrites=true',{useNewUrlParser:true});
app.use(morgan('dev'));
app.use(bordParser.urlencoded({extended:false}));
app.use(bordParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/demo',demoApi);

app.use((req,res,next)=>{
 const error = new Error("Not api Found");
 error.status=404;
 next();
});
app.use((error,req,res,next)=>{
res.status(error.status || 500);
res.json({
error :{
    message:error.message
}
});
});
module.exports =app;