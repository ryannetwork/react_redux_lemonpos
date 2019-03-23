const _clsCategory = require('../models/clsCategory');

module.exports={
    find:(callBack)=>{
        _clsCategory.find().exec()
     .then(doc=>{
        callBack(null,doc);
     }).catch(err=>{
        callBack(err,null);
      });
    },
    findById:(Id, callBack)=>{
        _clsCategory.findById(Id).exec().then((doc)=>{
           callBack(null,doc)
        }).catch(err=>{
            callBack(err,null)
        })
       },
    post:(params, callBack)=>{
        _clsCategory.create(params).then(n=>{
            callBack(null,n)
        }).catch(err=>{
            callBack(err,null)
        })
        
    },
    delete:(Id,callBack)=>{
        _clsCategory.deleteOne({_id:Id}).exec().then(n=>{
        callBack(null,n)
    }).catch(err=>{
        callBack(err,null)
    })
    
    }
        
       
   
};