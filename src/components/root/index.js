import React, { memo, useState } from "react";
import Login from "./login";
import User from "./admin";

const Root = () => {
  const [rootUser, setRootUser] = useState({});
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
