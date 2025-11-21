import {
  faCircleCheck,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { ShokoPlayer } from "../models/shokoPlayer.model";
import "./ShokoPlayerForm.scss";

interface ShokoPlayerFormProps {
  index: number;
  playerData: ShokoPlayer;
  deletePlayer: (id: string) => void;
  updatePlayerName: (id: string, name: string) => void;
}

interface FormData {
  playerName: string;
}

const ShokoPlayerForm: React.FC<ShokoPlayerFormProps> = (
  props: ShokoPlayerFormProps
) => {
  const { register, handleSubmit } = useForm<FormData>();
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    props.playerData.name ? setEditMode(false) : setEditMode(true);
  }, []);

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
          <button type="submit" className="btn btn-icon save-btn">
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
        )}

        {!editMode && (
          <button
            type="button"
            className="btn btn-icon edit-btn"
            onClick={editModeClick}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        )}

        <button
          type="button"
          className="btn btn-icon delete-btn"
          onClick={() => props.deletePlayer(props.playerData.id)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </form>
  );
};

export default ShokoPlayerForm;
