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
router.post('/sellHabitat', sellHabitat);
router.post('/placeDragon', placeDragon);
router.post('/sellDragon', sellDragon);

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

    let ts = new Date().getTime();

    let dragonData = {
      user: user,
      habitat: null,
      gameModel: model.name,
      level: 0,
      timestamp: ts,
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
    let habitatId = req.body.habitatId;

    let habitatData = {
      _id: habitatId,
      user: user
    };

    Dragon.find({ habitat: habitatId}, (error, dragons) => {
      if (dragons.length == 0) {
        Habitat.deleteOne(habitatData, error => {
          if (error) {
            return next(error);
          } else {
            return res.redirect('/');
          }
        });
      } else {
        console.log('Cannot delete habitat that houses dragons.');
      }
    });
  });
}

function placeDragon(req, res, next) {
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
          let habitatModel = findModel('habitat', habitat);
          let dragonModel = findModel('dragon', dragon);

          if (!elementsOverlap(habitatModel, dragonModel)) {
            return;
          }

          let dragonData = {
            habitat: habitat,
          };

          if (dragon.level == 0) {
            let now = new Date().getTime();
            let secondsRequired = dragonModel.eggTime[2] + (dragonModel.eggTime[1] * 60)
              + (dragonModel.eggTime[0] * 60 * 60);
            let secondsElapsed = Math.round((now - dragon.timestamp)/1000);

            if (secondsElapsed < secondsRequired) {
              return;
            }

            dragonData.level = 1;
          }

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

function sellDragon(req, res, next) {
  authenticate(req, res, next, (user) => {
    let dragonData = {
      _id: req.body.dragonId,
      user: user
    };

    Dragon.deleteOne(dragonData, error => {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/');
      }
    });
  });
}

function findModel(type, item) {
  let models = type === 'habitat' ? habitatModels : dragonModels;
  let modelName = item.gameModel;

  return models.filter(model => {
    return model.name === modelName;
  })[0];
}

function elementsOverlap(model1, model2) {
  for (let i in model1.elements) {
    for (let j in model2.elements) {
      if (model1.elements[i] === model2.elements[j]) {
        return true;
      }
    }
  }
  return false;
}

module.exports = router;
