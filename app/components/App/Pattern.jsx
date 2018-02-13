import React from 'react';
import PropTypes from 'prop-types';

class Pattern extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.canvas.width = 200;
    this.canvas.height = 200;

    this.context = this.canvas.getContext('2d');

    this.context.fillStyle = 'rgb(150,20,0)';
    this.context.fillRect(20, 20, 180, 180);
  }

  render() {
    return (
      <canvas
        ref={(canvas) => { this.canvas = canvas; }}
        id="pattern-canvas"/>
    );
  }
}

export default Pattern;