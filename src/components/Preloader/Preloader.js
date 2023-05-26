import React from "react";
import "./Preloader.css";

const Preloader = ({ isLaoding }) => {
  return (
    <div
      className={isLaoding ? "preloader" : "preloader preloader_type_hidden"}
    >
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
