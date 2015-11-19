var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('admin/partTimeJob/frame', { title: 'Part Time Job Page' });
});

router.get('/:crud', function(req, res, next) {
  res.render('admin/partTimeJob/' + req.params.crud, { title: 'Part Time Job Page' });
});

module.exports = router;
