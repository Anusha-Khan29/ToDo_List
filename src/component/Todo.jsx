import React, { useState, useEffect } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [val, setVal] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const add = () => {
    if (val.trim()) {
      if (editIndex !== null) {
        // Update the existing item
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex ? val : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        // Add a new item
        setTodos([...todos, val]);
      }
      setVal("");
    }
  };

  const del = (indexToRemove) => {
    setTodos(todos.filter((_, index) => index !== indexToRemove));
  };

  const edit = (indexToEdit) => {
    setVal(todos[indexToEdit]);
    setEditIndex(indexToEdit);
  };

  return (
    <div>
      <div className="ml-[35%] mr-[35%] p-[20px] border border-green-800 bg-gray-300 mt-[135px]">
        <h2 className="text-4xl font-bold text-center text-lime-800">
          ToDo List
        </h2>
        <hr className="m-[3%]" />
        <input
          className="rounded-[20px] w-[70%] pl-[5px] border border-green-800 p-[1.5%]"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          type="text"
          placeholder="Write Something..."
        />
        <button
          className="w-[30%] rounded-[20px] border border-green-800 p-[1.5%] text-green-700 font-semibold"
          onClick={add}
        >
          {editIndex !== null ? "Add" : "Add"}
        </button>

        <div className="text-green-800 rounded-[20px] p-[1.5%]  mt-[2%]">
          <ul className="justify-between">
            {todos.map((todo, index) => (
              <li className="flex justify-between items-center" key={index}>
                {todo}
                <div>
                  <button
                    className="w-[70px] mr-[10px]"
                    onClick={() => edit(index)}
                  >
                    <img className="w-[70%]"  src="/src/assets/edit.png" alt="pic" />
                  </button>
                  <button className="w-[70px]" onClick={() => del(index)}>
                  <img className="w-[40%]" src="/src/assets/del.png" alt="pic" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;

