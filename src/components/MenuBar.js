import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FabricLight, { fabricLightStateShape } from './FabricLight';

import HistoryButtons from './HistoryButtons';
import PencilButton from './PencilButton';

class MenuBar extends Component {
  static propTypes = {
    parentComponent: PropTypes.instanceOf(FabricLight).isRequired,
    parentState: fabricLightStateShape.isRequired
  };

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white'
        }}
      >
        <HistoryButtons {...this.props} />
        <PencilButton {...this.props} />
      </div>
    );
  }
}

export { MenuBar as default };
