import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import FabricLight, { fabricLightStateShape }  from './FabricLight';

export class HistoryButtons extends Component {
  static propTypes = {
    parentComponent: PropTypes.instanceOf(FabricLight).isRequired,
    parentState: fabricLightStateShape
  };

  render() {
    const { transforms, redos } = this.props.parentState;
    const canUndo = transforms.length > 0;
    const canRedo = redos.length > 0;

    const undoClasses = classnames({
      disabled: !canUndo
    });

    const redoClasses = classnames({
      disabled: !canRedo
    });
    return (
      <span>
        <button className={undoClasses}>Undo</button>
        <button className={redoClasses}>Redo</button>
      </span>
    );
  }
}

export { HistoryButtons as default };
