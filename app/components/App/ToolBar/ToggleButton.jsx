import React from 'react';
import PropTypes from 'prop-types';



export default class ToggleButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => {
      return {
        active: !prevState.active
      };
    });
  }


  render() {
    const {
      text
    } = this.props;

    const toggleStyle = this.state.active ? {
      color: '#fff',
      backgroundColor: 'green'
    } : {
      color: '#000',
      backgroundColor: 'white'
    };

    return (
      <button
        className="toggle-button button-primary"
        style={toggleStyle}
        onClick={this.handleClick}>
        {text}
      </button>
    );
  }
}

ToggleButton.propTypes = {
  text: PropTypes.string
};