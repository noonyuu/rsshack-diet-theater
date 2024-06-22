import { useEffect, useState } from "react";
import { DateSelect, useDateSelect } from "react-ymd-date-select";
import { useNavigate } from "react-router-dom";
// import { getPostData } from "../hooks/getOriginal";
import { CustomDateSelect } from "../components/CustomDataSelect";
import san_ticket from "../assets/san_ticket.svg";
import syu_ticket from "../assets/syu_ticket.svg";
import ryou_ticket from "../assets/ryou_tcket.svg";
import axios from "axios";

var path = import.meta.env.VITE_APP_PATH;

export const Home = () => {
  const navigate = useNavigate();
  const [meetingRecord, setMeetingRecord] = useState<any[]>([]);
  const [api, setApi] = useState<Map<string, any>>(new Map());
  const [speaker, setSpeaker] = useState<any[]>([]);

  interface Entity {
    detailId: string;
    title: string;
  }

  const detail = (val: string, NameOfHouse: string) => {
    const entity: Entity = {
      detailId: val,
      title: NameOfHouse,
    };
    navigate("/theater", { state: entity });
  };

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://" + path + "/app/meeting_record/select/all",
        // "https://yeeeee-waaaaaa.noonyuu.com/app/speech_record/select/all",
      );

      if (Array.isArray(response.data)) {
        setMeetingRecord(response.data);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);
  return (
    <main>
      {/* ヘッダーで隠れるところ */}
      <div className="pt-16"></div>
      {/* <CustomDateSelect />*/}
      <div className="bg-subwhite mx-6 mt-20 grid justify-center rounded-3xl md:mx-16 md:mt-28 md:grid-cols-2 lg:grid-cols-3">
        {/* <div className="w-100 h-500 bg-subwhite mx-16 mt-28 flex flex-wrap justify-center rounded-3xl"> */}
        {meetingRecord.map((record, index) => (
          <div
            key={record.MeetingRecordId || index}
            className="relative overflow-hidden px-6 py-4 md:p-10"
          >
            <button
              onClick={() => detail(record.IssueID, record.NameOfMeeting)}
            >
              {record.NameOfHouse === "参議院" ? (
                <img src={san_ticket} alt="" className="w-[100%]" />
              ) : record.NameOfHouse === "衆議院" ? (
                <img src={syu_ticket} alt="" className="w-[100%]" />
              ) : record.NameOfHouse === "両院" ? (
                <img src={ryou_ticket} alt="" className="w-[100%]" />
              ) : (
                <img src="" alt="" />
              )}
            </button>
            <div className="absolute left-[18%] top-[20%] w-[44%] overflow-hidden text-sm md:left-[20%] md:top-[30%] md:w-[40%] md:text-lg">
              <div className="block">
                <>第{record.Session}回&emsp;</>
                <>{record.NameOfMeeting}</>
              </div>
            </div>
            <div className="absolute bottom-8 right-6 w-[50%] text-sm text-current md:bottom-[26%] md:text-base">
              <>{record.Date}</>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

// import { useEffect, useState } from "react";
// import { DateSelect, useDateSelect } from "react-ymd-date-select";
// import { useNavigate } from "react-router-dom";
// import { getPostData } from "../hooks/getOriginal";
// import { CustomDateSelect } from "../components/CustomDataSelect";
// import ticket from "../assets/ticket_san.svg";
// import axios from "axios";

// var path = import.meta.env.VITE_APP_PATH;

// export const Home = () => {
//   const navigate = useNavigate();

//   const [meetingRecord, setMeetingRecord] = useState<any[]>([]);
//   const [api, setApi] = useState<Map<string, any>>(new Map());
//   const [speaker, setSpeaker] = useState<any[]>([]);

//   interface Entity {
//     detailId: string;
//   }

//   const detail = (val: string) => {
//     const entity: Entity = {
//       detailId: val,
//     };
//     navigate("/secret/chat", { state: entity });
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://" + path + "/app/meeting_record/select/all",
//           // "https://yeeeee-waaaaaa.noonyuu.com/app/speech_record/select/all",
//         );

//         if (Array.isArray(response.data)) {
//           setMeetingRecord(response.data);
//         } else {
//           console.error("Unexpected response structure:", response.data);
//         }

//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <main>
//       {/* ヘッダーで隠れるところ */}
//       <div className="pt-16"></div>
//       {/* <CustomDateSelect /> */}
//       <div className="mx-16 mt-28 flex flex-wrap justify-center bg-subwhite rounded-3xl">
//         {/* {meetingRecord.map((record, index) => {
//           return (
//             <div key={record.MeetingRecordId || index} className="py-10 px-10 relative">
//               <img src={ticket} alt="" className="w-[100%]" />
//               <div className="w-[40%] absolute left-[20%] top-[30%]">
//                 {/* <>第{pickData.get("session")}回&emsp;</> */}
//                 {/* <>{record.NameOfMeeting}</><br/>
//                 <div className="bottom-0">
//                   <>{record.Date}</>
//                 </div>
//               </div>
//             </div>
//           );
//         })} */} 
//         {meetingRecord.map((record, index) => (
//           <div
//             key={record.MeetingRecordId || index}
//             className="relative w-[30%] px-10 py-10"
//           >
//             <img src={ticket} alt="" className="w-[100%]" />
//             <div className="absolute left-[20%] top-[30%] w-[40%]">
//               <>第{record.Session}回&emsp;</>
//               <>{record.NameOfMeeting}</>
//               <br />

//               <div className="bottom-0">
//                 <>{record.Date}</>
//               </div>
//             </div>
//           </div>
//         ))}

//       </div>
//     </main>
//   );
// };
