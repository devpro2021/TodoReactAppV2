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
    const { description, created, checked } = this.props.data;
    return (
      <div className="view">
        <input className="toggle" type="checkbox" readOnly onClick={this.props.onCompleted} checked={checked} />
        <label onClick={this.props.onCompleted} onKeyPress={this.props.onCompleted}>
          <span className="description">{description}</span>
          <span className="created">created {formatDistanceToNow(created, { includeSeconds: true })} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={this.props.deleteTask}></button>
      </div>
    );
  }
}
