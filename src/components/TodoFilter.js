import React, { useEffect, useState } from 'react'

export default function TodoFilter ({filterBy}) {
  let [filterTodos, setFilterTodos] = useState("All");
  useEffect(() => {
    filterBy(filterTodos);
  }, [filterTodos, filterBy]);

  return (
    <div>
        <button
          className={`button filter-button ${filterTodos === "All" && " filter-button-active"}`}
          onClick={e => setFilterTodos("All")}
        >
            All
        </button>
        <button
          className={`button filter-button ${filterTodos === "Active" && " filter-button-active"}`}
          onClick={e => setFilterTodos("Active")}
        >
            Active
        </button>
        <button
          className={`button filter-button ${filterTodos === "Completed" && " filter-button-active"}`}
          onClick={e => setFilterTodos("Completed")}
        >
          Completed
        </button>
    </div>
  )
}
