import { getSession, signOut } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { useState } from "react";
import Modal from "~/components/Modal";
import GamesList from "~/components/GamesList";
import { api } from "~/utils/api";
import { Game, Platform } from "@prisma/client";

const Home = () => {
  const { data: platforms } = api.game.getUserPlatforms.useQuery();
  const { data: gamesList } = api.game.getAllGamesByUserId.useQuery();

  const [isModal, setIsModal] = useState(false);

  const gamesByPlatform: { [key: string]: Game[] } = {};

  if (!gamesList || !platforms) return <div>Something went wrong</div>;

  platforms.forEach((platform) => {
    const platformGames = gamesList.filter((game) => {
      return game.platformId === platform.id;
    });
    if (platformGames) {
      gamesByPlatform[platform.name] = platformGames;
    }
  });

  const games = Object.keys(gamesByPlatform).map((key, idx) => {
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
        {gamesList.length == 0 && (
          <div className="flex h-full flex-col items-center justify-center text-white">
            <div>Start stacking up your games</div>
            <button
              className="m-4 rounded-md border-4 bg-gray-500 p-2 text-white"
              onClick={() => {
                setIsModal((val) => !val);
              }}
            >
              Add a game
            </button>
          </div>
        )}
        {gamesList.length != 0 && (
          <button
            className="fixed bottom-0 right-0 m-4 rounded-md border-4 bg-gray-500 p-2 text-white"
            onClick={() => {
              setIsModal((val) => !val);
            }}
          >
            Add a game
          </button>
        )}
        {gamesList.length != 0 && <ul className="h-40 w-20">{games}</ul>}
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
    return { redirect: { destination: "/", permanent: false } };
  }

  return {
    props: {},
  };
};
