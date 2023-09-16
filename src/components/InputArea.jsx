import React, { useState } from "react";
import "./inputArea.css";

export default function InputArea({ onAdd }) {
  const [newKeep, setNewKeep] = useState({ title: "", content: "" });
  const [isFocused, setFocused] = useState(false);

  function handleFocus() {
    console.log("handle focus triggered..");
    setFocused(true);
  }

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
    setFocused(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="box">
        {!isFocused && (
          <input
            type="text"
            className="input shadow rounded"
            placeholder="Keep..."
            onClick={handleFocus}
          />
        )}
        {isFocused && (
          <>
            <section className="shadow">
              <input
                name="title"
                autoFocus
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
            </section>
            <button className="add">+</button>
          </>
        )}
      </div>
    </form>
  );
}
