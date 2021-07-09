const {check,validationResult}  = require('express-validator');
const fs = require("fs");

validation={
    profile:[
        check('name').exists().withMessage('name cant be empty'),
        check('address').exists().withMessage('address cant be empty')
    ]
}


handleValidationErrors = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      if(req.file){
        console.log(req.file);
        fs.unlinkSync(req.file.path);
      }
    res.status(404).json({error:errors.array()});
    }
    else{
        next();
    }
  }


  module.exports = {
      validation,
      handleValidationErrors
  }