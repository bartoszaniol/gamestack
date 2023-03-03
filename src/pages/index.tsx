import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { authOptions } from "~/server/auth";

const index = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-prim-blue to-sec-blue">
      <p className="pt-20 text-center text-5xl font-bold text-white">
        <span className="text-red-600">S</span>tart stacking up yo
        <span className="text-red-600">u</span>r
      </p>
      <p className=" pt-10 text-center text-5xl font-bold text-white">
        games on the <span className="text-red-600">s</span>tack of shame
      </p>
      <button
        className=" mt-40 w-max rounded-lg bg-blue-600 p-2 px-5 text-2xl font-bold  text-white"
        onClick={() => {
          signIn();
        }}
      >
        Sign in
      </button>
    </main>
  );
};

export default index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/home" } };
  }

  return {
    props: {},
  };
}
