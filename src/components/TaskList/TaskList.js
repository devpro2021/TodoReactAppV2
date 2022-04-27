import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import Task from '../Task';
import './TaskList.css';
const TaskList = ({ dataTasks, deleteTask, filterData, onCheckBoxClick }) => {
  const listItems = dataTasks.map((element) => {
    const { id, minValue, secValue } = element;
    const timeAfterCreate = formatDistanceToNow(new Date(element.created));
    let classNames = '';
    let checked = false;
    if (element.completed) {
      classNames = 'completed';
      checked = true;
    }
    if (filterData === 'all') {
      return (
        <li key={id} className={classNames}>
          <Task
            description={element.description}
            completed={element.completed}
            timeAfterCreate={timeAfterCreate}
            deleteTask={() => deleteTask(id)}
            onCheckBoxClick={() => onCheckBoxClick(id)}
            checked={checked}
            minValue={minValue}
            secValue={secValue}
          />
        </li>
      );
    }
    if (classNames === filterData) {
      return (
        <li key={id} className={classNames}>
          <Task
            description={element.description}
            timeAfterCreate={timeAfterCreate}
            deleteTask={() => deleteTask(id)}
            onCheckBoxClick={() => onCheckBoxClick(id)}
            checked={checked}
            minValue={minValue}
            secValue={secValue}
            className={classNames}
          />
        </li>
      );
    }
    return null;
  });
  return <ul className="todo-list">{listItems}</ul>;
};

TaskList.defaultProps = {
  dataTasks: [],
  deleteTask: () => {},
  onCheckBoxClick: () => {},
};
TaskList.propTypes = {
  dataTasks: PropTypes.array,
  deleteTask: PropTypes.func,
  onCheckBoxClick: PropTypes.func,
};

export default TaskList;
