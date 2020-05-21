import React from "react";
import { pluralize } from "../utils/utils";
import "./TodoFooter.css";

class TodoFooter extends React.Component {
  addActiveClass = () => {
    const filters = document.getElementById("filters");
    const btns = filters.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
    const activeBtn = document.getElementsByClassName("btn active");
    this.props.setNowShowing(activeBtn[0].innerText.toLowerCase());
  };
  render() {
    let credits = (<p>
      Icons made by{" "}
      <a
        href="https://www.flaticon.com/authors/kiranshastry"
        title="Kiranshastry"
      >
        Kiranshastry
      </a>{" "}
      from{" "}
      <a href="https://www.flaticon.com/" title="Flaticon">
        {" "}
        www.flaticon.com
      </a>
    </p>)
    let activeTodoWord = pluralize(this.props.count, "active item");
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
    //let nowShowing = this.props.nowShowing;

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters" id="filters">
          <li>
            <a href="#/" onClick={this.addActiveClass} className="btn active">
              All
            </a>
          </li>{" "}
          <li>
            <a href="#/active" onClick={this.addActiveClass} className="btn">
              Active
            </a>
          </li>{" "}
          <li>
            <a href="#/completed" onClick={this.addActiveClass} className="btn">
              Completed
            </a>
          </li>
        </ul>
        {clearButton}
        {credits}
      </footer>
    );
  }
}

export default TodoFooter;
