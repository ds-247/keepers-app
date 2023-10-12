import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, googleProvider, db } from "../config/firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import "./form.css";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse">Loading...</div>
      </div>
    );
  }

  const handleValidation = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    if (!isValidEmail(username)) {
      newErrors.username = "Please enter a valid email address";
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 5 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const isButtonDisabled = !isValidEmail(username) || password.length < 6;

  const userExists = async (email) => {
    try {
      const myCollection = collection(db, "Users");
      const querySnapshot = await getDocs(myCollection);
      let exists = false;
      querySnapshot.forEach((doc) => {
        if (doc.id === email) {
          exists = true;
        }
      });
      return exists;
    } catch (error) {
      console.log("user");
      return false;
    }
  };

  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (ex) {
      console.log("Error while signing up with Google:", ex);
    }
  };

  const SignIn = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (handleValidation()) {
      const userIsExisted = await userExists(username);

      if (userIsExisted === true) {
        signInWithEmailAndPassword(auth, username, password).catch((error) => {
          setErrors((prevData) => ({
            ...prevData,
            password: "Invalid password ...",
          }));
        });
      } else {
        createUserWithEmailAndPassword(auth, username, password)
          .then(() => {
            const userDocRef = doc(db, "Test", username);

            const userData = {
              email: username,
              name: "XYZ",
            };

            setDoc(userDocRef, userData)
              .then(() => {
                setIsLoading(false);
              })
              .catch((error) => {
                console.error("Error creating user document:", error);
              });
          })
          .catch((error) => {
            setErrors((prevData) => ({
              ...prevData,
              username: "UserName already taken ...",
            }));
          });
      }
    }
  };

  return (
    <div className="form-background-image">
      <div className="form-container">
        <form className="form-content" autoComplete="off">
          <h1 className="form-title">Sign In</h1>
          <Box>
            <TextField
              sx={{ margin: "20px", width: "80%" }}
              autoFocus={true}
              name="username"
              label="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                handleValidation();
              }}
            />
            <p style={{ color: "red" }}>{errors.username}</p>

            <TextField
              sx={{ margin: "20px", width: "80%" }}
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleValidation();
              }}
            />
            <p style={{ color: "red" }}>{errors.password}</p>
          </Box>
          <Button
            sx={{ mt: "20px" }}
            variant="contained"
            onClick={SignIn}
            disabled={isButtonDisabled}
          >
            Sign in / Register
          </Button>
          <Button
            sx={{ mt: "20px", ml: "10px" }}
            variant="contained"
            onClick={SignInWithGoogle}
          >
            <GoogleIcon sx={{ mr: "10px" }} /> Google
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
