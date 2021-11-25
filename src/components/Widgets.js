import React from "react";
import "./Widgets.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import InfoIcon from "@mui/icons-material/Info";
const Widgets = () => {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets-article">
      <div className="widget-articleleft">
        <FiberManualRecordIcon />
      </div>
      <div className="widget-articleright">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
  return (
    <div className="widgets">
      <div className="widget-header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {newsArticle("HAK is back", "Top news - 9999 Readers.")}
      {newsArticle("Corona is back", "Top news - 9999 Readers.")}
      {newsArticle("Dengue is back", "Top news - 9999 Readers.")}
      {newsArticle("Malaria is back", "Top news - 9999 Readers.")}
    </div>
  );
};

export default Widgets;
