import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import "./TodoItem.css";

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

class TodoItem extends React.Component {
  constructor() {
    super();
    this.state = {
      editText: "",
    };
  }

  handleChange = (event) => {
    if (this.props.editing) {
      this.setState({ editText: event.target.value });
    }
  };

  handleSubmit = (event) => {
    const val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({ editText: "" });
    } else {
      //this.props.onDestroy();
    }
  };

  handleEdit = () => {
    this.props.onEdit();
    this.setState({ editText: this.props.todo.value });
  };

  handleKeyDown = (event) => {
    if (event.which === ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.value });
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  };

  // getInitialState = () => {
  //   return {editText: this.props.todo.value};
  // };

  render() {
    return (
      <li>
        <div>
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle}
          />
          <label
            className={this.props.editing ? "hidden" : ""}
            onDoubleClick={this.handleEdit}
          >
            {this.props.todo.value}
          </label>
          <FontAwesomeIcon icon={faTimesCircle} onClick={this.props.onDestroy} />
          <input
            className={this.props.editing ? "" : "hidden"}
            value={this.state.editText}
            onBlur={this.handleSubmit}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
      </li>
    );
  }
}

export default TodoItem;
