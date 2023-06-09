const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/comment', require('./comment'));
router.use('/objective', require('./objective'));
router.use('/bookshelf', require('./bookshelf'));

router.use(function(err, req, res, next){
    if(err.name === "ValidationError"){
      return res.status(422).json({
        errors: Object.keys(err.errors).reduce(function(errors, key){
          errors[key] = err.errors[key].message;  
          return errors;
        }, {})
      });
    }
    return next(err);
});

module.exports = router;