import React, { useEffect, useState } from "react";
import "./ShokoPage.scss";
import type { ShokoPlayer } from "./models/shokoPlayer.model";
import ShokoPlayerForm from "./ShokoPlayerForm/ShokoPlayerForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import shokoService from "./shoko.service";

interface ShokoPageProps {}

const ShokoPage: React.FC<ShokoPageProps> = () => {
  const [players, setPlayers] = useState<ShokoPlayer[]>([]);

  useEffect(() => {
    const shokoPlayers = shokoService.getShokoPlayers();
    setPlayers(shokoPlayers);
  }, []);

  function addNewPlayer() {
    shokoService.addNewPlayer();
    setPlayers(shokoService.getShokoPlayers());
  }

  function deletePlayer(id: number) {
    shokoService.deletePlayer(id);
    setPlayers(shokoService.getShokoPlayers());
  }

  function updatePlayerName(id: number, name: string) {
    let newName: string;

    if (!name.trim().length) {
      newName = `שחקן ללא שם ${id}`;
    } else {
      newName = name.trim();
    }

    shokoService.updatePlayerName(id, newName);
    setPlayers(shokoService.getShokoPlayers());
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
          <button onClick={addNewPlayer}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </header>
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
      </section>
    </div>
  );
};

export default ShokoPage;
