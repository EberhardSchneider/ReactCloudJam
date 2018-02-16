import React from 'react';
import PropTypes from 'prop-types';

import storeProvider from '../../storeProvider';

class PlayStop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playing: false
    };
  }
  getAppState() {
    const {
      playing
    } = this.props.store.getState();
    this.setState({
      playing
    });
  }

  componentDidMount() {
    this.subId = this.props.store.subscribe(this.getAppState.bind(this));
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subId);
  }

  playButtonClicked() {
    if (!this.state.playing)
      this.props.store.setState({
        playing: true
      });
  }

  stopButtonClicked() {
    if (this.state.playing)
      this.props.store.setState({
        playing: false
      });
  }

  render() {
    const playButtonClass = 'button-primary' + (this.state.playing ? ' active' : '');
    const stopButtonClass = 'button-primary' + (this.state.playing ? '' : ' active');

    return (
      <div className="four columns">
        <button
          id="play-button"
          className={playButtonClass}
          onClick={this.playButtonClicked.bind(this)}>
          PLAY
        </button>
        <button
          id="stop-button"
          className={stopButtonClass}
          onClick={this.stopButtonClicked.bind(this)}>
          STOP
        </button>
      </div>
    );
  }
}

PlayStop.propTypes = {
  store: PropTypes.object
};

export default storeProvider(PlayStop);