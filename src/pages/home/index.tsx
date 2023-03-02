import { GetServerSidePropsContext } from "next";
import { getSession, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
  }
  return (
    <main>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Avadacedavra
      </button>
      <div> Start stacking up your games</div>
    </main>
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