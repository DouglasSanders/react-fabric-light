import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MenuBar extends Component {
  render() {
    return (
      <div style={{ position: 'absolute', top: '-15px' }}>
        <button>A</button>
      </div>
    );
  }
}

MenuBar.propTypes = {
  canvas: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired
};
