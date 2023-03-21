import { Game } from "@prisma/client";

const GamesList = (props: { games: Game[]; platform: string }) => {
  const gameList = (
    <li>
      <p className="font-bold text-white">{props.platform}</p>
      {props.games.map((game) => {
        return (
          <div key={game.id} className="m-2 w-40 border-4 border-white">
            <img src={game.image} alt={game.title} />
            <p className="text-white">{game.title}</p>
          </div>
        );
      })}
    </li>
  );

  return gameList;
};

export default GamesList;
