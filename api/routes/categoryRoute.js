const express = require('express');
const router =express.Router();
const mongoose =require('mongoose');
 const _lsCategory=require('../models/clsCategory');
const categoryController = require('../controller/categoryController');

router.get('/',(req,res,next)=>{
    categoryController.find((err ,doc)=>{
      if(err){
          res.json({
              error:err
          });
      }else{
          res.json(doc);
      }
    });
    
   
});


router.get('/:categoryId',(req,res,next)=>{
    const Id=req.params.categoryId;
    categoryController.findById(Id,(err,doc)=>{
      if(err){
          res.json({error:err})
      }else {
          res.json(doc)
      }
    });
    
   
});

router.delete('/:categoryId',(req,res,next)=>{
    const Id=req.params.categoryId;
    categoryController.delete(Id,(err,data)=>{
        if(err){
            res.json({error:err});
        }else {
            res.json(data)
        }
    })
    
});
router.post('/',(req,res,next)=>{
    const objData = new _lsCategory({
        _id:new mongoose.Types.ObjectId(),
        catCode: req.body.catCode,
        catDesc: req.body.catDesc,
        catDesc2: req.body.catDesc2,
        catStatus: req.body.catStatus,
        catParent: req.body.catParent,
        chk:req.body.chk
    });
    categoryController.post(objData,(err,data)=>{
        if(err){
            res.json({error:err});
        }else {

            res.json(data)
        }
    })
    
});
module.exports =router;