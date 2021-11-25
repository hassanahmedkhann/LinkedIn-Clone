import React, { useEffect, useState } from "react";
import "./Feed.css";
import CreateIcon from "@mui/icons-material/Create";
import InputOptions from "./InputOptions";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Posts from "./Posts";
import { db } from "../firebase-config";
import {
  orderBy,
  collection,
  query,
  doc,
  onSnapshot,
  setDoc,
  serverTimestamp,
} from "@firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
const Feed = () => {
  const dbref = collection(db, "Posts");

  const user = useSelector(selectUser);

  const [posts, setPosts] = useState([]);
  const [inputtext, setInputText] = useState("");
  useEffect(() => {
    onSnapshot(
      query(collection(db, "Posts"), orderBy("timestamp", "desc")),
      (snapshot) => setPosts(snapshot.docs.map((doc) => doc.data()))
    );
  }, []);

  const postupdate = async (e) => {
    e.preventDefault();

    if (inputtext === "") {
      window.alert("Empty Feild!");
      return;
    } else {
      const newdata = {
        name: user.name,
        desc: user.email,
        msg: inputtext,
        timestamp: serverTimestamp(),
        picUrl: user.picUrl ? user.picUrl : null,
      };
      setInputText("");

      await setDoc(doc(dbref), newdata, { merge: true });
    }
  };

  return (
    <div className="feed">
      <div className="feed-inputs">
        <div className="feed-input">
          <CreateIcon />
          <form>
            <input
              type="text"
              value={inputtext}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button onClick={postupdate} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed-inputoptions">
          {/* {input options component} */}
          <InputOptions Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOptions
            Icon={SubscriptionsIcon}
            title="Video"
            color="#E7A33E"
          />
          <InputOptions Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOptions
            Icon={CalendarViewDayIcon}
            title="Write Article"
            color="#7FC15E"
          />
        </div>
      </div>
      {posts.map((post, i) => (
        <Posts
          key={i}
          name={post.name}
          desc={post.desc}
          msg={post.msg}
          picUrl={post.picUrl}
        />
      ))}
    </div>
  );
};

export default Feed;
