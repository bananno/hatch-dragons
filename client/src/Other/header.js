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

  return (
    <div className="page-header">
      <h1>Hatch Dragons</h1>

      <div>
        {getMarketButton()}
      </div>

      <div>
        {
          props.rootState.currentUser
          ? (
            <p>
              <b>Current user: </b>
              {props.rootState.currentUser.username}
            </p>
          ) : null
        }

        {
          props.rootState.currentUser
          ? (<form onSubmit={clickLogout}>
              <button type="submit">logout</button>
            </form>)
          : null
        }
      </div>
    </div>
  );
};

export default header;
