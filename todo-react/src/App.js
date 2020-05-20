import React from "react";
import logo from "./todo.svg";
import "./App.css";
import TodoItem from "./components/TodoItem";
import axios from "axios";
import generateUuid from "./utils/uuid"

const API = "http://localhost:3001/todolist";
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
      nowShowing: ALL_TODOS,
    };
  }

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  createTodoObject = () => {
    const todoObject = {
      id: generateUuid(),
      value: this.state.newTodo,
      completed: false,
    };
    return todoObject;
  };

  addTodo = async () => {
    const todoToAdd = this.createTodoObject();
    console.log(todoToAdd);
    const response = await axios.post(API, todoToAdd);
    const currentTodoItems = this.state.todoItems;
    currentTodoItems.push(response);
    this.updateTodoList(currentTodoItems);
  };

  updateTodoList = (updatedList) => {
    this.setState({ todoItems: updatedList });
  };

  handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = this.state.newTodo.trim();

    if (val) {
      this.addTodo(val);
      this.setState({ newTodo: "" });
    }
  };

  getTodos = async () => {
    const { data } = await axios.get(API);
    this.updateTodoList(data);
  }

  toggleAll = (event) => {
    //var checked = event.target.checked;
    //this.props.toggleAll(checked);
  };

  toggle = (todo) => {
    //this.props.toggle(todo);
  };

  destroy = (todo) => {
    //this.props.destroy(todo);
  };

  edit = (todo) => {
    this.setState({ editing: todo.id });
  };

  save = (todo, text) => {
    //this.props.save(todo, text);
    this.setState({ editing: null });
  };

  cancel = (event) => {
    this.setState({ editing: null });
  };

  clearCompleted = () => {
    //this.props.clearCompleted;
  };

  componentDidMount = () => {
    this.getTodos();
  }

  render() {
    let footer;
    let main;
    let todos = this.state.todoItems;

    let shownTodos = todos.filter((todo) => {
      switch (this.state.nowShowing) {
        // case ACTIVE_TODOS:
        //   return !todo.completed;
        // case COMPLETED_TODOS:
        //   return todo.completed;
        default:
          return true;
      }
    });

    let todoItems = shownTodos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy.bind(this, todo)}
          onEdit={this.edit.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save.bind(this, todo)}
          onCancel={this.cancel}
        />
      );
    });

    // let activeTodoCount = todos.reduce((accum, todo) => {
    //   return todo.completed ? accum : accum + 1;
    // }, 0);

    //let completedCount = todos.length - activeTodoCount;

    // if (todos.length) {
    //   main = (
    //     <section className="main">
    //       <input
    //         id="toggle-all"
    //         className="toggle-all"
    //         type="checkbox"
    //         onChange={this.toggleAll}
    //         checked={activeTodoCount === 0}
    //       />
    //       <label htmlFor="toggle-all" />
    //       <ul className="todo-list">{todoItems}</ul>
    //     </section>
    //   );
    // }
    if (todos.length) {
      main = (
        <section className="main">
          <ul className="todolist">{todoItems}</ul>
        </section>
      )
    }

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
          {main}
          {footer}
        </div>
      </div>
    );
  }
}

export default App;
