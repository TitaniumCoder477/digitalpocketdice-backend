const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const saltRounds = 10;

router.get('/', (req, res, next) => {
    User.find()
        .select('_id email')
        .exec()
        .then(users => {
            console.log(users);
            const response = {
                count: users.length,
                users: users
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.get('/:username/:password', (req, res, next) => {
    const id = req.params.username
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        User.findById(id)
            .select('_id passwordHash')
            .exec()
            .then(doc => {
                console.log(doc);
                if(doc.passwordHash === hash) {
                    console.log("User authenticated: ", doc);
                    res.status(200).json({
                        message: "User authenticated.",
                        id: doc._id,
                        email: doc.email
                    })
                } else {
                    res.status(401).json({
                        message: "User not found or not authenticated."
                    })
                }
            })
            .catch(err => {
                console.log(err)
                if(err.name === 'MongoError' && err.code === 11000) {
                    res.status(409).json({
                        message: "Username already in use.",
                        username: user._id
                    })
                } else {
                    res.status(500).json({
                        message: "We encountered a problem creating the account.",
                        code: err.code
                    })
                }
            });
    });
});

router.get('/:username', (req, res, next) => {
    const id = req.params.username;
    User.findById(id)
        .select('_id email')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid record with that ID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

//
//function b64EncodeUnicode(str) {
//    return Buffer.from(str, 'binary').toString('base64')
//}
//
//function b64DecodeUnicode(str) {
//    return Buffer.from(str, 'base64').toString('binary')
//}
//
//const attachmentsToArray = obj => {
//    var arrayOfAttachments = new Array();
//    obj.forEach(attachmentMap => {
//        const keys = Object.keys(attachmentMap);
//        const map = new Map();
//        for(let i = 0; i < keys.length; i++) {
//            map.set(keys[i], attachmentMap[keys[i]]);
//        }
//        arrayOfAttachments.push(map);
//    });
//    return arrayOfAttachments;
//};

router.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const user = new User({
            _id: req.body.username,
            email: req.body.email,
            passwordHash: hash
        });
        user.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "User created.",
                    createdUser: {
                        id: result._id,
                        email: result.email,
                        request: {
                            type: 'GET',
                            description: "Get this user",
                            url: "http://localhost:8081/users/" + result._id
                        }
                    }
                })
            })
            .catch(err => {
                console.log(err)
                if(err.name === 'MongoError' && err.code === 11000) {
                    res.status(409).json({
                        message: "Username already in use.",
                        username: user._id
                    })
                } else {
                    res.status(500).json({
                        message: "We encountered a problem creating the account.",
                        code: err.code
                    })
                }
            });
    });
});

router.patch('/:username', (req, res, next) => {
    if(req.body.password) {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

        });
    }


    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const user = new User({
            _id: req.body.username,
            email: req.body.email,
            passwordHash: hash
        });
        user.save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "User created.",
                    createdUser: user
                })
            })
            .catch(err => {
                console.log(err)
                if(err.name === 'MongoError' && err.code === 11000) {
                    res.status(409).json({
                        message: "Username already in use.",
                        username: user._id
                    })
                } else {
                    res.status(500).json({
                        message: "We encountered a problem creating the account.",
                        code: err.code
                    })
                }
            });
    });
});



router.delete('/:username', (req, res, next) => {
    const id = req.params.username;
    User.remove({ _id: id })
        .exec()
        .then(result => {
            console.log("From database", result);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'No valid record with that ID' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});


module.exports = router;
