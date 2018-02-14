import React from 'react';
import PropTypes from 'prop-types';

const buttonStyle = {
  textAlign: 'center',
  fontSize: '2em',
  position: 'relative',
  height: '1.5em',
  width: '13.3333333333%',
  border: 'solid green 2px',
  borderRadius: '5px'
};

export default class ToggleButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
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
      backgroundColor: 'green'
    } : {
      backgroundColor: 'white'
    };
    const style = {
      ...buttonStyle,
      ...toggleStyle
    };
    return (
      <div
        className="toggle-button"
        style={style}
        onClick={this.handleClick}>
        {text}
      </div>
    );
  }
}

ToggleButton.propTypes = {
  text: PropTypes.string
};