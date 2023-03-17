import { Game } from "@prisma/client";

const GamesList = (props: { games: Game[]; platform: string }) => {
  const gameList = (
    <li>
      <p>{props.platform}</p>
      {props.games.map((game) => {
        return (
          <li>
            <p className="text-white">{game.title}</p>
            <img src={game.image} alt={game.title} />
          </li>
        );
      })}
    </li>
  );

  return gameList;
};

export default GamesList;
