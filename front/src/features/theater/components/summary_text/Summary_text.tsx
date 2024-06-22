import React from "react";
import person from "../../img/person.png";
import "./Summary_text.css";
import { Animation } from "../animation/Animation";

export function Summary_text() {
  return (
    <div className="wrapper">
      <img src={person} className="person" alt="person" />
      <Animation arg={1}></Animation>
      <div className="name_area_bg">
        <p className="name_area">神さくら</p>
      </div>
      <div className="text_area_bg">
        <p className="text_area">要約した文章</p>
      </div>
    </div>
  );
}
