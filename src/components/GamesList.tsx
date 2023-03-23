import { Game, Platform } from "@prisma/client";

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
        {props.games.map((game) => {
          return (
            <div key={game.id} className="m-2 w-40 border-4 border-white">
              <img
                src={game.image}
                alt={game.title}
                className="h-[90%] border-b-4 object-cover"
              />
              <p className="text-white">{game.title}</p>
            </div>
          );
        })}
      </div>
    </li>
  );

  return gameList;
};

export default GamesList;
