import { Game, Platform } from "@prisma/client";
import GameItem from "./GameItem";
import GameInfo from "./GameInfo";
import { useState } from "react";
import Backdrop from "./Backdrop";

const GamesList = (props: { games: Game[]; platform: Platform }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [gameId, setGameId] = useState("");

  const triggerClickHandler = () => {
    setIsClicked((prev) => !prev);
  };

  const gameList = (
    <li>
      {isClicked && <Backdrop onClose={triggerClickHandler} />}
      <img
        src={props.platform.image}
        alt={props.platform.name}
        className="h-[90%] bg-white object-cover"
      />
      <div className="mb-8 flex w-screen">
        {props.games.map((game, index) => (
          <main key={index}>
            <GameItem
              game={game}
              onShowInfo={() => {
                triggerClickHandler();
                setGameId(game.id);
              }}
            />
          </main>
        ))}
      </div>
      {isClicked && <GameInfo gameId={gameId} onCancel={triggerClickHandler} />}
    </li>
  );

  return gameList;
};

export default GamesList;
