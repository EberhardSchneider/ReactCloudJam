import React from 'react';
import PropTypes from 'prop-types';

class Column extends React.Component {

  render() {
    return (
      <div
        style={{width: '2em', float: 'left'}}
        className={this.props.active ? 'active' : ''}>
        {
          this.props.data.map((cell, index) => (
            <div
              key={index}
              style={{width: '2em'}}
              onClick={this.props.handleCellClick.bind(this, this.props.colNumber, index)}>
              {cell}
            </div>
          ))
        }
      </div>
    );
  }
}

Column.propTypes = {
  data: PropTypes.array,
  active: PropTypes.bool,
  colNumber: PropTypes.number,
  handleCellClick: PropTypes.func
};

export default Column;