
console.log('running');

function hatchEgg(dragonId) {
  console.log(dragonId);
  $('.place-hatched-egg').filter('[dragon_id="' + dragonId + '"]').show();
}
