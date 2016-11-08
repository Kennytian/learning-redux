import React, { Component, PropTypes } from 'react';
import { Text } from 'react-native';

export default class Footer1 extends Component {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.oneOf([
      'SHOW_ALL',
      'SHOW_COMPLETED',
      'SHOW_ACTIVE'
    ]).isRequired
  };

  _renderFilter(filter, name) {
    if (filter === this.props.filter) {
      return `\t${name}`;
    }

    return (
      <Text style={{marginLeft: 15}} onPress={(e) => this.props.onFilterChange(filter)}>
        {`\t${name}`}
      </Text>
    );
  }

  render() {
    return (
      <Text style={style.text}>
        Filter: {this._renderFilter('SHOW_ALL', 'All')}
        {this._renderFilter('SHOW_COMPLETED', 'Completed')}
        {this._renderFilter('SHOW_ACTIVE', 'Active')}
      </Text>
    );
  }
}

let style = {
  text: {
    marginTop: 10,
    marginLeft: 10
  }
};
