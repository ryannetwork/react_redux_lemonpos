
//const http =require('http');
const express = require('express');
const app =express();
const http =require('http');
const morgan =require('morgan');
const bordParser =require('body-parser');
const appApi =require('./api/routes/index');
const mongoose =require('mongoose');
const socket =require('socket.io');
const connectionString ="mongodb+srv://lemoncloud:lemoncloud@lemontech-msxsz.mongodb.net/test?retryWrites=true";
mongoose.connect(connectionString,{useNewUrlParser:true});
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
const port =process.env.port || 3000;
const server =http.createServer(app);
const io =socket(server);
app.use((req,res,next)=>{
    req.socket=io;
    next();
});
app.use('/api/inventory/demo',appApi.demo);
app.use('/api/inventory/category',appApi.category);
app.use('/api/inventory/itemsku',appApi.itemsku);
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


const connections = [];
io.on("connection", socket => {
    connections.push(socket);
	socket.on('disconnect', function(){
		console.log('Disconnected - '+ socket.id);
    });
});
app.use(express.static('public'));
server.listen(port);