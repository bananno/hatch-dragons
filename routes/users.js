const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/login', showLogin);
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/logout', logoutUser);

function showLogin(req, res, next) {
  res.render('layout', {
    view: 'login',
    currentUser: null,
  });
};

function loginUser(req, res, next) {
  let username = req.body.loginUsername;
  let password = req.body.loginPassword;

  if (username && password) {
    User.authenticate(username, password, (error, user) => {
      if (error || !user) {
        var err = new Error('Wrong username or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
  } else {
    var err = new Error('All fields are required.');
    err.status = 400;
    return next(err);
  }
}

function signupUser(req, res, next) {
  var userData = {
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  };

  if (userData.password !== userData.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send('Passwords do not match.');
    return next(err);
  }

  if (req.body.username && req.body.password && req.body.passwordConf) {
    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
  } else {
    var err = new Error('All fields are required.');
    err.status = 400;
    return next(err);
  }
}

function logoutUser(req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
}

module.exports = router;
