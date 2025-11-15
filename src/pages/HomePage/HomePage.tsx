import React from "react";
import "./HomePage.scss";
import { Link } from "react-router";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="HomePage">
      <header className="home-header">
        <h2>מה משחקים?</h2>
      </header>
      <nav className="game-nav">
        <Link to={"shoko"} className="nav-btn shoko-btn">
          <span className="heading">שוקו</span>
          <span className="coming-soon">{"(מגיע בקרוב!)"}</span>
        </Link>
        <Link to={"thetown"} className="nav-btn the-town-btn">
          <span className="heading">העיירה</span>
          <span className="coming-soon">{"(מגיע בקרוב!)"}</span>
        </Link>
        <Link to={"charades"} className="nav-btn charades-btn">
          <span className="heading">נימיות</span>
          <span className="coming-soon">{"(מגיע בקרוב!)"}</span>
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
