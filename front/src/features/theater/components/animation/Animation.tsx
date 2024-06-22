import React, { useEffect, useState } from "react";
import noobjection from "../../img/noobjection.png";
import objection from "../../img/objection.png";
import clap from "../../img/clap.png";
import "./Animation.css";

export const Animation = ({ arg }: { arg: number }) => {
  const [isVisible, setIsVisible] = useState(true);

  const img = ["", noobjection, objection, clap];

  useEffect(() => {
    setIsVisible(true); // コンポーネントが更新されたときにアニメーションを表示状態にリセット
    const timer = setTimeout(() => {
      setIsVisible(false); // アニメーションを非表示にする
    }, 5000); // アニメーションの時間を2秒に変更

    return () => clearTimeout(timer);
  }, [arg]); // argの値が変わるたびにエフェクトを再実行

  return isVisible ? (
    <div className="img-wrap">
      <img src={img[arg]} className="cutin" alt="cutin" />
    </div>
  ) : null;
};
