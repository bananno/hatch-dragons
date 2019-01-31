import React from 'react';
import Island from './Island';

const park = (props) => {
  let className = 'main-park zoom-' + props.rootState.zoom;

  return (
    <div className={className}>
      {
        props.rootState.islands.map(island => {
          return (
            <Island key={island._id} island={island}
              rootState={props.rootState}
              setRootState={props.setRootState}
              makePostRequest={props.makePostRequest}/>
          );
        })
      }
    </div>
  );
};

export default park;
