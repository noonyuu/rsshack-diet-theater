import { useEffect, useState } from "react";
import { DateSelect, useDateSelect } from "react-ymd-date-select";
import { useNavigate } from "react-router-dom";
import { getPostData } from "../hooks/getOriginal";
import { CustomDateSelect } from "../components/CustomDataSelect";
import ticket from "../assets/ticket_san.svg";

export const Home = () => {
  const navigate = useNavigate();

  const [api, setApi] = useState<Map<string, any>>(new Map());
  const [speaker, setSpeaker] = useState<any[]>([]);

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
        const newData = await getPostData();
        const speakers = newData?.get("speechRecord");
        console.log("agenda", newData);

        if (newData !== null) {
          setApi(newData);
          setSpeaker(speakers);
        } else {
          console.error("データが null です");
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
      <CustomDateSelect />
      <div className="w-100 h-500 mx-16 mt-28 flex flex-wrap justify-center bg-subwhite rounded-3xl">
        {Array.from(api).map(([keys, values]) => {
          const pickData = new Map(Object.entries(values));
          return (
            <div key={keys} className="w-[30%] py-10 px-10 relative">
              <img src={ticket} alt="" className="w-[100%]" />
              <div className="w-[40%] absolute left-[20%] top-[30%]">
                <>第{pickData.get("session")}回&emsp;</>
                <>{pickData.get("nameOfMeeting")}</><br/>
                <div className="bottom-0">
                  <>{pickData.get("date")}</>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};
