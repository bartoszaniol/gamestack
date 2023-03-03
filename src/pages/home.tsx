import { GetServerSidePropsContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { useState } from "react";
import Modal from "~/components/modal";

const Home = () => {
  const [isModal, setIsModal] = useState(false);
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
    props: { session },
  };
};
