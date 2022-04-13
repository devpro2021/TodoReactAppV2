import React, { Component } from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  static defaultProps = {
    addNewTask: () => {},
  };
  static propTypes = {
    addNewTask: PropTypes.func,
  };
  state = {
    value: "",
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.value) {
      this.props.addNewTask(this.state.value.trim());
    }
    this.setState({ value: "" });
  };
  onChangeLabel = (e) => {
    this.setState({ value: e.target.value });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className='new-todo'
          placeholder='What needs to be done?'
          autoFocus
          value={this.state.value}
          onChange={this.onChangeLabel}
        />
      </form>
    );
  }
}