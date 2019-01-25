
function hatchEgg(dragonId) {
  console.log(dragonId);
  $('.place-hatched-egg').filter('[dragon_id="' + dragonId + '"]').show();
}

function expandHabitat(habitatId) {
  unExpandHabitats();
  $('.habitat[habitat_id="' + habitatId + '"]').removeClass('basic').addClass('expanded');
}

function unExpandHabitats() {
  $('.habitat').removeClass('expanded').addClass('basic');
}
