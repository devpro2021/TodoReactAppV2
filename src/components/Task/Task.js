import React, { Component } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import PropTypes from 'prop-types';
import './Task.css';
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
  state = {
    min: this.props.minValue,
    sec: this.props.secValue,
    isStart: false,
  };
  handleStart = (e) => {
    e.stopPropagation();
    this.setState({ isStart: true });
    this.timerID = setInterval(() => {
      let { min, sec, isStart } = this.state;
      const { onCompleted } = this.props;
      if (min === 0 && sec === 0 && isStart) {
        clearInterval(this.timerID);
        this.setState({ isStart: false });
      }

      if (sec > 0) {
        this.setState({ sec: sec - 1, isStart: true });
      } else if (sec === 0 && min === 0) {
        onCompleted();
        this.setState({ min: this.props.minValue, sec: this.props.secValue });
      } else {
        this.setState({ min: min - 1, sec: 59 });
      }
    }, 1000);
  };

  handlePause = (e) => {
    e.stopPropagation();
    this.setState({ isStart: false });
    clearInterval(this.timerID);
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {
    const { description, created, checked } = this.props.data;
    const { min, sec, isStart } = this.state;
    return (
      <div className="view">
        <input className="toggle" type="checkbox" readOnly onClick={this.props.onCompleted} checked={checked} />
        <label>
          <span className="title" onClick={this.props.onCompleted} onKeyPress={this.props.onCompleted}>
            {description}
          </span>
          <span className="description">
            {!isStart ? (
              <button className="icon icon-play" onClick={this.handleStart}></button>
            ) : (
              <button className="icon icon-pause" onClick={this.handlePause}></button>
            )}
            {min}:{format(sec * 1000, 'ss')}
          </span>
          <span className="description">created {formatDistanceToNow(created)} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={this.props.deleteTask}></button>
      </div>
    );
  }
}
