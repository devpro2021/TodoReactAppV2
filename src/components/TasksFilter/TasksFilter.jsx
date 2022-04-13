import React, { Component } from "react";
import PropTypes from "prop-types";

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: "all",
    onSelectFilter: () => {},
  };
  static propTypes = {
    filter: PropTypes.string,
    onSelectFilter: PropTypes.func,
  };
  buttons = [
    { name: "all", label: "All" },
    { name: "active", label: "Active" },
    { name: "completed", label: "Completed" },
  ];
  render() {
    const { filter, onSelectFilter } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
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
