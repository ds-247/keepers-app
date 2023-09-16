import React, { useState } from "react";
import "./inputArea.css";

export default function InputArea({ onAdd }) {
  const [newKeep, setNewKeep] = useState({ title: "", content: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setNewKeep((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newKeep.title === "" && newKeep.content === "") return;
    onAdd(newKeep);
    setNewKeep({ title: "", content: "" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="box">
        <input
          name="title"
          type="text"
          className="input"
          onChange={handleChange}
          value={newKeep.title}
          placeholder="Title..."
        />
        <textarea
          name="content"
          type="text"
          className="textarea"
          onChange={handleChange}
          placeholder="Take a note..."
          value={newKeep.content}
          rows="3"
        />
        <button className="add">+</button>
      </div>
    </form>
  );
}
