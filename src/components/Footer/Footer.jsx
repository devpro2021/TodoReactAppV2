import React, { Component } from "react";
import TasksFilter from "../TasksFilter";

export class Footer extends Component {
  render() {
    const { counter, deleteCompleted, filter, onSelectFilter } = this.props;
    return (
      <footer className='footer'>
        <span className='todo-count'>{counter} items left</span>
        <TasksFilter filter={filter} onSelectFilter={onSelectFilter} />
        <button className='clear-completed' onClick={deleteCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
