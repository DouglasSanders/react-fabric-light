import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import FabricLight, { fabricLightStateShape }  from './FabricLight';

export class HistoryButtons extends Component {
  static propTypes = {
    parentComponent: PropTypes.instanceOf(FabricLight).isRequired,
    parentState: fabricLightStateShape
  };

  handleUndo(e) {
    e.preventDefault();
    this.props.parentComponent.undoTransform();
  }

  handleRedo(e) {
    e.preventDefault();
    this.props.parentComponent.redoTransform();
  }

  render() {
    const { transforms, redos } = this.props.parentState;
    const canUndo = transforms.length > 0;
    const canRedo = redos.length > 0;

    const undoClasses = classnames({
      btn: true,
      "btn-primary": canUndo,
      "btn-secondary": !canUndo,
      "btn-sm": true
    });

    const redoClasses = classnames({
      btn: true,
      "btn-primary": canRedo,
      "btn-secondary": !canRedo,
      "btn-sm": true
    });
    return (
      <span className="btn-group" role="group">
        <button className={undoClasses} disabled={!canUndo} role="button" onClick={(e) => {::this.handleUndo(e)}}>Undo</button>
        <button className={redoClasses} disabled={!canRedo} role="button" onClick={(e) => {::this.handleRedo(e)}}>Redo</button>
      </span>
    );
  }
}

export { HistoryButtons as default };
