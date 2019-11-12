const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Folder = require('../models/folder');



router.post('/register', (req, res, next)=> {
    Folder.find({ folder_name: req.body.folder_name})
    .exec()
    .then(result => {
        if (result.length >= 1) {
            return res.status(409).json({
                message: 'folder already exists'
            });
        } else {
            const folder = new Folder ({
                _id: new mongoose.Types.ObjectId(),
                folder_name: req.body.folder_name
            });

            folder.save()
            .then(result => {
                console.log(result)
                res.status(201).json({
                    message: 'succesfully registered'
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({
                    error: err
                });
            })
        }
    })
});


router.get('/:folderId', (req, res, next) => {
    const folder = req.params.folderId;
    Folder.find({ _id: folder })
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/', (req, res, next) => {
    Folder.find({})
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

module.exports = router