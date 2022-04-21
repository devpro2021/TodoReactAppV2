import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';

export default class App extends Component {
  static defaultProps = {
    dataTasks: [
      {
        id: 1,
        description: 'new Task',
        created: new Date(),
        completed: false,
        editing: false,
        checked: false,
        minValue: 10,
        secValue: 0,
      },
    ],
    filter: 'all',
  };
  static propTypes = {
    dataTasks: PropTypes.array.isRequired,
    filter: PropTypes.string,
  };
  maxId = 1;
  state = {
    dataTasks: [
      this.createTask('Completed task', 10, 0),
      this.createTask('Editing task', 10, 0),
      this.createTask('Active task', 10, 0),
    ],
    filter: 'all',
  };

  createTask(descr, minValue, secValue) {
    let minNumber = parseInt(minValue);
    let secNumber = parseInt(secValue);
    if (secNumber > 60) {
      minNumber += Math.trunc(secNumber / 60);
      secNumber -= Math.trunc(secNumber / 60) * 60;
    }
    return {
      id: this.maxId++,
      description: descr,
      created: new Date(),
      completed: false,
      editing: false,
      checked: false,
      minValue: minNumber,
      secValue: secNumber,
    };
  }

  addNewTask = (task, minValue, secValue) => {
    this.setState(({ dataTasks }) => {
      const newTask = this.createTask(task, minValue, secValue);
      const newDataTasks = [...dataTasks, newTask];
      return {
        dataTasks: newDataTasks,
      };
    });
  };
  deleteTask = (id) => {
    this.setState(({ dataTasks }) => {
      const idx = dataTasks.findIndex((t) => t.id === id);
      const newDataTasks = [...dataTasks.slice(0, idx), ...dataTasks.slice(idx + 1)];
      return { dataTasks: newDataTasks };
    });
  };
  onCompleted = (id) => {
    this.setState(({ dataTasks }) => {
      const idx = dataTasks.findIndex((t) => t.id === id);
      const oldItem = dataTasks[idx];
      const newItem = { ...dataTasks[idx], completed: !oldItem.completed, checked: !oldItem.checked };
      const newDataTasks = [...dataTasks.slice(0, idx), newItem, ...dataTasks.slice(idx + 1)];
      return {
        dataTasks: newDataTasks,
      };
    });
  };
  deleteAllCompletedTasks = () => {
    this.setState(({ dataTasks }) => {
      const newData = dataTasks.filter((item) => !item.completed);
      return {
        dataTasks: newData,
      };
    });
  };

  filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  };
  onSelectFilter = (filter) => {
    this.setState({ filter: filter });
  };

  render() {
    const { dataTasks, filter } = this.state;
    const visibleItems = this.filter(dataTasks, filter);
    const countCompleted = dataTasks.filter((t) => t.completed).length;
    const todoCount = dataTasks.length - countCompleted;
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addNewTask={this.addNewTask} />
        </header>
        <section className="main">
          <TaskList
            dataTasks={visibleItems}
            deleteTask={this.deleteTask}
            onCompleted={this.onCompleted}
            filterData={filter}
          />
          <Footer
            counter={todoCount}
            deleteCompleted={this.deleteAllCompletedTasks}
            filter={filter}
            onSelectFilter={this.onSelectFilter}
          />
        </section>
      </>
    );
  }
}
