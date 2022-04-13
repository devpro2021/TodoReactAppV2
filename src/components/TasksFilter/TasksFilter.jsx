import React, { Component } from "react";

export class TasksFilter extends Component {
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];
  render() {
    const { filter, onSelectFilter } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      console.log(filter);
      const active = filter === name;
      const selectedClass = active ? "selected" : null;
      return (
        <li key={name}>
          <button
            className={selectedClass}
            onClick={() => onSelectFilter(name)}
          >
            {label}
          </button>
        </li>
      );
    });
    return <ul className='filters'>{buttons}</ul>;
  }
}

export default TasksFilter;
