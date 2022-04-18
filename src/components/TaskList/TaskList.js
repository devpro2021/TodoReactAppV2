import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';
export default class TaskList extends Component {
  static defaultProps = {
    dataTasks: [],
    deleteTask: () => {},
    onCompleted: () => {},
  };
  static propTypes = {
    dataTasks: PropTypes.array,
    deleteTask: PropTypes.func,
    onCompleted: PropTypes.func,
  };
  render() {
    let { dataTasks, deleteTask, onCompleted, filterData, checked } = this.props;
    const listItems = dataTasks.map((element) => {
      const { id, completed, ...otherData } = element;
      let classNames = 'active';
      if (element.completed) {
        classNames = 'completed';
      }
      if (filterData === 'all') {
        return (
          <li key={id} className={classNames}>
            <Task
              data={otherData}
              deleteTask={() => deleteTask(id)}
              onCompleted={() => onCompleted(id)}
              checked={checked}
            />
          </li>
        );
      }
      if (classNames === filterData) {
        return (
          <li key={id} className={classNames}>
            <Task
              data={otherData}
              deleteTask={() => deleteTask(id)}
              onCompleted={() => onCompleted(id)}
              checked={checked}
              className={classNames}
            />
          </li>
        );
      }
      return null;
    });
    return <ul className="todo-list">{listItems}</ul>;
  }
}
