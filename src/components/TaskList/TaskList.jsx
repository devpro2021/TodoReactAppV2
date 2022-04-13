import React, { Component } from "react";
import PropTypes from "prop-types";

import Task from "../Task";
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
    const { dataTasks, deleteTask, onCompleted } = this.props;
    return (
      <ul className='todo-list'>
        {dataTasks.map((element) => {
          const { id, completed, ...otherData } = element;
          return (
            <li key={id} className={completed ? "completed" : null}>
              <Task
                data={otherData}
                deleteTask={() => deleteTask(id)}
                onCompleted={() => onCompleted(id)}
              />
            </li>
          );
        })}
      </ul>
    );
  }
}
