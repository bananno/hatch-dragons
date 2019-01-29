import React from 'react';
import findModel from '../gameModels/findModel';

const incubatorDragon = (props) => {
  let gameModel = findModel('dragon', props.dragon);

  let className = 'dragon egg';

  const onHatch = () => {
    props.setRootState({
      placeDragon: props.dragon,
      showIncubator: false
    });
  };

  const parseTimestamp = (str) => {
    let part1 = str.slice(0, str.indexOf('T')).split('-');
    let part2 = str.slice(str.indexOf('T') + 1, str.indexOf('.')).split(':');

    return {
      year: parseInt(part1[0]),
      month: parseInt(part1[1]),
      day: parseInt(part1[2]),
      hour: parseInt(part2[0]),
      minute: parseInt(part2[1]),
      second: parseInt(part2[2])
    };
  }

  let then = parseTimestamp(props.dragon.timestamp);

  return (
    <div className={className}>
      <h1>{gameModel.name} Dragon</h1>
      <img src={gameModel.images[0]} alt=""/><br/>
      <button onClick={onHatch}>hatch</button>

      <br/><br/>
      <b>started:</b> {props.dragon.timestamp}
    </div>
  );
};

export default incubatorDragon;
