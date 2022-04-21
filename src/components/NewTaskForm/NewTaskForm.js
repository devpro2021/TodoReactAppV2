import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';
export default class NewTaskForm extends Component {
  static defaultProps = {
    addNewTask: () => {},
  };
  static propTypes = {
    addNewTask: PropTypes.func,
  };
  state = {
    value: '',
    minValue: '',
    secValue: '',
  };
  onSubmit = (e) => {
    e.preventDefault();
    let { value, minValue, secValue } = this.state;
    const { addNewTask } = this.props;

    const trimDescription = value.replace(/ +/g, ' ').trim();
    if (trimDescription === '') {
      alert('Please enter a description');
      return;
    } else if (minValue === '') {
      alert('Please enter value of minute');
      return;
    } else {
      addNewTask(trimDescription, (minValue = 0), secValue);
    }

    this.setState({ value: '', minValue: '', secValue: '' });
  };

  onChangeLabel = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.value}
          name="value"
          onChange={this.onChangeLabel}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          name="minValue"
          autoFocus
          onChange={this.onChangeLabel}
          value={this.state.minValue}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          name="secValue"
          autoFocus
          onChange={this.onChangeLabel}
          value={this.state.secValue}
        />
        <button type="submit"></button>
      </form>
    );
  }
}
