import React from 'react';

const header = (props) => {
  const currentlyLoggedIn = props.rootState.currentUser != null;
  const currentlyHatchingDragon = props.rootState.hatchDragon != null;

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

    let disabled = currentlyHatchingDragon;

    return (
      <button onClick={openMarket} disabled={disabled}>MARKET</button>
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

    let disabled = currentlyHatchingDragon;

    return (
      <button onClick={clickLogout} disabled={disabled}>logout</button>
    );
  }

  return (
    <div className="page-header">
      <h1>Hatch Dragons</h1>
      <div>
        {getMarketButton()}
      </div>
      <div>
        {getCurrentUserInfo()}
        {getLogoutButton()}
      </div>
    </div>
  );
};

export default header;
