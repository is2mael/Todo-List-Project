import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../utils/axios";
import Swal from "sweetalert2";

export default function Edit() {
  const nav = useNavigate();
  const { id } = useParams();

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    isCompleted: "",
  });

  // Fetch data for the todo
  const fetchData = async () => {
    try {
      const response = await instance({
        method: "GET",
        url: `/todo-list/${id}`,
      });
      setTodo(response.data.task);
    } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
      });
    }
  };

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle update of todo
  const handleUpdate = async () => {
    try {
      await instance({
        method: "PUT",
        url: `/todo-list/${id}`,
        data: todo,
      });

      Swal.fire({
        title: "Good job!",
        text: "Todo updated successfully!",
        icon: "success",
      });

      nav("/"); // Navigate back to the home page or list of todos
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update the todo",
        icon: "error",
      });
    }
  };

  // Fetch the todo data when the component mounts
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="container mt-5 pt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center mt-2">Edit Todo</h3>

              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Title"
                  value={todo.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  placeholder="Description"
                  value={todo.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-center">
                  <label className="form-check-label mb-0" htmlFor="isCompleted">
                    Completed?
                  </label>
                  <div className="form-check ms-2">
                    <input
                      type="checkbox"
                      name="isCompleted"
                      className="form-check-input"
                      checked={todo.isCompleted}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update Todo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
