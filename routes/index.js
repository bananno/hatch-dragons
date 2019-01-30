const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Habitat = require('../models/habitat');
const Dragon = require('../models/dragon');

const habitatModels = require('../client/src/gameModels/habitats.js');
const dragonModels = require('../client/src/gameModels/dragons.js');

router.get('/getData', getData);
router.post('/buyHabitat', buyHabitat);
router.post('/completeHabitat', completeHabitat);
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

    if (model.buy > user.money) {
      console.log('cannot afford');
      return;
    }

    let ts = new Date().getTime();

    let habitatData = {
      user: user,
      gameModel: model.name,
      timestamp: ts,
    };

    let userData = {
      money: user.money - model.buy
    };

    user.update(userData, (error, user) => {
      if (error) {
        console.log('error');
        console.log(error);
        return;
      }

      Habitat.create(habitatData, (error, habitat) => {
        if (error) {
          return next(error);
        } else {
          return res.redirect('/');
        }
      });
    });
  });
}

function buyDragon(req, res, next) {
  authenticate(req, res, next, (user) => {
    let index = parseInt(req.body.dragonIndex);
    let model = dragonModels[index];

    if (model.buy > user.money) {
      console.log('cannot afford');
      return;
    }

    let ts = new Date().getTime();

    let dragonData = {
      user: user,
      habitat: null,
      gameModel: model.name,
      level: 0,
      timestamp: ts,
    };

    let userData = {
      money: user.money - model.buy
    };

    user.update(userData, (error, user) => {
      if (error) {
        console.log('error');
        console.log(error);
        return;
      }

      Dragon.create(dragonData, (error, habitat) => {
        if (error) {
          return next(error);
        } else {
          return res.redirect('/');
        }
      });
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

function completeHabitat(req, res, next) {
  let habitatId = req.body.habitat;

  authenticate(req, res, next, (user) => {
    Habitat.findById(habitatId, (error, habitat) => {
      if (error) {
        console.log('error');
        console.log(error);
        return;
      } else if (habitat == null) {
        console.log('habitat not found: ' + habitatId);
        return;
      } else if ('' + habitat.user != '' + user._id) {
        console.log('wrong user');
        return;
      } else if (habitat.complete) {
        return;
      } else {
        let habitatModel = findModel('habitat', habitat);

        if (!timeIsComplete(habitat.timestamp, habitatModel.buildTime)) {
          return;
        }

        let habitatData = {
          complete: true,
        };

        habitat.update(habitatData, (err, habitat) => {
          if (err) {
            console.log('error');
            console.log(error);
          } else {
            return res.send('success');
          }
        });
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
            if (!timeIsComplete(dragon.timestamp, dragonModel.eggTime)) {
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

function getSecondsElapsed(timestamp) {
  let now = new Date().getTime();
  return Math.round((now - timestamp)/1000);
}

function timeIsComplete(timestamp, requiredTime) {
  let secondsElapsed = getSecondsElapsed(timestamp);
  let secondsRequired = requiredTime[2] + (requiredTime[1] * 60) + (requiredTime[0] * 3600);
  return secondsElapsed >= secondsRequired;
}

module.exports = router;
