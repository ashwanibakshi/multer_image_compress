const userModel    = require('../model/userSchema');
const {getName}    = require('../_helper/imagename');
const {compressImage} = require('../_helper/compressimage');
const path          = require('path');


module.exports = {
    getProfile:(req,res)=>{
        try {
            userModel.findOne({'_id':req.params.id},(err,dataa)=>{
                if(err){
                    res.json({error:err.message});
                }
                else{
                    res.json({data:dataa});
                }
            });        
        } catch (error) {
            res.json({error:error.message});
        }
      },
    postProfile:(req,res)=>{
        try {
            if(req.file){
            var fname = getName()
            let filepath = '/uploads/'+fname+path.extname(req.file.originalname); 

            let user  = new userModel({
               pic  : filepath,
               name : req.body.name,
            address : req.body.address
            });
            var pth = 'public/uploads/'+fname+path.extname(req.file.originalname);
           compressImage(pth);
            user.save((err,dataa)=>{
                if(err){
                    res.json({error:err.message});
                }
                else{
                    res.json({data:dataa,msg:'data saved'});
                }
            });
         }
         else{
             res.json({msg:"upload the image"});
         }
        } catch (error) {
            res.json({error:error.message});
        } 
    }
}