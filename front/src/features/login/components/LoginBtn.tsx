import React from "react";

interface Props {
  name: string;
  icon: JSX.Element;
}

const LoginBtn: React.FC<Props> = ({ name, icon }) => {
  const handleClick = () => {
    window.location.href = "/auth/" + name.toLowerCase() + "?redirect_path=/";
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="rounded-full border border-main-color p-4"
      >
        <div className="size-10">{icon}</div>
      </button>
    </div>
  );
};

export default LoginBtn;
