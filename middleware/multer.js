const multer      = require('multer');
const path        = require('path');
const {uuid}      = require('uuidv4');
const {setName}   = require('../_helper/imagename');


const storage = multer.diskStorage({
      destination:(req,file,cb)=>{
         cb(null,'public/uploads'); 
      },
      filename:(req,file,cb)=>{
        var fname = file.fieldname+uuid();
         setName(fname);
        cb(null,fname+path.extname(file.originalname)); 
      }                
});

const upload = multer({
    storage:storage,
    fileFilter:(req, file, callback)=>{
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      callback(null,false)
     return callback(new Error('upload the jpeg/png image. '));
    }
    else{
    callback(null, true)
     }
    },
    limits:{
     fileSize: 1024 * 1024
    }
   }).single('pic');
 
   var multermidware = function makeMulterUploadMiddleware(uploads){
    return (req, res, next) =>
    uploads(req, res, function (err) {
     // handle Multer error
     if (err && err.name && err.name === 'MulterError') {
      return res.status(500).send({
          error: err.name,
          message: `File upload error: ${err.message}`,
      });
  }
        // handle other errors
        if (err) {
          console.log(err.message);
            return res.status(500).send({
                error: 'FILE UPLOAD ERROR',
                message: err.message,
            });
        }
  
            next();
          });
        }

  module.exports ={
    upload,
    multermidware
  }