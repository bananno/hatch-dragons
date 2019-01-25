const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/getCurrentUser', getCurrentUser);
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/logout', logoutUser);

function getCurrentUser(req, res, next) {
  User.findById(req.session.userId, (error, user) => {
    if (error || user === null) {
      return res.send({ user: null });
    } else {
      return res.send({ user: user });
    }
  });
}

function loginUser(req, res, next) {
  let username = req.body.loginUsername;
  let password = req.body.loginPassword;

  if (username && password) {
    User.authenticate(username, password, (error, user) => {
      if (error || !user) {
        return res.send('Wrong username or password.');
      } else {
        req.session.userId = user._id;
        return res.send({ user: user });
      }
    });
  } else {
    return res.send('All fields are required.');
  }
}

function signupUser(req, res, next) {
  var userData = {
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
  };

  if (userData.password !== userData.passwordConf) {
    return res.send('Passwords do not match.');
  }

  if (req.body.username && req.body.password && req.body.passwordConf) {
    User.create(userData, function (error, user) {
      if (error) {
        return res.send('ERROR: ' + error);
      } else {
        req.session.userId = user._id;
        return res.send({ user: user });
      }
    });
  } else {
    return res.send('All fields are required.');
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
