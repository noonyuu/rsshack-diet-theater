import React from "react";
import person from "../../img/person.png";
import "./Summary_text.css";

export function Summary_text() {
  return (
    <div className="wrapper">
      <img src={person} className="person" alt="person" />
      <div className="name_area_bg">
        <p className="name_area">神さくら</p>
      </div>
      <div className="text_area_bg">
        <p className="text_area">要約した文章</p>
      </div>
    </div>
  );
}
