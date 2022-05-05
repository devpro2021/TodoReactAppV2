import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import './Task.css';
const Task = ({
  secValue,
  minValue,
  onCheckBoxClick,
  description,
  timeAfterCreate,
  checked,
  completed,
  deleteTask,
}) => {
  const [isStart, setIsStart] = useState(false);
  const [timeleft, setTimeleft] = useState(secValue + minValue * 60);
  let counter = null;

  const handlerDone = () => {
    onCheckBoxClick();
    handlePause();
  };
  const handlePause = () => {
    setIsStart(false);
    clearInterval(counter);
  };

  const handleStart = (e) => {
    e.stopPropagation();
    setIsStart(true);
  };

  useEffect(() => {
    if (isStart) {
      if (timeleft > 0) {
        counter = setInterval(() => {
          setTimeleft((timeleft) => timeleft - 1);
        }, 1000);
      } else {
        console.log('yes');
        handlePause();
        onCheckBoxClick();
      }
    }
    return () => clearInterval(counter);
  }, [isStart, timeleft]);

  const buttonTimer = !isStart ? (
    <button type="button" className="icon icon-play" onClick={handleStart} disabled={completed} />
  ) : (
    <button type="button" className="icon icon-pause" onClick={handlePause} />
  );

  return (
    <div className="view">
      <input className="toggle" type="checkbox" readOnly onClick={handlerDone} checked={checked} />
      <div className="label">
        <span className="title" onClick={handlerDone}>
          {description}
        </span>
        <span className="description">
          {buttonTimer}
          <span className="description__time-value">{format(new Date(timeleft * 1000).getTime(), 'm:ss')}</span>
        </span>
        <span className="description">created {timeAfterCreate} ago</span>
      </div>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy" onClick={deleteTask}></button>
    </div>
  );
};

Task.defaultProps = {
  onCheckBoxClick: () => {},
  description: 'new Task',
  timeAfterCreate: new Date(),
  deleteTask: () => {},
  checked: false,
  minValue: 10,
  secValue: 0,
  className: '',
};

Task.propTypes = {
  onCheckBoxClick: PropTypes.func,
  description: PropTypes.string,
  timeAfterCreate: PropTypes.string,
  deleteTask: PropTypes.func,
  checked: PropTypes.bool,
  minValue: PropTypes.number,
  secValue: PropTypes.number,
  className: PropTypes.string,
};

export default Task;
