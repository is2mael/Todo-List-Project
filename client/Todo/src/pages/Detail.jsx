import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../utils/axios";

export default function Detail() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const fetchTodoById = async () => {
    try {
      const response = await instance({
        method: "GET",
        url: `/todo-list/${id}`,
      });
      console.log(response.task);
      

      setTitle(response.task.title);
      setDescription(response.task.description);
      setIsCompleted(response.task.isCompleted);
    } catch (error) {}
  };

  useEffect(() => {
    fetchTodoById();
  }, [id]);

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">
          {description}
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
}
