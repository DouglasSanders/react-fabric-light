import FabricLight from './components/FabricLight';
import React from 'react';
import { render } from 'react-dom';

render(
  <FabricLight
    width={document.getElementById('example').clientWidth}
    height={document.getElementById('example').clientHeight}
  >
    <img src="https://images.unsplash.com/photo-1530569673472-307dc017a82d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f9eeece2e75190a34dfc04fe751bf4ba&auto=format&fit=crop&w=1268&q=80" />
  </FabricLight>,
  document.getElementById('example')
);

export default FabricLight;
