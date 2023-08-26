import React, { useState } from 'react'

export default function Todo ({todo, destoryTodo, updateTodo}) {
  let [isEdit, setIsEdit] = useState(false);
  let [updTodo, setUpdTodo] = useState(todo.title);

  let deleteHandler = () => {
    destoryTodo(todo.id);
  }

  let updateHandler = e => {
    e.preventDefault();
    let updatedTodo = {
      id : todo.id,
      title : updTodo,
      completed : todo.completed
    }
    updateTodo(updatedTodo);
    setIsEdit(false);
  }

  let updateCheckbox = ()  => {
    let updatedTodo = {
      id : todo.id,
      title : updTodo,
      completed : !todo.completed
    }
    updateTodo(updatedTodo);
  }

  return (
    <li className="todo-item-container">
        <div className="todo-item">
            <input type="checkbox" onChange={updateCheckbox} checked={todo.completed} />
            {!isEdit && <span className="todo-item-label" onDoubleClick={e => setIsEdit(true)}>{todo.title}</span>}
            {isEdit &&
            <form onSubmit={updateHandler}>
              <input
                type="text"
                className="todo-item-input"
                onChange={e => setUpdTodo(e.target.value)}
                value={updTodo}
                />
            </form>}
        </div>
        <button className="x-button" onClick={deleteHandler}>
            <svg
            className="x-button-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
            </svg>
        </button>
    </li>
  )
}
