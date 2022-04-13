import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static defaultProps = {
    onCompleted: () => {},
    description: 'new Task',
    created: new Date(),
    deleteTask: () => {},
  };
  static propTypes = {
    onCompleted: PropTypes.func,
    description: PropTypes.string,
    created: PropTypes.object,
    deleteTask: PropTypes.func,
  };
  render() {
    const { description, created } = this.props.data;
    return (
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>
          <span className="description" onClick={this.props.onCompleted}>
            {description}
          </span>
          <span className="created">created {formatDistanceToNow(created, { includeSeconds: true })} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={this.props.deleteTask}></button>
      </div>
    );
  }
}
