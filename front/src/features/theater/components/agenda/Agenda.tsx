import React, { useEffect, useState } from "react";
// import logo from "../../img/logo.png";
import "./Agenda.css";
import { set, words } from "lodash";

interface Props {
  title: string;
}

export const Agenda: React.FC<Props> = ({title}) => {

  const [wordCounter] = useState(title.length);
  if (wordCounter > 20) {}

  useEffect(() => {

  })
  return (
    <div>
      <div className="header">
        {/* <img src={logo} className="logo" alt="logo" /> */}
      </div>
      <div className="agenda_bg">
        <div className="flex">
          <p>十字キーで画面移動ができます。</p>
          <p>名前を押すと議員を検索できます。</p>
        </div>
        <p className="agenda_text">{title}</p>
      </div>
    </div>
  );
}
