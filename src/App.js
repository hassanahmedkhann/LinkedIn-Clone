import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser, logout } from "./features/userSlice";
import Login from "./components/Login";
import { auth, db } from "./firebase-config";
import { onAuthStateChanged } from "@firebase/auth";
import Widgets from "./components/Widgets";
import { getDoc, doc } from "@firebase/firestore";

function App() {
  const [image, setImage] = useState();
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const getdata = async () => {
    try {
      const docRef = doc(db, "Posts", auth.currentUser?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImage(docSnap.data().picUrl);
      }
    } catch (error) {
      alert("APP: " + error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getdata();

        dispatch(
          login({
            email: auth.currentUser.email,
            name: auth.currentUser.displayName,
            picUrl: image ? image : null,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [image, dispatch]);
  return (
    <div className="app">
      {!user ? (
        <>
          <Login />
        </>
      ) : (
        <>
          <Header />
          <div className="app-body">
            <Sidebar />
            <Feed />
            <Widgets />
            {/* {Widgets} */}
          </div>
        </>
      )}
      <div className="footer">
        <h4>This app was created with React JS and Firebase.</h4>
        <h4>Owner and Creator:</h4>
        <h1>Hassan Ahmed Khan</h1>
        <h5>Copyrights @ Hassan Ahmed Khan 2021 | All Rights Reserved.</h5>
      </div>
    </div>
  );
}

export default App;
