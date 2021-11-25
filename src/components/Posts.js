import { Avatar } from "@mui/material";
import React, { useState } from "react";
import InputOptions from "./InputOptions";
import "./Posts.css";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
const Posts = ({ name, desc, msg, picUrl }) => {
  const [flag, setFlag] = useState(false);
  const clicked = (e) => {
    e.preventDefault();
    setFlag(!flag);
  };
  const user = useSelector(selectUser);
  return (
    <div className="posts">
      <div className="post-header">
        <Avatar src={picUrl ? picUrl : null}>
          {user.name ? user.name[0] : user.name}
        </Avatar>
        <div className="post-info">
          <h2>{name}</h2>
          <p>{desc}</p>
        </div>
      </div>
      <div className="post-body">
        <p>{msg}</p>
      </div>
      <div className="post-buttons">
        <div onClick={clicked}>
          <InputOptions
            Icon={ThumbUpAltOutlinedIcon}
            title="Like"
            color={flag ? "blue" : "gray"}
          />
        </div>
        <InputOptions Icon={ChatOutlinedIcon} title="Comment" color="gray" />
        <InputOptions Icon={ShareOutlinedIcon} title="Share" color="gray" />
        <InputOptions Icon={SendOutlinedIcon} title="Send" color="gray" />
      </div>
    </div>
  );
};

export default Posts;
