const http =require('http');
const app= require('./app');
const express = require('express');
const port =process.env.port || 3000;
const server =http.createServer(app);
app.use(express.static('public'));
server.listen(port);