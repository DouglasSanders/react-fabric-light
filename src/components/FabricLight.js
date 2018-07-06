import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fabric } from 'fabric';

import MenuBar from './MenuBar';
import { computeScale } from '../util';

export class FabricLight extends Component {
  constructor(props) {
    super(props);
    let id;
    do {
      id = `react-fabric-light-${new Date().getTime()}`;
    } while (document.getElementById(id));

    //be sure to update shapes.js with changes
    this.state = {
      id: id,
      canvas: null,
      sourceImage: null,
      transforms: [],
      redos: []
    };
  }

  /**
   * Ensure we were passed valid props
   *
   * @returns {undefined}
   */
  static requireValidProps(props) {
    React.Children.only(props.children);
    if (
      props.children.type !== 'img' ||
      !props.children.props ||
      !(typeof props.children.props.src === 'string')
    )
      throw new TypeError(
        'FabricLight requires a single <img> child with a valid src attribute.'
      );
  }

  initializeImage(img_src) {
    fabric.Image.fromURL(
      img_src,
      o_img => {
        const { canvas } = this.state;
        canvas.add(o_img);
        ::this.rescaleImage(canvas, o_img);
        this.setState({
          canvas: canvas,
          sourceImage: o_img
        });
      },
      {
        // Some options to make the image static
        selectable: false,
        evented: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
        lockUniScaling: true,
        hasControls: false,
        hasBorders: false
      }
    );
  }

  /**
   * Adds a new Transform to the stack. Wipes out any existing Redo stack.
   */
  addTransform(transformFunction) {
    this.setState(prevState => ({
      transforms: prevState.transforms.concat([transformFunction]),
      redos: []
    }));
  }

  /**
   * Undo the last Transform in the stack, and push it onto the Redo stack.
   */
  undoTransform() {
    this.setState(prevState => {
      if (prevState.transforms.length > 0) {
        return {
          transforms: prevState.transforms.slice(0, -1),
          redos: prevState.redos.concat([prevState.transforms.slice(-1)])
        };
      } else return prevState;
    });
  }

  /**
   * Add the uppermost Transform in the Redo stack back onto the Transform stack.
   * Removes the Transform from the Redo stack.
   */
  redoTransform() {
    this.setState(prevState => {
      if (prevState.redos.length > 0) {
        return {
          transforms: prevState.transforms.concat([prevState.redos.slice(-1)]),
          redos: prevState.redos.slice(0, -1)
        };
      } else return prevState;
    });
  }

  rescaleImage(canvas, image) {
    if (canvas && image) {
      image.scale(computeScale(canvas, image));
      canvas.centerObject(image);
      image.setCoords();
    }
  }

  renderImage(canvas, image) {
    if (canvas && image) {
      ::this.rescaleImage(canvas, image);
      canvas.requestRenderAll();
    }
  }

  componentDidMount() {
    FabricLight.requireValidProps(this.props);
    const { id } = this.state;
    const { children, backgroundColor } = this.props;
    this.setState(
      {
        canvas: new fabric.Canvas(id, {
          selection: false,
          backgroundColor: backgroundColor
        })
      },
      () => {
        ::this.initializeImage(children.props.src);
      }
    );
  }

  render() {
    const { width, height } = this.props;
    const { id, canvas, sourceImage } = this.state;
    const readyForAction = !!canvas && !!sourceImage;
    return (
      <div style={{ position: 'relative' }}>
        <canvas id={id} width={width} height={height} />
        {readyForAction && (
          <MenuBar parentComponent={this} parentState={this.state} />
        )}
      </div>
    );
  }
}

FabricLight.propTypes = {
  children: PropTypes.element.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.string
};

FabricLight.defaultProps = {
  width: 500,
  height: 500,
  backgroundColor: 'rgba(0, 0, 0, 0.1)'
};

export const fabricLightStateShape = PropTypes.shape({
  canvas: PropTypes.object,
  sourceImage: PropTypes.object,
  transforms: PropTypes.arrayOf(PropTypes.func).isRequired,
  redos: PropTypes.arrayOf(PropTypes.func).isRequired
});


export default FabricLight;
