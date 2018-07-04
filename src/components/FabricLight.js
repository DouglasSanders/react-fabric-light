import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { fabric } from 'fabric';

import MenuBar from './MenuBar';
import { computeScale } from '../util';

export default class FabricLight extends PureComponent {
  constructor(props) {
    super(props);
    let id;
    do {
      id = `react-fabric-light-${new Date().getTime()}`;
    } while (document.getElementById(id));
    this.state = {
      id: id,
      canvas: null,
      sourceImage: null,
      transforms: []
    };

    this.canvas_wrapper = React.createRef();
    this.canvas_element = React.createRef();
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

  rescaleImage(canvas, image) {
    if (canvas && image) {
      image.scale(computeScale(canvas, image));
      canvas.centerObject(image);
      image.setCoords();
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
        <canvas
          id={id}
          ref={this.canvas_element}
          width={width}
          height={height}
        />
        {readyForAction && <MenuBar canvas={canvas} image={sourceImage} />}
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
