import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FabricLight, { fabricLightStateShape } from './FabricLight';

import HistoryButtons from './HistoryButtons';

class MenuBar extends Component {
  static propTypes = {
    parentComponent: PropTypes.instanceOf(FabricLight).isRequired,
    parentState: fabricLightStateShape
  };

  render() {
    return (
      <div style={{ position: 'absolute', top: '-15px' }}>
        <HistoryButtons {...this.props} />
      </div>
    );
  }

}

export { MenuBar as default };
