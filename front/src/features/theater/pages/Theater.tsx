import React, { useCallback, useEffect, useState } from "react";
import "./Theater.css";
import { Summary_text } from "../components/summary_text/Summary_text";
import { Agenda } from "../components/agenda/Agenda";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

var path = import.meta.env.VITE_APP_PATH;
export const Theater = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [speechRecords, setSpeechRecords] = useState<any[]>([]); //  スピーチレコード
  const [currSpeechRecord, setCurrSpeechRecord] = useState<number>(0); //  現在のスピーチレコード

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(false); //  初回ロード
  const [isFinish, setIsFinish] = useState<boolean>(false); //  終了

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    // APIを叩きに行く処理
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://" +
            path +
            "/app/speech_record/select/once/" +
            location.state.detailId,
          // "https://yeeeee-waaaaaa.noonyuu.com/app/speech_record/select/all",
        );

        if (Array.isArray(response.data)) {
          setSpeechRecords(response.data);
          setIsFirstLoad(true);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // キーボード操作
  const handleKeyUp = useCallback(
    (e: { keyCode: any }) => {
      const keyCode = e.keyCode;

      if (keyCode === 37) {
        back();
      }
      if (keyCode === 39) {
        next();
      }
    },
    [isFirstLoad],
  );

  useEffect(() => {
    if (isFirstLoad) {
      addEventListener("keyup", (e) => handleKeyUp(e));
    }
  }, [isFirstLoad]);

  // 次のスピーチレコード
  const next = () => {
    setCurrSpeechRecord((curr) => {
      curr === speechRecords.length - 1 && finish();
      return curr === speechRecords.length - 1 ? curr : curr + 1;
    });
  };

  // 前のスピーチレコード
  const back = () => {
    setCurrSpeechRecord((curr) => {
      return curr === 0 ? curr : curr - 1;
    });
  };

  const finish = () => {
    console.log("finish");
    setIsFinish(true);
  };

  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // アニメーション表示条件をリセット
    setShowAnimation(false);
    if (
      speechRecords[currSpeechRecord] &&
      speechRecords[currSpeechRecord].AnimationPoint !== "0"
    ) {
      // 1秒後にアニメーション表示状態をtrueに設定
      const timer = setTimeout(() => {
        setShowAnimation(true);
      }, 1000);
      // コンポーネントのアンマウント時にタイマーをクリア
      return () => clearTimeout(timer);
    }
  }, [currSpeechRecord, speechRecords]);

  useEffect(() => {
    if (isFinish) {
      // エンディングアニメーションの終了を待つ
      const timer = setTimeout(() => {
        <div id="wrap"></div>;
        // アニメーションが終了したらagenda画面に遷移する
        navigate("/agenda");
      }, 1000); // 3000ミリ秒後に実行

      return () => clearTimeout(timer); // コンポーネントのクリーンアップ時にタイマーをクリア
    }
  }, [isFinish, navigate]);
  return (
    <div className="theater-bac">
      <Agenda title={location.state.title}></Agenda>
      <Summary_text
        speechRecord={speechRecords}
        currSpeechRecord={currSpeechRecord}
      ></Summary_text>
    </div>
  );
};
