import { Game } from "@prisma/client";

const Game = (props: Game) => {
  return (
    <li>
      <p className="text-white">{props.title}</p>
      <img src={props.image} alt={props.title} />
    </li>
  );
};

export default Game;
