import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';
export default class Footer extends Component {
  static defaultProps = {
    counter: 0,
    deleteCompleted: () => {},
    filter: 'all',
    onSelectFilter: () => {},
  };
  static propTypes = {
    counter: PropTypes.number,
    deleteCompleted: PropTypes.func,
    filter: PropTypes.string,
    onSelectFilter: PropTypes.func,
  };
  render() {
    const { counter, deleteCompleted, filter, onSelectFilter } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{counter} items left</span>
        <TasksFilter filter={filter} onSelectFilter={onSelectFilter} />
        <button className="clear-completed" onClick={deleteCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
