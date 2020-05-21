import React from "react";
import { BrowserRouter } from "react-router-dom";
import { pluralize } from "../utils/utils";

class TodoFooter extends React.Component {
  render() {
    let activeTodoWord = pluralize(this.props.count, "item");
    let clearButton = null;

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}
        >
          Clear completed
        </button>
      );
    }
    let nowShowing = this.props.nowShowing;

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <li>
            <a
              href="#/"
              className=""
            >
              All
            </a>
          </li>{" "}
          <li>
            <a
              href="#/active"
              className=""
            >
              Active
            </a>
          </li>{" "}
          <li>
            <a
              href="#/completed"
              className=""
            >
              Completed
            </a>
          </li>
        </ul>
        {clearButton}
      </footer>
    );
  }
}

export default TodoFooter;
