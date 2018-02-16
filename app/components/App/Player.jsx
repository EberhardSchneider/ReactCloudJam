import React from 'react';
import PropTypes from 'prop-types';

import storeProvider from '../storeProvider';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.store.getState();
  }

  stateChange() {

    const {
      pattern,
      playPosition,
      samples
    } = this.props.store.getState();

    this.setState({
      pattern,
      playPosition,
      samples
    });

    this.audioElements = [];

    samples.map((filename) => {
      const audio = new Audio(filename);
      audio.preload = 'auto';
      this.audioElements.push(audio);
    });
  }

  componentDidMount() {
    this.subId = this.props.store.subscribe(this.stateChange.bind(this));
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subId);
  }

  render() {
    this.state.pattern[this.state.playPosition].map((cell, index) => {
      if (cell != 0) {
        this.audioElements[index].play();
      }
    });
    return null;
  }
}

Player.propTypes = {
  pattern: PropTypes.array,
  playPosition: PropTypes.number,
  samples: PropTypes.array
};

export default storeProvider(Player);