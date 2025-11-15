import {
  faCircleCheck,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { Player } from "../models/player.model";
import "./ShokoPlayerForm.scss";

interface ShokoPlayerFormProps {
  index: number;
  playerData: Player;
  deletePlayer: (id: number) => void;
  updatePlayerName: (id: number, name: string) => void;
}

interface FormData {
  playerName: string;
}

const ShokoPlayerForm: React.FC<ShokoPlayerFormProps> = (
  props: ShokoPlayerFormProps
) => {
  const { register, handleSubmit } = useForm<FormData>();
  const [editMode, setEditMode] = useState(true);

  function editModeClick() {
    setEditMode(true);
  }

  function onSubmit(data: FormData) {
    setEditMode(false);
    props.updatePlayerName(props.playerData.id, data.playerName);
  }

  return (
    <form className="ShokoPlayerForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <label htmlFor="playerName">שחקן {props.index + 1}</label>
        {editMode ? (
          <input
            id="playerName"
            type="text"
            {...register("playerName")}
            defaultValue={props.playerData.name}
            autoFocus
          />
        ) : (
          <span className="player-name">{props.playerData.name}</span>
        )}
      </div>

      <div className="action-menu">
        {editMode && (
          <button type="submit" className="save-btn">
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
        )}

        {!editMode && (
          <button type="button" className="edit-btn" onClick={editModeClick}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        )}
        <button
          type="button"
          className="delete-btn"
          onClick={() => props.deletePlayer(props.playerData.id)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </form>
  );
};

export default ShokoPlayerForm;
