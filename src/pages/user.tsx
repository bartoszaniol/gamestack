import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next/types";
import React from "react";
import { authOptions } from "~/server/auth";

const index = () => {
  return <div>User</div>;
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
