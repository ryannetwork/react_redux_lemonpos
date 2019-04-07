const _clsItemSKU = require('../models/clsItemSKU');

module.exports={
    find:(callBack)=>{
        _clsItemSKU.find().exec()
     .then(doc=>{
        callBack(null,doc);
     }).catch(err=>{
        callBack(err,null);
      });
    },
    findById:(Id, callBack)=>{
        _clsItemSKU.findById(Id).exec().then((doc)=>{
           callBack(null,doc);
        }).catch(err=>{
            callBack(err,null);
        });
       },
    post:(params, callBack)=>{
        _clsItemSKU.create(params).then(n=>{
            callBack(null,n);
        }).catch(err=>{
            callBack(err,null);
        });
        
    },
    update:(Id,params,callBack)=>{
      _clsItemSKU.updateOne({_id:Id},params).exec().then(n=>{
          callBack(null,n);
      }).catch(err=>{
          callBack(err,null);
      });
    },
    delete:(Id,callBack)=>{
        _clsItemSKU.deleteOne({_id:Id}).exec().then(n=>{
        callBack(null,n);
    }).catch(err=>{
        callBack(err,null);
    });
    
    }
        
       
   
};