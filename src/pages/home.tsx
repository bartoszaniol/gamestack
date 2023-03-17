import { getSession, signOut } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import Modal from "~/components/Modal";
import GamesList from "~/components/GamesList";
import { api } from "~/utils/api";
import { Game } from "@prisma/client";

const Home = () => {
  const { data: gamesList } = api.game.getAllGamesByUserId.useQuery();
  const { data: platforms } = api.game.getUserPlatforms.useQuery();
  const [isModal, setIsModal] = useState(false);

  const gamesByPlatform: { [key: string]: Game[] } = {};

  platforms?.forEach((platform, idx) => {
    const platformGames = gamesList?.filter((game) => {
      return game.platformId === platform.id;
    });
    if (platformGames) {
      gamesByPlatform[platform.name] = platformGames;
    }
  });
  console.log(gamesByPlatform);

  const games2 = Object.keys(gamesByPlatform).map((key, idx) => {
    return <GamesList platform={key} games={gamesByPlatform[key] as Game[]} />;
  });

  return (
    <>
      {isModal && (
        <Modal
          onCancel={() => {
            setIsModal((val) => !val);
          }}
        />
      )}
      <main className="relative h-screen bg-gradient-to-br from-prim-blue to-sec-blue">
        <button
          className="m-4 rounded-md border-4 bg-gray-500 p-2 text-white"
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>
        <div className="text-white">Start stacking up your games</div>
        <button
          className="m-4 rounded-md border-4 bg-gray-500 p-2 text-white"
          onClick={() => {
            setIsModal((val) => !val);
          }}
        >
          Add a game
        </button>
        <ul className="h-40 w-20">{games2}</ul>
      </main>
    </>
  );
};

export default Home;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session) {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {},
  };
};
