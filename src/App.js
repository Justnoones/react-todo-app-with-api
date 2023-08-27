import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoLists from './components/TodoLists';
import CheckAllAndRemaining from './components/CheckAllAndRemaining';
import TodoFilter from './components/TodoFilter';
import ClearCompleted from './components/ClearCompleted';
import { useCallback, useEffect, useState } from 'react';

function App() {

  let [todos, setTodos] = useState([]);
  let [todosFilter, setTodosFilter] = useState(todos);

  useEffect(() => {
    fetch("http://localhost:3001/todo")
      .then(res => res.json())
      .then(data => {
        setTodos(data);
        setTodosFilter(data);
      })
  }, []);

  let todoFilterFun = useCallback(filter => {
    if (filter === "All") {
       setTodosFilter(todos);
    } else if (filter === "Active") {
      setTodosFilter(todos.filter(td => !td.completed));
    } else if (filter === "Completed") {
      setTodosFilter(todos.filter(td => td.completed));
    }
  }, [todos]);

  let addTodo = todo => {
    // server
    fetch("http://localhost:3001/todo", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(todo)
    })
    
    // client
    setTodos(ps => [...ps, todo]);
  }

  let destoryTodo = todoId => {
    // server
    fetch(`http://localhost:3001/todo/${todoId}`, {
      method : "DELETE"
    });

    // client
    setTodos(ps => ps.filter(todo => todo.id !== todoId));
  }

  let updateTodo = todo => {
    // server
    fetch(`http://localhost:3001/todo/${todo.id}`, {
      method : "PATCH",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(todo)
    });

    // client
    setTodos(ps => {
      return ps.map(td => {
        if (td.id === todo.id) {
          return todo;
        }
      return td;
      })
    })
  }

  let checkAll = () => {
    // server
    todos.forEach(td => {
      td.completed = true;
      updateTodo(td);
    })

    // client
    setTodos(ps => ps.map(td => ( {...td, completed : true} )))
  }

  let clearCompleted = () => {
    // server
    todos.map(todo => {
      if (todo.completed) {
        destoryTodo(todo.id);
      }
      return true;
    });


    // client
    setTodos(ps => ( ps.filter(td => !td.completed) ));
  }

    let remainingTodos = todos.filter(t => !t.completed).length;

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoLists todos={todosFilter} destoryTodo={destoryTodo} updateTodo={updateTodo} />
        <CheckAllAndRemaining remainingTodos={remainingTodos} checkAll={checkAll} />
        <div className="other-buttons-container">
          <TodoFilter todoFilter={todoFilterFun} />
          <ClearCompleted clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;
