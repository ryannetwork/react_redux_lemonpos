const app= require('../app');
const http =require('http');
const express = require('express');
const port =process.env.port || 3000;
const server =http.createServer(app);
const socket =require('socket.io');
const io =socket(server);
 module.exports = {app,express,port,server,socket,io};