import React from 'react';
import PropTypes from 'prop-types';

import Column from './Column';
import storeProvider from '../storeProvider';

class Pattern extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.state = props.store.getState();
  }

  getAppState() {
    const {
      playPosition,
      length,
      nTracks,
      pattern
    } = this.props.store.getState();
    this.setState({
      playPosition,
      length,
      nTracks,
      pattern
    });
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subId);
  }

  componentDidMount() {
    this.subId = this.props.store.subscribe(this.getAppState.bind(this));
  }


  render() {
    return (
      <div id="pattern">
        {
          this.state.pattern.map((column, index) => (
            <Column
              key={index}
              data={column}
              active={this.state.playPosition == index ? true : false}/>
          ))
        }
      </div>
    );
  }
}

Pattern.propTypes = {
  playPosition: PropTypes.number,
  nTracks: PropTypes.number,
  length: PropTypes.number,
  pattern: PropTypes.array
};

export default storeProvider(Pattern);