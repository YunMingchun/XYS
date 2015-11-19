/**
 * Created by ymc on 11/18/15.
 */

var express = require('express');
var router = express.Router();
var mongodb = require('../../models/db');
var ObjectId = require('mongodb').ObjectID;

router.post('/add.json', function(req, res, next) {
    var userId = req.body.userId;
    mongodb.open(function (err, db) {
        db.collection('partTimeJobs', function (err, collection) {
            collection.insert(req.body, function (err, result) {
                mongodb.close();
                res.json({
                    status: 0,
                    id: result.insertedIds[0]
                });
            });
        });
    });
});

router.get('/list.json', function(req, res ,next) {
    var userId = req.query.userId;
    mongodb.open(function(err, db){
        db.collection('partTimeJobs', function(err, collection){
            collection.find().toArray(function(err, docs){
                mongodb.close();
                res.json({
                    status: 0,
                    list: docs
                });
            });
        });
    });
});

router.get('/item.json', function(req, res ,next) {
    var userId = req.query.userId;
    mongodb.open(function(err, db){
        db.collection('partTimeJobs', function(err, collection){
            collection.findOne({
                _id: ObjectId(req.query.itemId)
            }, function(err, item){
                mongodb.close();
                res.json({
                    status: 0,
                    item: item
                });
            });
        });
    });
});

router.post('/update.json', function(req, res ,next) {
    var userId = req.body.userId;
    mongodb.open(function(err, db){
        db.collection('partTimeJobs', function(err, collection){
            collection.findOneAndUpdate({
                _id: ObjectId(req.body.itemId)
            }, req.body, function(err, result){
                mongodb.close();
                res.json({
                    status: 0
                });
            });
        });
    });
});

router.post('/delete.json', function(req, res ,next) {
    var userId = req.body.userId;
    mongodb.open(function(err, db){
        db.collection('partTimeJobs', function(err, collection){
            collection.findOneAndDelete({
                _id: ObjectId(req.body.itemId)
            }, function(err, result){
                mongodb.close();
                res.json({
                    status: 0
                });
            });
        });
    });
});

module.exports = router;
