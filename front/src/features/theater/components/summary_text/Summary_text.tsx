import React from "react";
import person from "../../img/person.png";
import "./Summary_text.css";

interface Props {
  speechRecord: any;
  currSpeechRecord: number;
}

export const Summary_text: React.FC<Props> = ({ speechRecord, currSpeechRecord }) => {
  console.log(speechRecord[currSpeechRecord].Speaker);

  return (
    <div className="wrapper">
      <img src={person} className="person" alt="person" />
      <div className="name_area_bg">
        <p className="name_area">{speechRecord[currSpeechRecord].Speaker}</p>
      </div>
      <div className="text_area_bg">
        <p className="text_area">
          {speechRecord.length > 0 && speechRecord[currSpeechRecord] && (
            <>
              {speechRecord[currSpeechRecord].SpeechSummary.replaceAll("「", "")
                .replaceAll("」", "")
                .split("。")
                .map((sentence: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined, array: string | any[]) => (
                  <React.Fragment key={index}>
                    {sentence}
                    {index !== array.length - 1 && "。"}{" "}
                    {index !== array.length - 1 && <br />}{" "}
                  </React.Fragment>
                ))}
            </>
          )}
        </p>
      </div>
    </div>
  );
};
