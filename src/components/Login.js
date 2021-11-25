import React, { useState } from "react";
import "./Login.css";
import icon from "../Images/icon2.png";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { login } from "../features/userSlice";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [pic, setPic] = useState();
  const dispatch = useDispatch();
  const handleimage = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPic(reader.result);
    };
    reader.readAsDataURL(image);
  };
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  // const [picture, setPicture] = useState();

  // const getdata = async () => {
  //   try {
  //     const docRef = doc(db, "Posts", auth.currentUser.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap) {
  //       setPicture(docSnap.data().picUrl);
  //     }
  //   } catch (error) {
  //     alert("Get Data: " + error);
  //   }
  // };

  const loginapp = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, pass);
      // const docRef = doc(db, "Posts", auth.currentUser.uid);

      // const docSnap = await getDoc(docRef);
      // if (docSnap.exists()) {
      //   setPicture(docSnap.data().picUrl);
      // }
      if (pic) {
        dispatch(
          login({
            email: auth.currentUser.email,
            name: auth.currentUser.displayName,
            picUrl: pic ? pic : null,
          })
        );
      }
      alert("Logging In");
    } catch (error) {
      alert("Login Error: " + error);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    if (fname === "" && lname === "" && email === "" && pass === "") {
      return alert("Empty Fields");
    }
    await createUserWithEmailAndPassword(auth, email, pass)
      .then(() =>
        updateProfile(auth.currentUser, {
          displayName: fname + " " + lname,
        })
      )
      .catch((error) => {
        alert("SIgnUp:", error);
      });

    if (pic) {
      await setDoc(doc(db, "Posts", auth.currentUser.uid), {
        picUrl: pic,
      });
    }
    dispatch(
      login({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        picUrl: pic ? pic : null,
      })
    );
  };

  return (
    <div className="login">
      <img className="loginimg" src={icon} alt="LinkedIn Icon" />
      <form onSubmit={loginapp}>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          value={fname}
          onChange={(e) => setFname(e.target.value)}
          type="text"
          placeholder="First Name ( Required If Registering )"
        />
        <input
          value={lname}
          onChange={(e) => setLname(e.target.value)}
          type="text"
          placeholder="Last Name ( Required If Registering )"
        />

        <label>Profile Image ( Optional ) </label>

        <input type="file" onChange={handleimage} />
        <button type="submit" className="btns">
          Sign In
        </button>
      </form>
      <p>Not a member ?</p>
      <button onClick={register} className="btns">
        Register
      </button>
      <label style={{ marginTop: "20px", fontSize: "20px" }}>
        ( Note: The profile pic can only be set on registering. ){" "}
      </label>
    </div>
  );
};

export default Login;
