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

  return (
    <div className="page-header">
      <h1>Hatch Dragons</h1>

      <div>
        {
          (props.rootState.currentUser && !props.rootState.showMarket)
          ? <button onClick={openMarket}>MARKET</button>
          : null
        }
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
