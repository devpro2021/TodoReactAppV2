import React, { Component } from "react";

class Task extends Component {
  render() {
    const { description } = this.props.data;
    return (
      <div className='view'>
        <input className='toggle' type='checkbox' />
        <label>
          <span className='description' onClick={this.props.onCompleted}>
            {description}
          </span>
          <span className='created'>created 5 minutes ago</span>
        </label>
        <button className='icon icon-edit'></button>
        <button
          className='icon icon-destroy'
          onClick={this.props.deleteTask}
        ></button>
      </div>
    );
  }
}

export default Task;
