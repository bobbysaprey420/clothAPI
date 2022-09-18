const express = require('express');
const router = express.Router();
const RegistrationModel = require('../models/registration');
const { RoleModel } = require('../models/role');

//api for registration
router.post("/registration", async (req, res) => {
    try {
        let role = await RoleModel.findOne({name:req.body.role});
        let userExist = await RegistrationModel.findOne({email:req.body.email,role:role});
        if(userExist && userExist.email === req.body.email && userExist.role.name === req.body.role){
            res.status(409).send('Email already registered');
            return;
        }
        req.body.role=role; 
        const user = new RegistrationModel(req.body);
        await user.save();
        res.send('Hurray! Registration successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;