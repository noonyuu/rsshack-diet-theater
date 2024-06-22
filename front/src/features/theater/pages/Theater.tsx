import React from "react";
import "./Theater.css";
import { Summary_text } from "../components/summary_text/Summary_text";
import { Agenda } from "../components/agenda/Agenda";
export function Theater() {
  return (
    <div className="theater-bac">
      <Agenda></Agenda>
      <Summary_text></Summary_text>
    </div>
  );
}
