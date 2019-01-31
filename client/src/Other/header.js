import React from 'react';

const header = (props) => {
  const currentlyLoggedIn = props.rootState.currentUser != null;

  const disableButtons = props.rootState.placeDragon != null
    || props.rootState.buyHabitat != null || props.rootState.buyIncubator;

  const openMarket = () => {
    props.setRootState({
      showMarket: true
    });
  };

  const clickLogout = () => {
    props.makePostRequest('/logout');
  };

  const getMarketButton = () => {
    if (!currentlyLoggedIn) {
      return null;
    }

    return (
      <button onClick={openMarket} disabled={disableButtons}>MARKET</button>
    );
  }

  const getMoneyInfo = () => {
    if (!currentlyLoggedIn) {
      return null;
    }

    return (
      <div className="show-money">
        {Math.round(props.rootState.currentUser.money)}
      </div>
    );
  }

  const getCurrentUserInfo = () => {
    if (!currentlyLoggedIn) {
      return null;
    }

    return (
      <p>
        <b>Current user: </b>
        {props.rootState.currentUser.username}
      </p>
    );
  }

  const getLogoutButton = () => {
    if (props.rootState.currentUser == null) {
      return null;
    }

    return (
      <button onClick={clickLogout} disabled={disableButtons}>logout</button>
    );
  }

  return (
    <div className="page-header">
      <h1>Hatch Dragons</h1>
      <div>
        {getMarketButton()}
      </div>
      <div>
        {getMoneyInfo()}
      </div>
      <div>
        {getCurrentUserInfo()}
        {getLogoutButton()}
      </div>
    </div>
  );
};

export default header;
