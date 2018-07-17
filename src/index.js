//eslint-disable-next-line
import MenuBar from './components/MenuBar'; //must import before FabricLight
import FabricLight from './components/FabricLight';
import React from 'react';
import { render } from 'react-dom';

render(
  <FabricLight maxWidth={800} maxHeight={600}>
    <img src="sample.png" />
  </FabricLight>,
  document.getElementById('example')
);

export default FabricLight;
