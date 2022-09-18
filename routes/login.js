const router = require("express").Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const RegistrationModel = require("../models/registration");
const { RoleModel } = require("../models/role");

//api for login
router.post("/login",async (req,res)=>{

    try {
        let role = await RoleModel.findOne({name:req.body.role});
        let user = await RegistrationModel.findOne({email : req.body.email,password : req.body.password,role:role});
        if(user){
            let token = jwt.sign({userID: user._id, role: req.body.role}, process.env.SECRET_KEY, {expiresIn: '2h'});
            res.send(token);
        }
        else{
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send(err);
    }
})

router.post('/bla',auth.isAuthorized,(req,res,next)=>{
    console.log("b");
    res.send("huo")
})

module.exports = router;