import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import InputArea from "./components/InputArea";
import { db } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./App.css";

function App() {
  const [keep, setKeep] = useState([]);

  const keepsCollectionRef = collection(db, "keeps");

  useEffect(() => {
    const getKeepsList = async () => {
      try {
        const data = await getDocs(keepsCollectionRef);
        const filteredData = data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setKeep(filteredData);
      } catch (ex) {
        console.log(ex, "error aa gya");
      }
    };

    getKeepsList();
  }, []);

  const handleAdd = async (newKeep) => {
    try {
      const docRef = await addDoc(keepsCollectionRef, newKeep);
      const newId = docRef.id;
      setKeep((prevValue) => [...prevValue, { ...newKeep, id: newId }]);
    } catch (ex) {
      console.log(ex, "error while adding keep");
    }
  };


  const handleDelete = async (id) => {
    // deleteDoc takes the object which you want to delete
    try {
      const keepObj = doc(db, "keeps", id);
      await deleteDoc(keepObj);
      setKeep((prevValue) => prevValue.filter((k) => k.id !== id));
    } catch (ex) {
      console.log(ex, "error at the time of deletion");
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="col">
        <InputArea onAdd={handleAdd} />
        <div className="row">
          {keep.map(($keep) => {
            return (
              <Note
                key={$keep.id}
                id={$keep.id}
                title={$keep.title}
                content={$keep.content}
                onDelete={handleDelete}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
