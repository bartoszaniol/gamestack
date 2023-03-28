import { Game } from "@prisma/client";
import React from "react";
import { api } from "~/utils/api";

const GameItem = (props: { game: Game }) => {
  const { mutate: deleteGame } = api.game.deleteGame.useMutation();

  return (
    <div
      key={props.game.id}
      className="m-2 w-40 cursor-pointer border-4 border-white hover:opacity-70"
      onClick={() => deleteGame(props.game.id)}
    >
      <img
        src={props.game.image}
        alt={props.game.title}
        className="h-[90%] border-b-4 object-cover"
      />
      <p className="text-white">{props.game.title}</p>
    </div>
  );
};

export default GameItem;
