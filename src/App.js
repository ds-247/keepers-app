import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Note from "./components/Note";
import InputArea from "./components/InputArea";
import { db, auth } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./App.css";
import "./App-responsive.css";

function App() {
  const [keep, setKeep] = useState([]);

  const keepsCollectionRef = collection(
    db,
    `/Test/${auth.currentUser.email}/keeps`
  );

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
    try {
      const keepObj = doc(db, `/Test/${auth.currentUser.email}/keeps`, id);
      console.log(keepObj);
      console.log(id);
      await deleteDoc(keepObj);
      setKeep((prevValue) => prevValue.filter((k) => k.id !== id));
    } catch (ex) {
      console.log(ex, "error at the time of deletion");
    }
  };

  return (
    <>
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
    </>
  );
}

export default App;
