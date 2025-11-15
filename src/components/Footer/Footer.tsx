import React from "react";
import "./Footer.scss";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="Footer">
      <span className="copyright">
        © {currentYear} כל הזכויות שמורות לדניאל חן
      </span>
    </div>
  );
};

export default Footer;
