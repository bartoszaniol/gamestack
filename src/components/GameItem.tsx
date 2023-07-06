import { Game } from "@prisma/client";

const GameItem = (props: { game: Game; onShowInfo: () => void }) => {
  return (
    <div
      key={props.game.id}
      className="m-2 h-full w-40 cursor-pointer border-4 border-white hover:opacity-70"
      onClick={props.onShowInfo}
    >
      <img
        src={props.game.image}
        alt={props.game.title}
        className="h-[90%]  border-b-4 object-cover"
      />
      <p className="text-white">{props.game.title}</p>
    </div>
  );
};

export default GameItem;
