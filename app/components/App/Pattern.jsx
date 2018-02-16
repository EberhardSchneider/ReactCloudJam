import React from 'react';
import PropTypes from 'prop-types';

import storeProvider from '../storeProvider';

class Pattern extends React.Component {

  constructor(props) {
    super(props);
  }

  getAppState() {
    const {
      playPosition
    } = this.props.store.getState();
    this.setState({
      playPosition
    });
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subId);
  }

  componentDidMount() {
    this.canvas.width = 200;
    this.canvas.height = 200;

    this.cxt = this.canvas.getContext('2d');
    this.cxt.save();
    this.cxt.fillStyle = 'rgb(150,20,0)';
    this.cxt.fillRect(20, 20, 180, 180);
    this.cxt.restore();

    this.subId = this.props.store.subscribe(this.getAppState.bind(this));
  }

  componentDidUpdate() {
    const xCoord = this.state.playPosition * 5;
    requestAnimationFrame(() => {
      this.drawMarker(xCoord).bind(this);
    });
  }

  drawMarker(xCoord) {
    this.cxt.fillStyle = 'rgb(150,20,0)';
    this.cxt.fillRect(0, 0, 300, 300);
    this.cxt.fillStyle = 'rgb(255,255,255)';
    this.cxt.fillRect(xCoord, 0, 10, 300);
  }

  render() {
    return (
      <canvas
        ref={(canvas) => { this.canvas = canvas; }}
        id="pattern-canvas"/>
    );
  }
}

export default storeProvider(Pattern);