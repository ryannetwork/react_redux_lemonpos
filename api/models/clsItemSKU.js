const mongoose =require('mongoose');
const itemSKUSchema =mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
  skuCode: String,
  skuName: String,
  skuDesc: String,
  skuStatus: false,
  skuParent: [],
  chk:Boolean
});
 module.exports =mongoose.model('itemsku',itemSKUSchema);