import React from 'react'
import Todo from './Todo'

export default function TodoLists ({todos}) {
  return (
    <ul className="todo-list">
      {todos && todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  )
}