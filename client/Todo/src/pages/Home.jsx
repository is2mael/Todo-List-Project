import React, { useState, useEffect } from "react";
import { instance } from "../utils/axios";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const tips = [
  "Great job! You’ve conquered today’s challenge. Remember, consistency is key to achieving greatness.",
  "Well done! Recovery is just as important as the workout itself. Hydrate, refuel, and rest well to come back stronger tomorrow!",
  "Another step closer to your goal! Keep the momentum going, and remember why you started this journey.",
  "Your dedication today is shaping a stronger, healthier you. Be proud of what you accomplished!",
  "Start your day by tackling the easiest task first. Small wins early on will build momentum for the rest of your list.",
  "Break big tasks into bite-sized chunks. Every small step is progress—no task is too big when you take it one piece at a time.",
  "Stay flexible! Don’t stress if things don’t go according to plan. Adjust your list as needed and keep moving forward.",
  "Celebrate every task you check off—no matter how small. Each accomplishment is a step closer to your bigger goals.",
  "Turn your to-do list into a game. Challenge yourself to beat your own record for completing tasks, and reward yourself along the way!",
];

const randomTip = tips[Math.floor(Math.random() * tips.length)];

export default function Home() {
  const [todos, setTodos] = useState([]);

  const fetchTodo = async () => {
    try {
      const response = await instance({
        method: "GET",
        url: "/todo-list",
      });
      console.log(response.data.data);
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching todos", error);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      // Tampilkan konfirmasi penghapusan
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await instance.delete(`/todo-list/${todoId}`);

        setTodos(todos.filter((todo) => todo.id !== todoId));

        Swal.fire("Deleted!", "Your todo has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      Swal.fire("Error!", "There was a problem deleting your todo.", "error");
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="text-center pt-5">
          <h1>Todo List</h1>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <Link to="/create">
            <button type="button" className="btn btn-success">
              Create
            </button>
          </Link>
        </div>

        <div className="mt-4">
          {todos.length > 0 ? (
            <Table todos={todos} handleDelete={handleDelete} />
          ) : (
            <p className="text-center mt-5">There is No Todo List</p>
          )}
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="text-lg text-muted">Tips: {randomTip}</p>
      </div>
    </>
  );
}
