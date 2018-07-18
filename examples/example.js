requirejs.config({
  baseUrl: '../',
  packages: ['build', { name: 'build', main: 'fabriclight' }],
  paths: {
    react: 'https://unpkg.com/react@16/umd/react.production.min',
    reactDOM: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min'
  }
});

require(['require', 'react', 'reactDOM', 'build'], function(require) {
  var React = require('react');
  var ReactDOM = require('reactDOM');
  var build = require('build');
  var FabricLight = build.default;

  class Example extends React.Component {
    render() {
      return React.createElement(
        FabricLight,
        { maxWidth: 800, maxHeight: 500 },
        React.createElement('img', { src: 'sample.jpg' }, null)
      );
    }
  }

  ReactDOM.render(
    React.createElement(Example, {}),
    document.getElementById('example')
  );
});
