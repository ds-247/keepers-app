import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Header from "../components/Header";
import SignIn from "./SignIn";
import App from "../App";

function Panel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div className="App">
        {isAuthenticated ? (
          <>
            <Header helo={"hello"} loggedIn={isAuthenticated ? true : false} />
            <App loggedIn={isAuthenticated} />
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </>
  );
}

export default Panel;
