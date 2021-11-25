import React from "react";
import iconimg from "../Images/icon.png";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import HeaderOptions from "./HeaderOptions";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { logout } from "../features/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const logoutapp = async (e) => {
    dispatch(logout());
    await signOut(auth);
    alert("Logging Out");
  };
  return (
    <div className="header">
      <div className="header-left">
        <img src={iconimg} alt="Icon" />
        <div className="header-search">
          <SearchIcon />
          <input
            style={{ padding: "5px" }}
            placeholder="Search"
            type="text"
          ></input>
        </div>
      </div>
      <div className="header-right">
        <HeaderOptions title="Home" Icon={HomeIcon} />
        <HeaderOptions title="My Network" Icon={SupervisorAccountIcon} />
        <HeaderOptions title="Jobs" Icon={BusinessCenterIcon} />
        <HeaderOptions title="Messaging" Icon={ChatIcon} />
        <HeaderOptions title="Notifications" Icon={NotificationsIcon} />
        <HeaderOptions onClick={logoutapp} title="Sign Out" avatar={true} />
      </div>
    </div>
  );
};

export default Header;
