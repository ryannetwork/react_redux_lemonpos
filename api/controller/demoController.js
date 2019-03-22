const _demo = require('../models/demo');

module.exports={
    find:(calback)=>{
     _demo.find().exec()
     .then(doc=>{
         calback(null,doc);
     }).catch(err=>{
         calback(err,null);
      });
    },
    findByIs:(Id, calback)=>{
        _demo.findById(Id,(calback)=>{
           if(err){
               calback(err,null);
               return;
           }
           calback(null,result);
        });
       }
       
   
};