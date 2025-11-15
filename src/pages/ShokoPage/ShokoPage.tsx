import React, { useEffect, useRef, useState } from "react";
import "./ShokoPage.scss";
import type { Player } from "./models/player.model";
import ShokoPlayerForm from "./ShokoPlayerForm/ShokoPlayerForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface ShokoPageProps {}

const ShokoPage: React.FC<ShokoPageProps> = () => {
  const nextId = useRef(1);
  const [players, setPlayers] = useState<Player[]>([]);

  function addPlayer() {
    let newId = nextId.current;

    setPlayers((prevPlayers) => {
      return [
        ...prevPlayers,
        {
          id: newId,
          name: "",
          balls: [],
        },
      ];
    });

    nextId.current = newId + 1;
  }

  function deletePlayer(id: number) {
    setPlayers((prevPlayers) => {
      return prevPlayers.filter((player) => player.id !== id);
    });
  }

  function updatePlayerName(id: number, name: string) {
    setPlayers((prevPlayers) => {
      return prevPlayers.map((player) => {
        if (player.id === id) {
          return {
            ...player,
            name: name,
          };
        } else {
          return player;
        }
      });
    });
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
          <button onClick={addPlayer}>
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
