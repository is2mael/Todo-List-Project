import { useState, useEffect } from "react";
import Table from "../components/Table";
import { instance } from "../utils/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateTodo() {
  const nav = useNavigate();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTodo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreate = async () => {
    try {
      await instance.post("/todo-list", newTodo);
      setNewTodo({
        title: "",
        description: "",
        isCompleted: false,
      });

      setTodos({
        title: "",
        description: "",
        isCompleted: false,
      });
      nav("/");
      Swal.fire({
        title: "Good job!",
        text: "Success Create New Todo!",
        icon: "success",
      });
    } catch (error) {
      console.error("Failed to create todo", error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center mt-2">Create New Todo</h3>

              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={newTodo.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  placeholder="Description"
                  value={newTodo.description}
                  onChange={handleInputChange}
                />
              </div>

              {/* <div className="mb-3">
                <div className="d-flex align-items-center justify-content-center">
                  <label
                    className="form-check-label mb-0"
                    htmlFor="isCompleted"
                  >
                    Completed?
                  </label>
                  <div className="form-check ms-2">
                    <input
                      type="checkbox"
                      name="isCompleted"
                      className="form-check-input"
                      checked={newTodo.isCompleted}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div> */}

              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create Todo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
