import React, { Component } from "react";
import Task from "../Task";
export class TaskList extends Component {
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

export default TaskList;
