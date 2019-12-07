const Assignment = require('../models/assignment');
const mongoose = require('mongoose');

exports.registerAssignment = (req, res, next) => {

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


}

exports.getAssignmentByUserID = (req, res, next) => {
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
}

exports.getAllAssignments = (req, res, next) => {
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
}