import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TasksFilter.css';
const TasksFilter = ({ filter, onSelectFilter }) => {
  const buttonsArray = [
    {
      name: 'all',
      label: 'All',
    },
    {
      name: 'active',
      label: 'Active',
    },
    {
      name: 'completed',
      label: 'Completed',
    },
  ];
  const buttons = buttonsArray.map(({ name, label }) => {
    const active = filter === name;
    const selectedClass = active ? 'selected' : null;
    return (
      <li key={name}>
        <button className={selectedClass} onClick={() => onSelectFilter(name)}>
          {label}
        </button>
      </li>
    );
  });
  return <ul className="filters"> {buttons} </ul>;
};

TasksFilter.defaultProps = {
  filter: 'all',
  onSelectFilter: () => {},
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onSelectFilter: PropTypes.func,
};
export default TasksFilter;
