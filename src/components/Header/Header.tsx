import React from "react";
import "./Header.scss";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="Header">
      <h1>ביגבגים משחקים</h1>
    </header>
  );
};

export default Header;
