import React from "react";
import logo from "./todo.svg";
import "./App.css";

const ENTER_KEY = 13;
const ALL_TODOS = "all";
//const ACITVE_TODOS = "active";
//const COMPLETED_TODOS = "completed";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newTodo: "",
      editing: null,
      todoItems: [],
      nowShowing: ALL_TODOS 
    };
  }

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = this.state.newTodo.trim();

    if (val) {
      //this.props.addTodo(val);
      this.setState({newTodo: ''});
    }
  }

  toggleAll = (event) => {
    //var checked = event.target.checked;
    //this.props.toggleAll(checked);
  }

  toggle = (todo) => {
    //this.props.toggle(todo);
  }

  destroy = (todo) => {
    //this.props.destroy(todo);
  }

  edit = (todo) => {
    this.setState({ editing: todo.id });
  }

  save = (todo, text) => {
    this.props.save(todo, text);
    this.setState({ editing: null });
  }

  cancel = (event) => {
    this.setState({editing: null});
  }

  clearCompleted = () => {
    //this.props.clearCompleted;
  }

  render() {
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
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
            </p>
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.newTodo}
              onKeyDown={this.handleNewTodoKeyDown}
              onChange={this.handleChange}
              autoFocus={true}
            />
          </header>
          {/* {main}
            {footer} */}
        </div>
      </div>
    );
  }
}

export default App;
