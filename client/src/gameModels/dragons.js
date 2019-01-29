const dragons = [
  {
    name: 'Plant',
    elements: ['plant'],
    images: [
      'https://vignette.wikia.nocookie.net/dragonvale/images/7/7b/PlantDragonEgg.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/b/bf/PlantDragonBaby.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/1/10/PlantDragonJuvenile.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/7/75/PlantDragonAdult.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/7/7c/PlantDragonElder.png',
    ],
    eggTime: [0, 0, 5],
    buy: 100,
  },
  {
    name: 'Fire',
    elements: ['fire'],
    images: [
      'https://vignette.wikia.nocookie.net/dragonvale/images/f/f5/FireDragonEgg.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/5/54/FireDragonBaby.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/b/b5/FireDragonJuvenile.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/7/72/FireDragonAdult.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/c/ce/FireDragonElder.png',
    ],
    eggTime: [0, 5, 0],
    buy: 75,
  },
  {
    name: 'Earth',
    elements: ['earth'],
    images: [
      'https://vignette.wikia.nocookie.net/dragonvale/images/e/e2/EarthDragonEgg.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/5/5c/EarthDragonBaby.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/9/9a/EarthDragonJuvenile.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/2/2c/EarthDragonAdult.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/4/48/EarthDragonElder.png',
    ],
    eggTime: [2, 0, 0],
    buy: 500,
  },
  {
    name: 'Cold',
    elements: ['cold'],
    images: [
      'https://vignette.wikia.nocookie.net/dragonvale/images/0/03/ColdDragonEgg.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/5/52/ColdDragonBaby.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/e/e5/ColdDragonJuvenile.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/2/2a/ColdDragonAdult.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/7/70/ColdDragonElder.png',
    ],
    eggTime: [12, 0, 0],
    buy: 30000,
  },
  {
    name: 'Evergreen',
    elements: ['plant', 'cold'],
    images: [
      'https://vignette.wikia.nocookie.net/dragonvale/images/c/c2/EvergreenDragonEgg.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/a/ad/EvergreenDragonBaby.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/7/7b/EvergreenDragonJuvenile.png',
      'https://vignette.wikia.nocookie.net/dragonvale/images/e/e2/EvergreenDragonAdult.png',
      null,
    ],
    eggTime: [10, 0, 0],
    buy: 120000,
  },
];

module.exports = dragons;
