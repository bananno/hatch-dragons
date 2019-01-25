var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Habitat = require('../models/habitat');

router.get('/', showHomePage);
router.get('/login', showLogin);
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/logout', logoutUser);
router.post('/buyHabitat', buyHabitat);
router.post('/sellHabitat/:habitatId', sellHabitat);

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
    Habitat.find({ user: user }, (err, habitats) => {
      res.render('layout', {
        view: 'index',
        currentUser: user,
        habitats: habitats,
      });
    });
  });
};

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

function buyHabitat(req, res, next) {
  authenticate(req, res, next, (user) => {
    let habitatData = {
      user: user,
      name: 'Plant'
    };

    Habitat.create(habitatData, (error, habitat) => {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/');
      }
    });
  });
}

function sellHabitat(req, res, next) {
  authenticate(req, res, next, (user) => {
    let habitatData = {
      _id: req.params.habitatId,
      user: user
    };

    Habitat.find(habitatData, (error, habitat) => {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/');
      }
    });

  });
}

module.exports = router;
