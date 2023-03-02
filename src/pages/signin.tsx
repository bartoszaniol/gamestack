import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import { authOptions } from "~/server/auth";

const Home = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-prim-blue to-sec-blue">
      <p className="mb-4 text-2xl text-white">Log in to stack up your games</p>
      <ul>
        {Object.values(providers).map((provider) => (
          <li
            className="flex items-center justify-center rounded-2xl border-2 p-4 text-white hover:cursor-pointer"
            key={provider.id}
            onClick={() => {
              signIn(provider.id, {
                callbackUrl: `${window.location.origin}/home`,
              });
            }}
          >
            <img
              className="mr-4 h-10 w-10"
              src="https://advist.pl/wp-content/uploads/2020/04/google.png"
            />
            <p className="text-xl">Log in using {provider.name} </p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/home" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
