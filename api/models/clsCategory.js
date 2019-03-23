const mongoose =require('mongoose');
const categorySchema =mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
  catCode: String,
  catDesc: String,
  catDesc2: String,
  catStatus: Boolean,
  catParent: Number,
  chk:Boolean
});
 module.exports =mongoose.model('category',categorySchema);
