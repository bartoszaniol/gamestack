import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import { authOptions } from "~/server/auth";

const index = () => {
  return (
    <>
      <p>Stack up your unfinished/planned games</p>
      <button
        className="m-2 bg-blue-600 p-1 font-bold text-white"
        onClick={() => {
          signIn();
        }}
      >
        Sign in
      </button>
    </>
  );
};

export default index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/home" } };
  }

  const providers = await getProviders();
  console.log(providers);

  return {
    props: { providers: providers ?? [] },
  };
}
