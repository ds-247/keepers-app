import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function Note({ id, onDelete, title, content }) {
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <DeleteOutlineIcon className="delete" onClick={() => onDelete(id)} />
    </div>
  );
}
