const _demo = require('../models/demo');

module.exports={
    find:(callBack)=>{
     _demo.find().exec()
     .then(doc=>{
        callBack(null,doc);
     }).catch(err=>{
        callBack(err,null);
      });
    },
    findById:(Id, callBack)=>{
        _demo.findById(Id).exec().then((doc)=>{
           callBack(null,doc)
        }).catch(err=>{
            callBack(err,null)
        })
       },
    post:(params, callBack)=>{
        _demo.create(params).then(n=>{
            callBack(null,n)
        }).catch(err=>{
            callBack(err,null)
        })
        
    },
    delete:(Id,callBack)=>{
    _demo.deleteOne({_id:Id}).exec().then(n=>{
        callBack(null,n)
    }).catch(err=>{
        callBack(err,null)
    })
    
    }
        
    
       
   
};