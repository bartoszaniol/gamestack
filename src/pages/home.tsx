import { getSession, signOut } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import Modal from "~/components/Modal";
import GamesList from "~/components/GamesList";
import { api } from "~/utils/api";
import { Game, Platform } from "@prisma/client";

const Home = () => {
  const { data: gamesList } = api.game.getAllGamesByUserId.useQuery();
  const { data: platforms } = api.game.getUserPlatforms.useQuery();

  const [isModal, setIsModal] = useState(false);

  const gamesByPlatform: { [key: string]: Game[] } = {};

  platforms?.forEach((platform: Platform, idx) => {
    const platformGames = gamesList?.filter((game) => {
      return game.platformId === platform.id;
    });
    if (platformGames) {
      gamesByPlatform[platform.name] = platformGames;
    }
  });

  const games2 = Object.keys(gamesByPlatform).map((key, idx) => {
    return (
      <GamesList
        key={idx}
        platform={platforms![idx] as Platform}
        games={gamesByPlatform[key] as Game[]}
      />
    );
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
        {!gamesList && (
          <div className="text-white">Start stacking up your games</div>
        )}
        <button
          className="fixed bottom-0 right-0 m-4 rounded-md border-4 bg-gray-500 p-2 text-white"
          onClick={() => {
            setIsModal((val) => !val);
          }}
        >
          Add a game
        </button>
        <ul className="h-40 w-20">{games2}</ul>
        <button
          className="fixed top-0 right-0 m-4 rounded-md border-4 bg-gray-500 p-2 text-white"
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>
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
