import React, { useEffect, useState } from 'react'

export default function TodoFilter ({todoFilter}) {
  let [filter, setFilter] = useState("All");
  useEffect(() => {
    todoFilter(filter);
  }, [filter, todoFilter])

  return (
    <div>
        <button
          className={`button filter-button ${filter === "All" &&  "filter-button-active"}`}
          onClick={e => setFilter("All")}>
            All
        </button>
        <button
          className={`button filter-button ${filter === "Active" &&  "filter-button-active"}`}
          onClick={e => setFilter("Active")}>
            Active
        </button>
        <button
          className={`button filter-button ${filter === "Completed" &&  "filter-button-active"}`}
          onClick={e => setFilter("Completed")}>
            Completed
        </button>
    </div>
  )
}
