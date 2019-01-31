import React from 'react';
import Modal from '../containers/modal';
import HabitatDragon from '../Dragon/HabitatDragon';

const popup = (props) => {
  const onClosePopup = () => {
    props.setRootState({
      activeHabitat: null
    });
  };

  const getMoneyInfo = () => {
    let money = Math.floor(props.currentMoney);
    let disabled = money === 0;
    return (
      <p>
        <b>Income:</b> {props.incomePerMinute} per minute<br/>
        <b>Current money:</b> {money}<br/>
        <button onClick={props.collectMoney} disabled={disabled}>collect</button>
      </p>
    );
  };

  return (
    <Modal onClose={onClosePopup}>
      <div className="habitat active">
        <img src={props.habitat.gameModel.image} className="main-image" alt=""/>
        <div className="column">
          <h1 className="main-title">{props.habitat.gameModel.name} Habitat</h1>
          {
            !props.habitat.complete
            ? <p>UNDER CONSTRUCTION</p>
            : null
          }
          {getMoneyInfo()}
          {
            props.dragons.length === 0
            ? <button onClick={props.sellHabitat}>sell</button>
            : null
          }
        </div>
        <h2>Dragons</h2>
        <div>
          {props.dragons.map(dragon => {
            return (
              <HabitatDragon key={dragon._id} dragon={dragon}
                setRootState={props.setRootState}
                makePostRequest={props.makePostRequest}
                rootState={props.rootState}/>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

export default popup;
