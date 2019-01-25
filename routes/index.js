const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Habitat = require('../models/habitat');
const Dragon = require('../models/dragon');

const habitatModels = require('../gameModels/habitats.js');
const dragonModels = require('../gameModels/dragons.js');

router.get('/', showHomePage);
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
      Dragon.find({ user: user }, (err, dragons) => {

        habitats.forEach(record => {
          record.model = habitatModels.filter(model => model.name == record.gameModel)[0];
        });

        dragons.forEach(record => {
          record.model = dragonModels.filter(model => model.name == record.gameModel)[0];
        });

        res.render('layout', {
          view: 'park',
          currentUser: user,
          habitats: habitats,
          dragons: dragons,
          habitatModels: habitatModels,
          dragonModels: dragonModels,
        });
      });
    });
  });
};

function buyHabitat(req, res, next) {
  authenticate(req, res, next, (user) => {
    let index = parseInt(req.params.habitatIndex);
    let model = habitatModels[index];

    let habitatData = {
      user: user,
      gameModel: model.name,
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
