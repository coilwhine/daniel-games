import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();

  return (
    <header className="Header" onClick={() => navigate("/")}>
      <h1>ביגבגים משחקים</h1>
    </header>
  );
};

export default Header;
