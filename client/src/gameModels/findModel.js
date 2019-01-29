import habitatModels from './habitats';
import dragonModels from './dragons';

function findModel(type, item) {
  let models = type === 'habitat' ? habitatModels : dragonModels;
  let modelName = item.gameModel || item;

  return models.filter(model => {
    return model.name === modelName;
  })[0];
}

export default findModel;
