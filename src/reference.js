// this file donsent belongs to this app its just for firebase 9 operations
import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "user");

  const [newName, setName] = useState("");
  const [newAge, setAge] = useState(0);
  const [rooms, setRooms] = useState([]);

  useffect(() => {
    let roomData;
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    // console.log(roomData);
  }, []);
  console.log("This is a room>>>>", rooms);
  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: newAge });
  };
  const updateUser = async (id, age, e) => {
    const userDoc = doc(db, "user", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "user", id);
    await deleteDoc(userDoc);
  };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        value={newName}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={newAge}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={createUser}>Add new User</button>
      {users.map((user) => {
        return (
          <div>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button onClick={(e) => updateUser(user.id, user.age)}>
              increase age
            </button>
            <button onClick={(e) => deleteUser(user.id)}>Delete User</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
