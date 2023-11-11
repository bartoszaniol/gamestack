import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import mapPlatform from "~/utils/mapPlatform";
import { Game } from "@prisma/client";
import { Oval } from "react-loader-spinner";

const schema = z.object({
  title: z.string().min(1, { message: "Required" }),
  platform: z.string(),
  url: z.union([z.literal(""), z.string().trim().url()]),
});

const GameInfo = (props: { gameId: string; onCancel: () => void }) => {
  let content;
  const [gameData, setGame] = useState<Game>();
  const { data: game } = api.game.getGameById.useQuery({
    gameId: props.gameId,
  });

  useEffect(() => {
    if (game) setGame(game);
  }, [game]);
  const trcpUtils = api.useContext();
  const { mutate: deleteGame } = api.game.deleteGame.useMutation({
    onSuccess: () => {
      trcpUtils.game.getAllGamesByUserId.invalidate();
    },
  });
  const { mutate: updateGame } = api.game.updateGame.useMutation({
    onSuccess: () => {
      trcpUtils.game.getAllGamesByUserId.invalidate();
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (game) {
      let platformName;
      platformName = mapPlatform(parseInt(game.platformId));
      setValue("title", game.title);
      setValue("url", game.image);
      setValue("platform", platformName);
    }
  }, [game]);

  if (!gameData) {
    content = (
      <div className="flex h-full items-center justify-center text-white">
        <Oval
          height={80}
          width={80}
          color="#fff"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#ccc"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  } else if (gameData) {
    content = (
      <>
        <div className="flex h-[90%]">
          <img
            src={gameData.image}
            alt={gameData.title}
            className="h-[80%] w-[50%] object-contain"
          />
          <form
            id="update-form"
            className="flex w-full flex-col"
            onSubmit={handleSubmit((data) => updateGameInfo(data))}
          >
            <label htmlFor="title" className="p-4 text-center text-2xl">
              Title
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              className="h-7 w-3/4 self-center bg-slate-500 pl-1 text-xl font-bold text-white"
              placeholder="Title"
            />
            <label htmlFor="platform" className="p-4 text-center text-2xl">
              Choose a platform
            </label>
            <select
              {...register("platform")}
              name="platform"
              id="platform"
              className="w-3/4 self-center bg-slate-500 text-white"
            >
              <option value="pc">PC</option>
              <option value="xbox">X-box</option>
              <option value="ps">PlayStation</option>
              <option value="switch">Nintendo Switch</option>
            </select>
            <label htmlFor="url" className="p-4 text-center text-2xl">
              Url
            </label>
            <input
              {...register("url")}
              type="text"
              id="url"
              className="h-7 w-3/4 self-center bg-slate-500 pl-1 text-xl font-bold text-white"
              placeholder="Address URL"
            />
          </form>
        </div>
        <div className="flex justify-around">
          <button
            className="rounded border-4 border-red-600 bg-red-600 font-bold"
            onClick={() => {
              deleteGame({ gameId: props.gameId });
              props.onCancel();
            }}
          >
            Delete
          </button>
          <button
            className="rounded border-4 border-white bg-white font-bold text-black"
            onClick={props.onCancel}
          >
            Cancel
          </button>
          <button
            form="update-form"
            className="rounded border-4 border-blue-600 bg-blue-600 font-bold"
            type="submit"
          >
            Update
          </button>
        </div>
      </>
    );
  }

  const updateGameInfo = (data: FieldValues) => {
    const platformId = mapPlatform(data.platform);
    if (!platformId) return;

    updateGame({
      gameId: props.gameId,
      title: data.title,
      image: data.url,
      platformId: platformId,
    });
    props.onCancel();
  };

  return (
    <div className="absolute left-1/2 top-[40%] z-20 -ml-[25%] -mt-[15%] flex h-3/4 w-1/2 flex-col rounded-md bg-slate-900 p-2 text-white">
      {content}
    </div>
  );
};

export default GameInfo;
