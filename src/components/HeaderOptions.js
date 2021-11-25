import React from "react";
import "./HeaderOptions.css";
import { Avatar } from "@mui/material";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
const HeaderOptions = ({ Icon, title, avatar, onClick }) => {
  const user = useSelector(selectUser);

  return (
    <div onClick={onClick} className="headerOption">
      {Icon && <Icon className="headeroptionicon" />}
      {avatar && (
        <Avatar src={user.picUrl ? user.picUrl : null} className="avatar">
          {user.name ? user.name[0] : user.name}
        </Avatar>
      )}
      <h5 style={{ fontWeight: "400" }}>{title}</h5>
    </div>
  );
};

export default HeaderOptions;
