import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { instance } from "../utils/axios";

export default function Detail() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState("");

  const fetchTodoById = async (id) => {
    try {
      const response = await instance({
        method: "GET",
        url: `/todo-list/${id}`,
      });
      console.log(response.data.task);

      setTitle(response.data.task.title);
      setDescription(response.data.task.description);
      setIsCompleted(response.data.task.isCompleted);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTodoById(id);
  }, [id]);

  return (
    <div
      className="container d-flex justify-content-center align-items-center pt-5 mt-5"
      style={{ minHeight: "50vh" }}
    >
      <div className="card shadow" style={{ width: "25rem" }}>
        <div className="card-body">
          <h5 className="card-title">Aktivitas:{title}</h5>
          <p className="card-text">Deskripsi: {description}</p>
          <p className="card-text">Status: {isCompleted ? "Complete" : "Not Complete"}</p>
          <Link to="/" className="btn btn-primary">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
