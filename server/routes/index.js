const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Island = require('../models/island');
const Habitat = require('../models/habitat');
const Dragon = require('../models/dragon');

const habitatModels = require('../../client/src/gameModels/habitats.js');
const dragonModels = require('../../client/src/gameModels/dragons.js');

router.get('/getData', getData);

router.post('/buyIsland', buyIsland);
router.post('/buyIncubator', buyIncubator);

router.post('/buyHabitat', buyHabitat);
router.post('/completeHabitat', completeHabitat);
router.post('/sellHabitat', sellHabitat);
router.post('/collectHabitat', collectHabitat);

router.post('/buyDragon', buyDragon);
router.post('/placeDragon', placeDragon);
router.post('/sellDragon', sellDragon);

function getData(req, res) {
  User.findById(req.session.userId, (error, user) => {
    if (error || user === null) {
      return res.send({ user: null });
    } else {
      Island.find({ user: user }, (err, islands) => {
        Habitat.find({ user: user }, (err, habitats) => {
          Dragon.find({ user: user }, (err, dragons) => {
            return res.send({
              user: user,
              islands: islands,
              habitats: habitats,
              dragons: dragons,
            });
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

// ISLAND

function buyIsland(req, res, next) {
  authenticate(req, res, next, (user) => {
    Island.find({ user: user }, (err, islands) => {
      if (islands.length) {
        console.log('Free island has already been claimed.');
        return;
      }
      updateMoney(user, 0, () => {
        let islandData = {
          user: user,
          size: 1,
        };
        Island.create(islandData, (error, habitat) => {
          if (error) {
            console.log('error');
            console.log(error);
          } else {
            return res.redirect('/');
          }
        });
      });
    });
  });
}

// INCUBATOR

function buyIncubator(req, res, next) {
  authenticate(req, res, next, (user) => {
    let islandId = req.body.island;

    if (user.incubator.size > 0) {
      console.log('User already has an incubator');
      return;
    }

    Island.findById(islandId, (error, island) => {
      if (error) {
        console.log('error');
        console.log(error);
        return;
      }

      if (!sameUser(island.user, user)) {
        console.log('wrong user');
        return;
      }

      let userData = {
        incubator: {
          size: 1,
          island: island
        }
      };

      user.update(userData, (error, user) => {
        if (error) {
          console.log('error');
          console.log(error);
          return;
        } else {
          return res.redirect('/');
        }
      });
    });
  });
}

// HABITAT

function buyHabitat(req, res, next) {
  authenticate(req, res, next, (user) => {
    let islandId = req.body.island;
    let index = parseInt(req.body.habitatIndex);
    let model = habitatModels[index];

    Island.findById(islandId, (error, island) => {
      if (error) {
        console.log('error');
        console.log(error);
        return;
      }
      if (!sameUser(island.user, user)) {
        console.log('wrong user');
        return;
      }
      updateMoney(user, -model.buy, () => {
        let habitatData = {
          user: user,
          island: island,
          gameModel: model.name,
          timestamp: new Date().getTime(),
        };

        Habitat.create(habitatData, (error, habitat) => {
          if (error) {
            console.log('error');
            console.log(error);
          } else {
            return res.redirect('/');
          }
        });
      });
    });
  });
}

function buyDragon(req, res, next) {
  authenticate(req, res, next, (user) => {
    if (user.incubator.size === 0) {
      console.log('User has no incubator');
      return;
    }

    let index = parseInt(req.body.dragonIndex);
    let model = dragonModels[index];

    updateMoney(user, -model.buy, () => {
      let dragonData = {
        user: user,
        habitat: null,
        gameModel: model.name,
        level: 0,
        timestamp: new Date().getTime(),
      };

      Dragon.create(dragonData, (error, dragon) => {
        if (error) {
          console.log('error');
          console.log(error);
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
        Habitat.find(habitatData, (error, habitat) => {
          let gameModel = findModel('habitat', habitat);
          let sellPrice = Math.round(gameModel.buy / 2);

          updateMoney(user, sellPrice, () => {
            Habitat.deleteOne(habitatData, error => {
              if (error) {
                return next(error);
              } else {
                return res.redirect('/');
              }
            });
          });
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
    Habitat.findById(habitatId, (err1, newHabitat) => {
      Dragon.findById(dragonId, (err2, dragon) => {
        if (err1 || err2) {
          return next(err1 || err2);
        } else if ('' + newHabitat.user != '' + user._id
            || '' + dragon.user != '' + user._id) {
          console.log('wrong user');
          return res.redirect('/');
        } else {
          let habitatModel = findModel('habitat', newHabitat);
          let dragonModel = findModel('dragon', dragon);

          let oldHabitatId = dragon.habitat;

          if (!elementsOverlap(habitatModel, dragonModel)) {
            return;
          }

          let dragonData = {
            habitat: newHabitat,
          };

          if (dragon.level == 0) {
            if (!timeIsComplete(dragon.timestamp, dragonModel.eggTime)) {
              return;
            }

            dragonData.level = 1;
          }

          let newTime = new Date().getTime();

          updateHabitatMoney(oldHabitatId, newTime, null, () => {
            updateHabitatMoney(newHabitat._id, newTime, null, () => {
              dragon.update(dragonData, (err, dragon) => {
                return res.send('success');
              });
            });
          });
        }
      });
    });
  });
}

function collectHabitat(req, res, next) {
  let habitatId = req.body.habitatId;
  let newTime = new Date().getTime();

  authenticate(req, res, next, (user) => {
    updateHabitatMoney(habitatId, newTime, user, () => {
      return res.send('success');
    });
  });
}

function updateHabitatMoney(habitatId, newTimeStamp, user, next) {
  if (habitatId == null) {
    next();
  } else {
    Habitat.findById(habitatId, (error, habitat) => {
      Dragon.find({ habitat: habitatId }, (error, dragons) => {
        let moneyPerMinute = 0;

        dragons.forEach(dragon => {
          let gameModel = findModel('dragon', dragon);
          moneyPerMinute += gameModel.income[dragon.level];
        });

        let minutesSinceLastUpdate = (newTimeStamp - habitat.timestamp) / 60000;

        let moneyIncrease = moneyPerMinute * minutesSinceLastUpdate;
        let totalMoneyInHabitat = habitat.money + moneyIncrease;
        let habitatMoneyCap = findModel('habitat', habitat).incomeCap;

        if (totalMoneyInHabitat > habitatMoneyCap) {
          totalMoneyInHabitat = habitatMoneyCap;
        }

        let habitatData = {
          timestamp: newTimeStamp
        };

        if (user) {
          habitatData.money = 0;
          updateMoney(user, totalMoneyInHabitat, () => {
            habitat.update(habitatData, next);
          });
        } else {
          habitatData.money = totalMoneyInHabitat;
          habitat.update(habitatData, next);
        }
      });
    });
  }
}

function sellDragon(req, res, next) {
  authenticate(req, res, next, (user) => {
    let dragonData = {
      _id: req.body.dragonId,
      user: user
    };

    Dragon.find(dragonData, (error, dragon) => {
      if (error || dragon == null) {
        console.log('error');
        console.log(error);
        return;
      }

      let gameModel = findModel('dragon', dragon);
      let sellPrice = Math.round(gameModel.buy / 2);

      updateMoney(user, sellPrice, () => {
        Dragon.deleteOne(dragonData, error => {
          if (error) {
            return next(error);
          } else {
            return res.redirect('/');
          }
        });
      });
    });
  });
}

function findModel(type, item) {
  let models = type === 'habitat' ? habitatModels : dragonModels;
  if (item.constructor == Array) {
    item = item[0];
  }
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

function updateMoney(user, amount, callback) {
  let newMoney = user.money + amount;

  if (newMoney < 0) {
    console.log('User does not have enough money for purchase.');
    return;
  }

  user.update({ money: newMoney }, error => {
    if (error) {
      console.log('error');
      console.log(error);
      return;
    }

    callback();
  });
}

function sameUser(user1, user2) {
  return ('' + (user1._id || user1)) === ('' + (user2._id || user2));
}

module.exports = router;
