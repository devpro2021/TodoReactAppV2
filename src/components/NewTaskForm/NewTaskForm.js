import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';
const NewTaskForm = ({ addNewTask }) => {
  const [state, setState] = useState({
    value: '',
    minValue: '',
    secValue: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    let { value, minValue, secValue } = state;
    const trimDescription = value.replace(/ +/g, ' ').trim();
    if (trimDescription === '') {
      alert('Please enter a description');
      return;
    } else if (minValue === '') {
      alert('Please enter value of minute');
      return;
    } else {
      addNewTask(trimDescription, minValue, secValue);
    }

    setState({ ...state, value: '', minValue: '', secValue: '' });
  };

  const onChangeLabel = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={state.value}
        name="value"
        onChange={onChangeLabel}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        name="minValue"
        autoFocus
        onChange={onChangeLabel}
        value={state.minValue}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        name="secValue"
        autoFocus
        onChange={onChangeLabel}
        value={state.secValue}
      />
      <button type="submit"></button>
    </form>
  );
};

NewTaskForm.defaultProps = {
  addNewTask: () => {},
};
NewTaskForm.propTypes = {
  addNewTask: PropTypes.func,
};
export default NewTaskForm;
