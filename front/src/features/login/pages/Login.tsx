import { LogosGoogleIcon } from "../assets/Google";
import { SimpleIconsLine } from "../assets/Line";
import LoginBtn from "../components/LoginBtn";
import DietLogo from "../assets/diet-logo.png";
import { useEffect } from "react";

export const Login = () => {

  return (
    <main className="mt-16 flex-1">
      <div className="text-center">
        <img
          id="logo"
          className="mx-auto size-60"
          src={DietLogo}
          alt="diet-logo"
        />
        {/* <img src={DietLogo} alt="diet logo" className="m-auto size-60" /> */}
        <h1 className="mb-12 mt-5 text-2xl">ログイン</h1>
        {/* 以下ログインアイコン */}
        <div className="flex justify-center gap-x-24">
          <LoginBtn name="Google" icon={<LogosGoogleIcon fontSize={40} />} />
          <LoginBtn name="Line" icon={<SimpleIconsLine fontSize={40} />} />
        </div>
      </div>
    </main>
  );
};
