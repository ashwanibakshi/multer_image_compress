const express           = require('express');
const router            = express.Router();
const userController    = require('../controllers/userController');
const {validation,
handleValidationErrors} = require('../middleware/validations');
const {upload,multermidware}= require('../middleware/multer');

router.get('/profile/:id',userController.getProfile);

router.post('/profile',multermidware(upload),validation.profile,handleValidationErrors,userController.postProfile);

module.exports = router;