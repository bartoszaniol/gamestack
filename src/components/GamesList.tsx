import { Game, Platform } from "@prisma/client";
import GameItem from "./GameItem";

const GamesList = (props: { games: Game[]; platform: Platform }) => {
  const gameList = (
    <li>
      {/* <p className="font-bold text-white">{props.platform.name}</p> */}
      <img
        src={props.platform.image}
        alt={props.platform.name}
        className="h-[90%] bg-white object-cover"
      />
      <div className="flex w-screen">
        {props.games.map((game) => (
          <GameItem game={game} key={game.id} />
        ))}
      </div>
    </li>
  );

  return gameList;
};

export default GamesList;
