import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fabric from 'fabric';

export default class FabricLight extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvas} />
      </div>
    );
  }
}

FabricLight.propTypes = {
  image: PropTypes.any
};
