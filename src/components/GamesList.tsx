import { Game, Platform } from "@prisma/client";
import GameItem from "./GameItem";
import GameInfo from "./GameInfo";
import { useState } from "react";
import Backdrop from "./Backdrop";

const GamesList = (props: { games: Game[]; platform: Platform }) => {
  const [isClicked, setIsClicked] = useState(false);

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
      <div className="flex w-screen">
        {props.games.map((game) => (
          <main key={game.id}>
            {isClicked && (
              <GameInfo game={game} onCancel={triggerClickHandler} />
            )}
            <GameItem game={game} onShowInfo={triggerClickHandler} />
          </main>
        ))}
      </div>
    </li>
  );

  return gameList;
};

export default GamesList;
