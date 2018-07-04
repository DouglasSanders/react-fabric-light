import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fabric } from 'fabric';

export default class FabricLight extends Component {
  constructor(props) {
    super(props);
    let id;
    do {
      id = `react-fabric-light-${new Date().getTime()}`;
    } while (document.getElementById(id));
    this.state = {
      id: id
    };

    this.canvas_wrapper = React.createRef();
    this.canvas_element = React.createRef();
  }

  /**
   * Ensure we were passed valid props
   *
   * @returns {undefined}
   */
  requireValidProps(props) {
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
    const img = fabric.Image.fromURL(
      img_src,
      o_img => {
        this.canvas.add(o_img);
        this.canvas.renderAll();
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

    this.setState({
      ...this.state,
      sourceImage: img
    });
  }

  componentWillMount() {
    ::this.requireValidProps(this.props);
  }

  componentDidMount() {
    const { id } = this.state;
    const { children } = this.props;
    this.canvas = new fabric.Canvas(id);
    ::this.initializeImage(children.props.src);
  }

  componentWillReceiveProps(nextProps) {
    // Update the background image if our child img updates
    ::this.requireValidProps(nextProps);
    if (this.props.children.props.src !== nextProps.children.props.src)
      ::this.initializeImage(nextProps.children.props.src);
  }

  render() {
    const { width, height } = this.props;
    const { id } = this.state;
    return (
      <div>
        <canvas
          id={id}
          ref={this.canvas_element}
          width={width}
          height={height}
        />
      </div>
    );
  }
}

FabricLight.propTypes = {
  children: PropTypes.element.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};

FabricLight.defaultProps = {
  width: 500,
  height: 500
};
