import React from 'react';
import storeProvider from '../../storeProvider';

class DisplayPosition extends React.Component {

  constructor(props) {
    super(props);

    this.state = this.state = props.store.getState();
  }

  getAppState() {
    const {
      playPosition
    } = this.props.store.getState();
    this.setState({
      playPosition
    });
  }

  componentDidMount() {
    this.subId = this.props.store.subscribe(this.getAppState.bind(this));
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subId);
  }

  render() {

    return (
      <h4
        className="two columns"
        id="display-position">
        {this.state.playPosition}
      </h4>
    );
  }
}

export default storeProvider(DisplayPosition);