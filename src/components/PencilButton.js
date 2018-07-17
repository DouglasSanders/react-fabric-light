import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { fabric } from 'fabric';

import FabricLight, { fabricLightStateShape } from './FabricLight';

export class PencilButton extends Component {
  static propTypes = {
    parentComponent: PropTypes.instanceOf(FabricLight).isRequired,
    parentState: fabricLightStateShape
  };

  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }

  handlePencilButton(e) {
    e.preventDefault();
    const { canvas } = this.props.parentState;

    this.setState(
      prevState => ({
        isActive: !prevState.isActive
      }),
      () => {
        if (this.state.isActive) {
          ::this.activatePencil();
          canvas.isDrawingMode = true;
        } else {
          canvas.isDrawingMode = false;
          canvas.off('path:created');
        }
      }
    );
  }

  activatePencil() {
    const { canvas } = this.props.parentState;
    const { addTransform } = this.props.parentComponent;
    var pencil = new fabric.PencilBrush(canvas);
    pencil.width = 10;
    pencil.color = '#F81816';
    canvas.freeDrawingBrush = pencil;

    canvas.on('path:created', e => {
      addTransform.bind(this.props.parentComponent)(c => {
        Object.assign(e.path, {
          evented: false,
          selectable: false,
          hasControles: false,
          hasBorders: false
        });
        c.add(e.path);
      });
    });
  }

  render() {
    const { isActive } = this.state;

    const buttonClasses = classnames({
      btn: true,
      'btn-warning': isActive,
      'btn-primary': !isActive,
      'btn-sm': true
    });

    return (
      <button
        className={buttonClasses}
        role="button"
        onClick={e => {
          ::this.handlePencilButton(e);
        }}
      >
        Pencil
      </button>
    );
  }
}

export { PencilButton as default };
