const express = require('express');
const router =express.Router();
const mongoose =require('mongoose');
 const _demo=require('../models/demo');
const demoController = require('../controller/demoController');

router.get('/',(req,res,next)=>{
    demoController.find((err ,doc)=>{
      if(err){
          res.json({
              error:err
          });
      }else{
          res.json(doc);
      }
    });
    
   
});

// router.get('/',(req,res,next)=>{
//     _demo.find()
//     .exec()
//     .then(doc=>{
//         res.status(200).json(doc);
//     }).catch(err=>{
//         res.status(500).json({
//             error:err
//         });
//     });
   
// });

// router.delete('/:demoId',(req,res,next)=>{
//     const Id=req.params.demoId;
//     _demo.remove({_id:Id})
//     .exec()
//     .then(result=>{
//         res.status(200).json(result);
//     }).catch(err=>{
//         res.status(500).json({
//             error:err
//         });
//     });
// });

// router.get('/:demoId',(req,res,next)=>{
//     const Id=req.params.demoId;
//     _demo.findById(Id)
//     .exec()
//     .then(doc=>{
//         res.status(200).json(doc);
//     }).catch(err=>{
//         res.status(500).json({
//             error:err
//         });
//     });
   
// });
router.get('/:demoId',(req,res,next)=>{
    const Id=req.params.demoId;
    demoController.findById(Id,(err,doc)=>{
      if(err){
          res.json({error:err})
      }else {
          res.json(doc)
      }
    });
    
   
});

// router.post('/',(req,res,next)=>{
//     const demoData = new _demo({
//         _id:new mongoose.Types.ObjectId(),
//         name:req.body.name,
//         price:req.body.price
//     });
//     demoData.save().then(result=>{
//      console.log(result);
//      res.status(200).json({
//         message:'Demo has been created',
//         demo:result
//     });
//     }).catch(err=>{
//         console.log(err);
//         res.status(500).json({
//             error:err
//         });
//     });
    
// });

router.delete('/:demoId',(req,res,next)=>{
    const Id=req.params.demoId;
    demoController.delete(Id,(err,data)=>{
        if(err){
            res.json({error:err});
        }else {
            res.json(data)
        }
    })
    
});
router.post('/',(req,res,next)=>{
    const demoData = new _demo({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    });
    demoController.post(demoData,(err,data)=>{
        if(err){
            res.json({error:err});
        }else {

            res.json(data)
        }
    })
    
});
module.exports =router;