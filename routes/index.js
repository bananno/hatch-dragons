const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Habitat = require('../models/habitat');
const Dragon = require('../models/dragon');

const habitatModels = require('../gameModels/habitats.js');
const dragonModels = require('../gameModels/dragons.js');

router.get('/', showHomePage);
router.get('/login', showLogin);
router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/logout', logoutUser);
router.post('/buyHabitat/:habitatIndex', buyHabitat);
router.post('/buyDragon/:dragonIndex/incubate', buyDragon);
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

      habitats.forEach(thisHab => {
        thisHab.model = habitatModels.filter(mod => mod.name == thisHab.name)[0];
      });

      res.render('layout', {
        view: 'index',
        currentUser: user,
        habitats: habitats,
        habitatModels: habitatModels,
        dragonModels: dragonModels,
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
    let index = parseInt(req.params.habitatIndex);
    let model = habitatModels[index];

    let habitatData = {
      user: user,
      name: model.name
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

function buyDragon(req, res, next) {
  authenticate(req, res, next, (user) => {
    let index = parseInt(req.params.dragonIndex);
    let model = dragonModels[index];

    let dragonData = {
      user: user,
      habitat: null,
      gameModel: model.name,
      level: 0,
    };

    Dragon.create(dragonData, (error, habitat) => {
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

    Habitat.deleteOne(habitatData, error => {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/');
      }
    });

  });
}

module.exports = router;
