import React from "react";
import "./HomePage.scss";
import { Link, NavLink } from "react-router";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="HomePage">
      <header className="home-header">
        <h2>מה משחקים?</h2>
      </header>
      <nav className="game-nav">
        <Link to={"shoko"} className="btn nav-btn shoko-btn">
          <header>
            <span className="heading">שוקו</span>
            <span className="coming-soon">{"(מגיע בקרוב!)"}</span>
          </header>
        </Link>
        <Link to={"thetown"} className="btn nav-btn the-town-btn">
          <header>
            <span className="heading">העיירה</span>
            <span className="coming-soon">{"(מגיע בקרוב!)"}</span>
          </header>
        </Link>
        <Link to={"charades"} className="btn nav-btn charades-btn">
          <header>
            <span className="heading">נימיות</span>
            <span className="coming-soon">{"(מגיע בקרוב!)"}</span>
          </header>
        </Link>
      </nav>
    </div>
  );
};

export default HomePage;
