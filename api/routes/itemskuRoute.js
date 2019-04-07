const express = require('express');
const router =express.Router();
const mongoose =require('mongoose');
 const _clsItemSKU=require('../models/clsItemSKU');
const itemskuController = require('../controller/itemskuController');

router.get('/',(req,res,next)=>{
    itemskuController.find((err ,doc)=>{
      if(err){
          res.json({
              error:err
          });
      }else{
          res.json(doc);
      }
    });
    
   
});


router.get('/:itemSKUId',(req,res,next)=>{
    const Id=req.params.itemSKUId;
    itemskuController.findById(Id,(err,doc)=>{
      if(err){
          res.json({error:err});
      }else {
          res.json(doc);
      }
    });
    
   
});

router.delete('/:itemSKUId',(req,res,next)=>{
    const Id=req.params.itemSKUId;
    itemskuController.delete(Id,(err,data)=>{
        if(err){
            res.json({error:err});
        }else {
            req.socket.emit('deletedItemSKU',Id); 
            res.json(data);
        }
    });
    
});
router.put('/update',(req,res,next)=>{
    const objData = new _clsItemSKU({
        _id:req.body._id,
        skuCode: req.body.skuCode,
        skuName: req.body.skuName,
        skuDesc: req.body.skuDesc,
        skuStatus: req.body.skuStatus,
        skuParent: req.body.skuParent,
        chk:req.body.chk
    });
    itemskuController.update(req.body._id, objData,(err,data)=>{
        if(err){
            res.json({error:err});
        }else {
            req.socket.emit('updatedItemSKU',objData);
            res.json(data);
        }
    });
});
router.post('/create',(req,res,next)=>{
    const objData = new _clsItemSKU({
        _id:new mongoose.Types.ObjectId(),
        skuCode: req.body.skuCode,
        skuName: req.body.skuName,
        skuDesc: req.body.skuDesc,
        skuStatus: req.body.skuStatus,
        skuParent: req.body.skuParent,
        chk:req.body.chk
    });
    itemskuController.post(objData,(err,data)=>{
        if(err){
            res.json({error:err});
        }else {
            req.socket.emit('createdItemSKU',objData);
            res.json(data);
        }
    });
});
module.exports =router;