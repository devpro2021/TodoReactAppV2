import React, { Component } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import './Task.css';
export default class Task extends Component {
  static defaultProps = {
    onCheckBoxClick: () => {},
    description: 'new Task',
    created: new Date(),
    deleteTask: () => {},
  };
  static propTypes = {
    onCheckBoxClick: PropTypes.func,
    description: PropTypes.string,
    created: PropTypes.object,
    deleteTask: PropTypes.func,
  };
  state = {
    timeleft: this.props.secValue + this.props.minValue * 60,
    isStart: false,
    timerID: null,
  };

  componentWillUnmount() {
    clearInterval(this.state.timerID);
  }

  secDecrement = () => {
    const { timeleft, isStart } = this.state;
    const { onCheckBoxClick } = this.props;
    if (timeleft > 1) {
      this.setState({
        timeleft: timeleft - 1,
        isStart: true,
      });
    } else {
      onCheckBoxClick();
      clearInterval(this.state.timerID);
      this.setState({
        timeleft: 0,
        isStart: false,
        timerID: null,
      });
    }
  };

  handlePause = () => {
    this.setState({ isStart: false });
    clearInterval(this.state.timerID);
  };

  handleStart = (e) => {
    e.stopPropagation();
    const counterID = setInterval(() => {
      this.secDecrement();
    }, 1000);
    this.setState({ isStart: true, timerID: counterID });
  };

  handlerDone = () => {
    const { onCheckBoxClick } = this.props;
    onCheckBoxClick();
    this.handlePause();
  };

  render() {
    const { description, timeAfterCreate, checked, completed } = this.props;
    const { timeleft, isStart } = this.state;
    const buttonTimer = !isStart ? (
      <button type="button" className="icon icon-play" onClick={this.handleStart} disabled={completed} />
    ) : (
      <button type="button" className="icon icon-pause" onClick={this.handlePause} />
    );
    return (
      <div className="view">
        <input className="toggle" type="checkbox" readOnly onClick={this.handlerDone} checked={checked} />
        <div className="label">
          <span className="title" onClick={this.handlerDone}>
            {description}
          </span>
          <span className="description">
            {buttonTimer}
            <span className="description__time-value">{format(new Date(timeleft * 1000).getTime(), 'm:ss')}</span>
          </span>
          <span className="description">created {timeAfterCreate} ago</span>
        </div>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={this.props.deleteTask}></button>
      </div>
    );
  }
}
