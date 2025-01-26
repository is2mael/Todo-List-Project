import React from "react";
import { Link } from "react-router-dom";

export default function Table({ todos, handleDelete }) {

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((e, i) => {
          return (
            <tr>
              <th scope="row">{i + 1}</th>
              <td>{e.title}</td>
              <td>{e.description}</td>
              <td>{e.isCompleted ? "Completed" : "Not Completed"}</td>
              <td>
                <Link to="/detail">
                  <button className="btn btn-info">Detail</button>
                </Link>
                <Link to={`/todo-list/${e.id}`}>
                  <button className="btn btn-primary">Edit</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(e.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
