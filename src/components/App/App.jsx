import React, { Component } from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

class App extends Component {
  maxId = 1;
  state = {
    dataTasks: [
      this.createTask("Completed task"),
      this.createTask("Editing task"),
      this.createTask("Active task"),
    ],
    filter: "all",
  };

  createTask(descr) {
    return {
      id: this.maxId++,
      description: descr,
      created: `created 17 seconds ago`,
      completed: false,
      editing: false,
    };
  }

  addNewTask = (task) => {
    this.setState(({ dataTasks }) => {
      const newTask = this.createTask(task);
      const newDataTasks = [...dataTasks, newTask];
      return {
        dataTasks: newDataTasks,
      };
    });
  };
  deleteTask = (id) => {
    this.setState(({ dataTasks }) => {
      const idx = dataTasks.findIndex((t) => t.id === id);
      const newDataTasks = [
        ...dataTasks.slice(0, idx),
        ...dataTasks.slice(idx + 1),
      ];
      return { dataTasks: newDataTasks };
    });
  };
  onCompleted = (id) => {
    this.setState(({ dataTasks }) => {
      const idx = dataTasks.findIndex((t) => t.id === id);
      const oldItem = dataTasks[idx];
      const newItem = { ...dataTasks[idx], completed: !oldItem.completed };
      const newDataTasks = [
        ...dataTasks.slice(0, idx),
        newItem,
        ...dataTasks.slice(idx + 1),
      ];
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
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.completed);
      case "completed":
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  };
  onSelectFilter = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { dataTasks, filter } = this.state;
    const visibleItems = this.filter(dataTasks, filter);
    const countCompleted = dataTasks.filter((t) => t.completed).length;
    const todoCount = dataTasks.length - countCompleted;
    return (
      <>
        <header className='header'>
          <h1>todos</h1>
          <NewTaskForm addNewTask={this.addNewTask} />
        </header>
        <section className='main'>
          <TaskList
            dataTasks={visibleItems}
            deleteTask={this.deleteTask}
            onCompleted={this.onCompleted}
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

export default App;
