var exports = {};

requirejs.config({
  baseUrl: '../',
  packages: ['build', { name: 'build', main: 'fabriclight' }],
  paths: {
    react: 'https://unpkg.com/react@16/umd/react.development',
    reactDOM: 'https://unpkg.com/react-dom@16/umd/react-dom.development'
  }
});

require(['require', 'react', 'reactDOM', 'build'], function(require) {
  var React = require('react');
  var ReactDOM = require('reactDOM');
  var build = require('build');
  var FabricLight = build.default;

  class Example extends React.Component {
    render() {
      var img = React.createElement('img', { src: 'sample.jpg' }, null);
      return React.createElement(FabricLight, null, img);
    }
  }

  ReactDOM.render(
    React.createElement(Example, {}),
    document.getElementById('example')
  );
});
