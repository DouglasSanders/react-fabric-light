//eslint-disable-next-line
import MenuBar from './components/MenuBar'; //must import before FabricLight
import FabricLight from './components/FabricLight';
import React from 'react';
import { render } from 'react-dom';

render(
  <FabricLight
    width={document.getElementById('example').clientWidth}
    height={document.getElementById('example').clientHeight}
  >
    <img src="sample.png" />
  </FabricLight>,
  document.getElementById('example')
);

export default FabricLight;
