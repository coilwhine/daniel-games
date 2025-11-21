import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { BiCollapseVertical } from "react-icons/bi";
import type { ShokoGamePlayer } from "./models/shokoGame.model";
import type { ShokoPlayer } from "./models/shokoPlayer.model";
import "./ShokoPage.scss";
import ShokoPlayerForm from "./ShokoPlayerForm/ShokoPlayerForm";
import ShokoPlayerResoult from "./ShokoPlayerResoult/ShokoPlayerResoult";
import shokoService from "./shokoService";

interface ShokoPageProps {}

const ShokoPage: React.FC<ShokoPageProps> = () => {
  const [players, setPlayers] = useState<ShokoPlayer[]>([]);
  const [game, setGame] = useState<ShokoGamePlayer[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    const shokoPlayers = shokoService.getShokoPlayers();
    setPlayers(shokoPlayers);
  }, []);

  function devideBolls() {
    shokoService.divideToPlayers();
    const game = shokoService.getCorrentgame();
    setGame(game);
  }

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
    setIsCollapsed(state);
  }

  return (
    <div className="ShokoPage">
      <header className="header">
        <h2>שוקו!</h2>
      </header>

      <main>
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

        <section className="resoult-section">
          <button className="btn divide-btn" onClick={() => devideBolls()}>
            חלוקה
          </button>
          <h3>והתוצאות הם:</h3>
          {game.map((game) => {
            return (
              <ShokoPlayerResoult key={game.playerId} gamePlayerData={game} />
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default ShokoPage;
