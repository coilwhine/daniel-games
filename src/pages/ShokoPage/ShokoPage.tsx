import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BiCollapseVertical } from "react-icons/bi";
import type { ShokoPlayer } from "./models/shokoPlayer.model";
import "./ShokoPage.scss";
import ShokoPlayerForm from "./ShokoPlayerForm/ShokoPlayerForm";
import shokoService from "./shokoService";

interface ShokoPageProps {}

const ShokoPage: React.FC<ShokoPageProps> = () => {
  const [players, setPlayers] = useState<ShokoPlayer[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  useEffect(() => {
    const shokoPlayers = shokoService.getShokoPlayers();
    setPlayers(shokoPlayers);
  }, []);

  function addNewPlayer() {
    toogleCollapse(false);
    shokoService.addNewPlayer();
    setPlayers(shokoService.getShokoPlayers());
  }

  function deletePlayer(id: string) {
    shokoService.deletePlayer(id);
    setPlayers(shokoService.getShokoPlayers());
  }

  function updatePlayerName(id: string, name: string) {
    let newName: string;

    if (!name.trim().length) {
      newName = "שחקן ללא שם";
    } else {
      newName = name.trim();
    }

    shokoService.updatePlayerName(id, newName);
    setPlayers(shokoService.getShokoPlayers());
  }

  function toogleCollapse(state: boolean = !isCollapsed) {
    console.log("state", state);

    setIsCollapsed(state);
  }

  useEffect(() => {
    console.log("players", players);
  }, [players]);

  return (
    <div className="ShokoPage">
      <header className="ShokoPage-header">
        <h2>שוקו!</h2>
      </header>

      <section className="set-players-section">
        <header className="set-player-header">
          <h3>{`שחקנים (${players.length})`}</h3>
          <button
            onClick={addNewPlayer}
            className="btn btn-icon add-player-btn"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </header>

        {players.length !== 0 && (
          <div className={`player-forms ${isCollapsed && "collapsed"}`}>
            {players.map((player, index) => {
              return (
                <ShokoPlayerForm
                  key={player.id}
                  index={index}
                  playerData={player}
                  deletePlayer={deletePlayer}
                  updatePlayerName={updatePlayerName}
                />
              );
            })}
          </div>
        )}

        <button className="collapse-btn" onClick={() => toogleCollapse()}>
          <BiCollapseVertical />
        </button>
      </section>
    </div>
  );
};

export default ShokoPage;
