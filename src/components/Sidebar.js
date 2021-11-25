import { Avatar } from "@mui/material";
import React from "react";
import "./Sidebar.css";
import cover from "../Images/cover.jpg";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
const Sidebar = () => {
  const user = useSelector(selectUser);

  const recentItems = (topic) => (
    <div className="recentitem">
      <span>#</span>
      <p>{topic}</p>
    </div>
  );
  return (
    <div className="sidebar">
      <div className="bor sidebar-top">
        <img src={cover} alt="Cover Img" />{" "}
        <Avatar
          src={user.picUrl ? user.picUrl : null}
          className="sidebar-avatar"
        >
          {user.name ? user.name[0] : user.name}
        </Avatar>
        <h2>{user.name}</h2>
        <h4>{user.email}</h4>
      </div>
      <div className="sidebar-stats">
        <div className="sidebar-stat">
          <p>Who Viewed you</p>
          <p className="stat-number">107</p>
        </div>
        <div className="sidebar-stat">
          <p>Views on posts</p>
          <p className="stat-number">2,454</p>
        </div>
      </div>
      <div className="sidebar-bottom bor ">
        <p> Recent</p>
        {recentItems("ReactJS")}
        {recentItems("Data Science")}
        {recentItems("Data Analysis")}
        {recentItems("Front-End Development")}
        {recentItems("Backend Development")}
        {recentItems("Next JS")}
      </div>
    </div>
  );
};

export default Sidebar;
