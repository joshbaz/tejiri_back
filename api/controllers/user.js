const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');

exports.registerUser = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Email already exits'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            password: hash
                        });

                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'successfully registered'
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        });
}

exports.loginUser = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(userDetails => {
            if (userDetails.length < 1) {
                return res.status(401).json({
                    message: "AUTHENTIFICATION ERROR"
                });
            }

            //hashed password comparison
            bcrypt.compare(req.body.password, userDetails[0].password, (err, result) => {

                if (err) {
                    return res.status(401).json({
                        message: "AUTHENTIFICATION FAILED"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: userDetails[0].email,

                        _id: userDetails[0]._id
                    }, process.env.JWT_KEY,
                        {
                            expiresIn: "24h"
                        }
                    );

                    return res.status(200).json({
                        mesage: 'Auth successful',
                        token: token,
                        email: userDetails[0].email,
                        _id: userDetails[0]._id
                    });
                }

                //else statement for the if-result
                res.status(401).json({
                    message: 'Auth failed'
                });
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.getUserByID = (req, res, next) => {
    const id = req.params._id;
    User.find({ _id: id })
        .exec()
        .then(singleUser => {
            console.log(AllUsers);
            res.status(200).json(singleUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
}

exports.getAllUsers = (req, res, next) => {
    User.find({})
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