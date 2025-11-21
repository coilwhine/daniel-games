import React, { useState } from "react";
import "./ShokoPlayerResoult.scss";
import type { ShokoGamePlayer } from "../models/shokoGame.model";

interface ShokoPlayerResoultProps {
  gamePlayerData: ShokoGamePlayer;
}

function getBallClassName(ball: number): string {
  const classes = ["ball"];
  const colorMap: { [key: number]: string } = {
    1: "yellow",
    2: "blue",
    3: "red",
    4: "purple",
    5: "orange",
    6: "green",
    7: "maroon",
    9: "yellow",
    10: "blue",
    11: "red",
    12: "purple",
    13: "orange",
    14: "green",
    15: "maroon",
  };

  if (ball === 8) {
    classes.push("black");
  } else if (ball > 0 && ball < 8) {
    classes.push("solid", colorMap[ball]);
  } else if (ball > 8 && ball <= 15) {
    classes.push("striped", colorMap[ball]);
  }

  return classes.join(" ");
}

const ShokoPlayerResoult: React.FC<ShokoPlayerResoultProps> = (
  props: ShokoPlayerResoultProps
) => {
  const [isExposed, setIsExposed] = useState<boolean>(false);

  function toggleExposed() {
    setIsExposed(!isExposed);
    console.log("isExposed", isExposed);
  }

  return (
    <div className="ShokoPlayerResoult" onClick={() => toggleExposed()}>
      <div className={`hide ${isExposed && "exposed"}`}>
        <h1>{props.gamePlayerData.playerName}</h1>
      </div>
      {props.gamePlayerData.balls.map((ball) => {
        return (
          <div key={ball} className={getBallClassName(ball)}>
            {ball}
          </div>
        );
      })}
    </div>
  );
};

export default ShokoPlayerResoult;
