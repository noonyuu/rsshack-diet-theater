import { useEffect, useState } from "react";
import { DateSelect, useDateSelect } from "react-ymd-date-select";
import { useNavigate } from "react-router-dom";
// import { getPostData } from "../hooks/getOriginal";
import CustomDateSelect from "../components/CustomDateSelect";
import san_ticket from "../assets/san_ticket.svg";
import syu_ticket from "../assets/syu_ticket.svg";
import ryou_ticket from "../assets/ryou_tcket.svg";
import axios from "axios";

var path = import.meta.env.VITE_APP_PATH;

export const Home = () => {
  const navigate = useNavigate();
  const [meetingRecord, setMeetingRecord] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const handleDateChange = (value: string) => {
    setSelectedDate(value); 
  };

  interface Entity {
    detailId: string;
  }

  const detail = (val: string) => {
    const entity: Entity = {
      detailId: val,
    };
    navigate("/secret/chat", { state: entity });
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
      <CustomDateSelect onChange={handleDateChange} value={selectedDate}/>
      <div className="bg-subwhite mx-6 md:mx-16 mt-4 grid justify-center rounded-3xl md:grid-cols-2 lg:grid-cols-3">
        {meetingRecord.map((record, index) => (
          <div
            key={record.MeetingRecordId || index}
            className="py-4 px-6 md:p-10 relative overflow-hidden"
            style={{ maxWidth: "500px" }} // 画像の幅に合わせて適宜調整
          >
            <div className="relative">
              {record.NameOfHouse === '参議院' ? (
                <img src={san_ticket} alt="" className="w-full" />
              ) : record.NameOfHouse === '衆議院' ? (
                <img src={syu_ticket} alt="" className="w-full" />
              ) : record.NameOfHouse === '両院' ? (
                <img src={ryou_ticket} alt="" className="w-full" />
              ) : (
                <img src="" alt="" />
              )}
            </div>
            <div className="absolute left-[18%] top-[20%] w-[44%] md:left-[20%] md:top-[30%] md:w-[40%] text-base md:text-lg">
              <div className="block" style={{ display: '-webkit-box', WebkitLineClamp: 3, overflow: 'hidden', textOverflow: 'ellipsis', WebkitBoxOrient: 'vertical' }}>
                <>第{record.Session}回&emsp;</>
                <>{record.NameOfMeeting}</>
              </div>
            </div>
            <div className="absolute right-6 bottom-8 md:bottom-[26%] w-[50%] text-current text-sm md:text-base">
              <>{record.Date}</>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
