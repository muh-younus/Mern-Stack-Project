const {body,validationResult} = require('express-validator');

async function validateResult(req,res,next){
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            erros: errors.array()
        })
    }

    next()

}

const registerUserValidationRules = [
    body('username')
    .isString()
    .withMessage("username must be a string")
    .isLength({min:3,max:20})
    .withMessage("user be between 3 and 20 character"),
    body('email')
    .isEmail()
    .withMessage("invalid email"),
    body('password')
    .isLength({min:6})
    .withMessage("password must contain atleast 6 character"),
    


    validateResult
]

module.exports = registerUserValidationRules