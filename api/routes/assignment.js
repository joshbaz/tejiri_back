const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Assignment = require('../models/assignment');



router.post('/register', (req, res, next) => {
    
                const assignment = new Assignment({
                    _id: new mongoose.Types.ObjectId(),
                    folder_id: req.body.folder_id,
                    user_id: req.body.user_id
                });

                assignment.save()
                    .then(result => {
                        console.log(result)
                        res.status(201).json({
                            message: 'succesfully registered'
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({
                            error: error
                        });
                    })
            
    
                });


router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    Assignment.find({ userId: id })
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
    Assignment.find({})
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