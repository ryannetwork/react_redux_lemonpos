const mongoose =require('mongoose');
const demoSchema =mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
name:String,
price:Number
});
 module.exports =mongoose.model('demo',demoSchema);