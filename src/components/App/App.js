import React, { useState } from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';

const App = () => {
  const [dataTasks, setDataTasks] = useState([
    createTask('Completed task', 10, 0),
    createTask('Editing task', 10, 0),
    createTask('Active task', 10, 0),
  ]);
  const [filter, setFilter] = useState('all');

  function createTask(descr, minValue, secValue) {
    let maxId = 1;
    let minNumber = parseInt(minValue);
    let secNumber = parseInt(secValue);
    if (secNumber > 60) {
      minNumber += Math.trunc(secNumber / 60);
      secNumber -= Math.trunc(secNumber / 60) * 60;
    }
    return {
      id: Math.floor(Math.random() * 100),
      description: descr,
      created: new Date(),
      completed: false,
      editing: false,
      checked: false,
      minValue: minNumber,
      secValue: secNumber,
    };
  }
  const addNewTask = (task, minValue, secValue) => {
    const newTask = createTask(task, minValue, secValue);
    setDataTasks([...dataTasks, newTask]);
  };
  const deleteTask = (id) => {
    const newTasks = dataTasks.filter((item) => item.id !== id);
    setDataTasks(newTasks);
  };

  const onCompleted = (id) => {
    const idx = dataTasks.findIndex((t) => t.id === id);
    const oldItem = dataTasks[idx];
    const newItem = { ...dataTasks[idx], completed: !oldItem.completed, checked: !oldItem.checked };
    const newDataTasks = [...dataTasks.slice(0, idx), newItem, ...dataTasks.slice(idx + 1)];
    setDataTasks(newDataTasks);
  };
  const deleteAllCompletedTasks = () => {
    const newData = dataTasks.filter((item) => !item.completed);
    setDataTasks(newData);
  };
  const filterFunc = (items, filter) => {
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
  const onSelectFilter = (filter) => {
    setFilter(filter);
  };
  const visibleItems = filterFunc(dataTasks, filter);
  const countCompleted = dataTasks.filter((t) => t.completed).length;
  const todoCount = dataTasks.length - countCompleted;
  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addNewTask={addNewTask} />
      </header>
      <section className="main">
        <TaskList dataTasks={visibleItems} deleteTask={deleteTask} onCheckBoxClick={onCompleted} filterData={filter} />
        <Footer
          counter={todoCount}
          deleteCompleted={deleteAllCompletedTasks}
          filter={filter}
          onSelectFilter={onSelectFilter}
        />
      </section>
    </>
  );
};

App.defaultProps = {
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

App.propTypes = {
  dataTasks: PropTypes.array.isRequired,
  filter: PropTypes.string,
};
export default App;
