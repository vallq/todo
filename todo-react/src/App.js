import React from "react";
import logo from "./todo.svg";
import "./App.css";
import TodoItem from "./components/TodoItem";
import TodoFooter from "./components/TodoFooter";
import axios from "axios";
import { generateUuid } from "./utils/utils";

const API = "http://localhost:3001/todolist";
const ENTER_KEY = 13;
const ALL_TODOS = "all";
const ACTIVE_TODOS = "active";
const COMPLETED_TODOS = "completed";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newTodo: "",
      editing: null,
      todoItems: [],
      nowShowing: ALL_TODOS,
      allChecked: null,
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
    const currentTodoItems = this.state.todoItems;
    currentTodoItems.push(todoToAdd);
    this.updateTodoList(currentTodoItems);
    await axios.post(API, todoToAdd);
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
  };

  checkAllChecked = () => {
    let currentTodoItems = this.state.todoItems;
    let activeItems = currentTodoItems.filter((todo) => {
      return todo.completed === false;
    });
    if (activeItems > 0) {
      this.setState({ allChecked: false });
    } else if (activeItems === 0) {
      this.setState({ allChecked: true });
    }
  };

  toggleAll = (event) => {
    let currentTodoItems = this.state.todoItems;
    if (this.state.allChecked) {
      currentTodoItems = currentTodoItems.map((todo) => {
        const todoItemId = "/" + todo.id;
        axios.patch(API.concat(todoItemId), {
          completed: false,
        });
        todo.completed = false;
        return todo;
      });
      this.updateTodoList(currentTodoItems);
      this.setState({ allChecked: false });
    } else {
      currentTodoItems = currentTodoItems.map((todo) => {
        const todoItemId = "/" + todo.id;
        axios.patch(API.concat(todoItemId), {
          completed: true,
        });
        todo.completed = true;
        return todo;
      });
      this.updateTodoList(currentTodoItems);
      this.setState({ allChecked: true });
    }
  };

  toggle = async (todo) => {
    const updatedValue = { completed: !todo.completed };
    const todoItemId = "/" + todo.id;
    const { data } = await axios.patch(API.concat(todoItemId), updatedValue);
    const currentTodoItems = this.state.todoItems;
    const updatedTodoItems = currentTodoItems.map((todo) => {
      if (todo.id === data.id) {
        return data;
      } else {
        return todo;
      }
    });
    this.updateTodoList(updatedTodoItems);
  };

  destroy = async (todo) => {
    const targetId = todo.id;
    const todoItemId = "/" + targetId;
    const currentTodoItems = this.state.todoItems;
    const targetIndex = currentTodoItems.indexOf(todo);
    currentTodoItems.splice(targetIndex, 1);
    this.updateTodoList(currentTodoItems);
    await axios.delete(API.concat(todoItemId));
  };

  edit = (todo) => {
    this.setState({ editing: todo.id });
  };

  save = async (todo, text) => {
    const updatedValue = { value: text };
    const todoItemId = "/" + todo.id;
    const { data } = await axios.patch(API.concat(todoItemId), updatedValue);
    const currentTodoItems = this.state.todoItems;
    const updatedTodoItems = currentTodoItems.map((todo) => {
      if (todo.id === data.id) {
        return data;
      } else {
        return todo;
      }
    });
    this.updateTodoList(updatedTodoItems);
    this.setState({ editing: null });
  };

  cancel = (event) => {
    this.setState({ editing: null });
  };

  clearCompleted = async () => {
    await axios.delete(API);
    let currentTodoItems = this.state.todoItems;
    currentTodoItems = currentTodoItems.filter((todo) => {
      return !todo.completed;
    });
    this.updateTodoList(currentTodoItems);
  };

  componentDidMount = () => {
    this.getTodos();
    this.checkAllChecked();
  };

  render() {
    let footer;
    let main;
    let todos = this.state.todoItems;

    let shownTodos = todos.filter((todo) => {
      switch (this.state.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
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

    let activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

    let completedCount = todos.length - activeTodoCount;
    if (activeTodoCount || completedCount) {
      footer = (
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={this.clearCompleted}
        />
      );
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={activeTodoCount === 0}
          />
          <label htmlFor="toggle-all" />
          <ul className="todolist">{todoItems}</ul>
        </section>
      );
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
