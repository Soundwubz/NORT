const mongoose = require('mongoose');
const router = require("express").Router();
const db = require('../../models');

// Matches "/api/game/time"
router.route('/time').post(
    (req, res, next) => {
        const {userId, time, difficulty} = req.body;
        if(!userId || !time || !difficulty) {
            res.send({
                success: false,
                message: "Error: property of req body missing",
                reqBody: {
                    userId: userId,
                    time: time,
                    difficulty: difficulty
                }
            });
        }
        db.TopTime.findOne({userId: userId, difficulty: difficulty}, (err, topTime) => {
            if(err) {
                res.send({
                    success: false,
                    message: "Server Error",
                    error: err
                });
            }
            console.log('topTime:');
            console.log(topTime);
            // user already has top time for this difficulty
            if(topTime !== null) {
                db.TopTime.update({_id: topTime._id}, {
                    $set: {
                        time: time
                    }
                }, (err, newTime) => {
                    if(err) {
                        res.send({
                            success: false,
                            message: "Server Error",
                            error: err
                        });
                    } else {
                        res.send({
                            success: true,
                            newTime: JSON.stringify(newTime)
                        });
                    }
                });
            } else {
                // no top time for this difficulty
                const newTime = new db.TopTime();
                newTime.userId = userId;
                newTime.time = time;
                newTime.difficulty = difficulty;
                newTime.save((err, doc) => {
                    if(err) {
                        res.send({
                            success: false,
                            message: "Server Error",
                            error: err
                        });
                    }
                    res.send({
                        success: true,
                        newTime: JSON.stringify(doc)
                    })
                })
            }
        })
    }
)

module.exports = router;