import { useRouter } from "next/router";
import React from "react";

const User = () => {
  const router = useRouter();
  const userId = router.query.userId;
  return <div>{userId}</div>;
};

export default User;
