const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
const Image = require('../models/images');
const multer = require('multer');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: "dk1qehn2l",
    api_key: "171923673547221",
    api_secret: "Tsuf_KdVEMHIfT95k0Wm-10S694"
});


const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder:'Images',
    allowedFormats: ["jpg", "png", "svg"],
    transformation: [{ width: 500, height: 500}]
});

const parser = multer({ storage: storage})

router.post('/post',parser.single('image_url'), (req, res, next) => {
    const Images = new Image({
        _id: new mongoose.Types.ObjectId(),
        image_url: req.file.url,
        folder_id:req.body.folder_id
    });
    Images.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Registered successfully'
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

router.get('/', (req, res, next)=> {
     Image.find({})
     .exec()
     .then(display => {
         console.log(display);
         res.status(200).json(display);
     })
     .catch(error => {
         console.log(error);
         res.status(500).json({ error: error})
     })
});

router.get('/:folder_id', (req, res, next) => {
    const folderID = req.params.folder_id;
    Image.find({ folder_id: folderID})
    .exec()
    .then(display => {
        console.log(display);
        res.status(200).json(display);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

module.exports = router;