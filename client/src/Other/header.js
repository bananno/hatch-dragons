import React from 'react';

const header = (props) => {
  const openMarket = () => {
    props.setRootState({
      showMarket: true
    });
  };

  const clickLogout = () => {
    props.makePostRequest('/logout');
  };

  const getMarketButton = () => {
    if (props.rootState.currentUser != null) {
      if (props.rootState.hatchDragon == null) {
        return (<button onClick={openMarket}>MARKET</button>);
      }
    }
    return null;
  }

  const getCurrentUserInfo = () => {
    if (props.rootState.currentUser == null) {
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
    if (props.rootState.currentUser == null
        || props.rootState.hatchDragon != null) {
      return null;
    }

    return (
      <button onClick={clickLogout}>logout</button>
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
