import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoLists from './components/TodoLists';
import CheckAllAndRemaining from './components/CheckAllAndRemaining';
import TodoFilter from './components/TodoFilter';
import ClearCompleted from './components/ClearCompleted';
import { useEffect, useState } from 'react';

function App() {

  let [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/todo")
      .then(res => res.json())
      .then(data => {
        setTodos(data);
      })
  }, []);

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

    let remainingTodos = todos.filter(t => !t.completed).length;

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoLists todos={todos} destoryTodo={destoryTodo} updateTodo={updateTodo} />
        <CheckAllAndRemaining remainingTodos={remainingTodos} checkAll={checkAll} />
        <div className="other-buttons-container">
          <TodoFilter />
          <ClearCompleted />
        </div>
      </div>
    </div>
  );
}

export default App;
