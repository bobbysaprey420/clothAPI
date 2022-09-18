const express = require('express');
const router = express.Router();
const { isAuthorized, validId, permission } = require('../middleware/auth')
const ClothModel = require('../models/cloth')
const { CategoryModel } = require('../models/category')
const { ImageModel } = require('../models/image');
const mongoose = require('mongoose');

//fetching all clothes
router.get('/', isAuthorized, async (req, res) => {
    try {
        let data = await ClothModel.find();
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    }
})

//adding a new cloth
router.post('/', [isAuthorized, permission], async (req, res) => {
    try {
        let category = await CategoryModel.findOne({ name: req.body.type });
        let base64_image = Buffer.from(req.files.image.data).toString('base64')
        let image = new ImageModel({ name: req.files.image.name, data: base64_image });
        req.body.type = category;
        req.body.image = image;
        let cloth = new ClothModel(req.body);
        await cloth.save();
        res.status(201).send('Saved successfully');
    } catch (error) {
        res.status(500).send(error);
    }
})

//update a cloth
router.put('/:id', [isAuthorized, validId, permission], async (req, res) => {
    try {
        const cloth = await ClothModel.findById(req.params.id).exec();
        if (!cloth) return res.status(404).send('The cloth with the given ID was not found.');
        for (let key in req.body) {
            if (cloth[key] && cloth[key] !== req.body[key]){
                if(key === 'type'){
                    let category = await CategoryModel.findOne({ name: req.body.type });
                    cloth.type = category;
                }
                else{
                    cloth[key]=req.body[key];
                }
            }
        }
        await ClothModel.findByIdAndUpdate(req.params.id,cloth).exec();
        res.status(200).send('updated successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete a cloth by id
router.delete('/:id', [isAuthorized, validId, permission], async (req, res) => {
    try {
        const cloth = await ClothModel.findById(req.params.id).exec();
        if (!cloth) return res.status(404).send('The cloth with the given ID was not found.');
        await ClothModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).send('Deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;