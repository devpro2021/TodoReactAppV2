import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Footer.css';
import TasksFilter from '../TasksFilter';
const Footer = ({ counter, deleteCompleted, filter, onSelectFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{counter} items left</span>
      <TasksFilter filter={filter} onSelectFilter={onSelectFilter} />
      <button className="clear-completed" onClick={deleteCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  counter: 0,
  deleteCompleted: () => {},
  filter: 'all',
  onSelectFilter: () => {},
};
Footer.propTypes = {
  counter: PropTypes.number,
  deleteCompleted: PropTypes.func,
  filter: PropTypes.string,
  onSelectFilter: PropTypes.func,
};
export default Footer;
