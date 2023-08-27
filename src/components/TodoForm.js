import React, { useState } from 'react'

export default function TodoForm ({addTodo}) {
  let [todo, setTodo] = useState("");
  let submitHandler = e => {
    e.preventDefault();
    let newTodo = {
      id : Math.floor(Math.random() * 200),
      title : todo,
      complete : false
    }
    addTodo(newTodo);
    setTodo("");
  }
  return (
    <form action="#" onSubmit={submitHandler}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={e => setTodo(e.target.value)}
        value={todo}
      />
    </form>
  )
}
