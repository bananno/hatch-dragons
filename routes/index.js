const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Habitat = require('../models/habitat');
const Dragon = require('../models/dragon');

const habitatModels = require('../client/src/gameModels/habitats.js');
const dragonModels = require('../client/src/gameModels/dragons.js');

router.get('/getData', getData);
router.post('/buyHabitat', buyHabitat);
router.post('/buyDragon', buyDragon);
router.post('/sellHabitat/:habitatId', sellHabitat);
router.post('/hatchDragon', hatchDragon);

function getData(req, res) {
  User.findById(req.session.userId, (error, user) => {
    if (error || user === null) {
      return res.send({ user: null });
    } else {
      Habitat.find({ user: user }, (err, habitats) => {
        Dragon.find({ user: user }, (err, dragons) => {
          return res.send({
            user: user,
            habitats: habitats,
            dragons: dragons,
          });
        });
      });
    }
  });
}

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

function buyHabitat(req, res, next) {
  authenticate(req, res, next, (user) => {
    let index = parseInt(req.body.habitatIndex);
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
    let index = parseInt(req.body.dragonIndex);
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

function hatchDragon(req, res, next) {
  let habitatId = req.body.habitat;
  let dragonId = req.body.dragon;

  authenticate(req, res, next, (user) => {
    Habitat.findById(habitatId, (err1, habitat) => {
      Dragon.findById(dragonId, (err2, dragon) => {
        if (err1 || err2) {
          return next(err1 || err2);
        } else if ('' + habitat.user != '' + user._id
            || '' + dragon.user != '' + user._id) {
          console.log('wrong user');
          return res.redirect('/');
        } else {
          let dragonData = {
            level: 1,
            habitat: habitat,
          };
          dragon.update(dragonData, (err, dragon) => {
            if (err) {
              return next(err);
            } else {
              return res.send('success');
            }
          });
        }
      });
    });
  });
}

module.exports = router;
