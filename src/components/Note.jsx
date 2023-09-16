import React from "react";
import "./note.css";

export default function Note({ id, onDelete, title, content }) {
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={() => onDelete(id)}>DELETE</button>
    </div>
  );
}
