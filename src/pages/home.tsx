import { GetServerSidePropsContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { useState } from "react";
import Modal from "~/components/Modal";
import { api } from "~/utils/api";
import Game from "~/components/Game";

const Home = () => {
  const { data: gamesList } = api.game.getAllGamesById.useQuery();
  const [isModal, setIsModal] = useState(false);
  const games = gamesList?.map((game) => <Game {...game} key={game.id}></Game>);

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
        <ul className="h-40 w-20">{games}</ul>
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
