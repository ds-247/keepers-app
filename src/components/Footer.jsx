import React from "react";

export default function Header() {
  const curYear = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright &copy; {curYear}</p>
    </footer>
  );
}
