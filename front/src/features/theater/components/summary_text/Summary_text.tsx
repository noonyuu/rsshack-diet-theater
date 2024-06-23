import React, { useEffect, useState } from "react";
import person from "../../img/person.png";
import "./Summary_text.css";
import { Animation } from "../animation/Animation";

interface Props {
  speechRecord: any;
  currSpeechRecord: number;
}

export const Summary_text: React.FC<Props> = ({
  speechRecord,
  currSpeechRecord
}) => {
  if (
    speechRecord.length === 0 ||
    currSpeechRecord < 0 ||
    currSpeechRecord >= speechRecord.length
  ) {
    return null;
  }

  // speechRecord[currSpeechRecord] が存在することを確認してから、Speaker プロパティにアクセス
  const speaker = speechRecord[currSpeechRecord]?.Speaker || "";
  const link = "https://google.com/search?q=" + speechRecord[currSpeechRecord].Speaker

  return (
    <div className="wrapper">
      <img src={person} className="person" alt="person" />
      <Animation
        arg={speechRecord[currSpeechRecord].AnimationPoint}
      ></Animation>
      <div className="name_area_bg">
        <p className="name_area"><a href={link}>{speechRecord[currSpeechRecord].Speaker}</a></p>
      </div>
      <div className="text_area_bg">
        <p className="text_area">
          {speechRecord[currSpeechRecord].SpeechSummary.replaceAll("「", "")
            .replaceAll("」", "")
            .split("。")
            .map((sentence: string, index: number, array: string[]) => (
              <React.Fragment key={index}>
                {sentence}
                {index !== array.length - 1 && "。"}{" "}
                {index !== array.length - 1 && <br />}{" "}
              </React.Fragment>
            ))}
        </p>
      </div>
    </div>
  );
};
