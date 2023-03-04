import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next/types";
import React from "react";
import { authOptions } from "~/server/auth";

const User = () => {
  const session = useSession();
  const userName = session.data?.user.name;
  return <div>{userName}</div>;
};

export default User;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/" } };
  }

  return {
    props: {},
  };
}
