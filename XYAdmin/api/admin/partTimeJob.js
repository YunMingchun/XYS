/**
 * Created by ymc on 11/18/15.
 */

var express = require('express');
var router = express.Router();
var mongodb = require('../../models/db');
var ObjectId = require('mongodb').ObjectID;

/* GET Part Time Job List page. */
router.post('/add.json', function(req, res, next) {
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

module.exports = router;
