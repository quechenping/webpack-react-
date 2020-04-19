import React, { memo, useState } from "react";
import Login from "./login";
import User from "./admin";

const Root = () => {
  const [rootUser, setRootUser] = useState({ user: "admin" });
  return (
    <div>
      {JSON.stringify(rootUser) === "{}" ? (
        <Login setRootUser={setRootUser} />
      ) : (
        <User user={rootUser} />
      )}
    </div>
  );
};

export default memo(Root);
