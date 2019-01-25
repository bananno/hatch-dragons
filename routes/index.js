var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', showHomePage);
router.get('/login', showLogin);

function authenticate(req, res, next, callback) {
  User.findById(req.session.userId, (error, user) => {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        res.redirect('login');
      } else {
        callback(user);
      }
    }
  });
}

function showHomePage(req, res, next) {
  authenticate(req, res, next, (user) => {
    res.render('layout', {
      view: 'index',
      user: user,
    });
  });
};

function showLogin(req, res, next) {
  res.render('layout', {
    view: 'login',
    user: null,
  });
};

module.exports = router;
