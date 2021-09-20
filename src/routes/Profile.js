import { authService } from "myBase";
import React from "react";
import { useHistory } from "react-router";

export default () => {
  const history = useHistory();
  const onLogOutLick = () => {
    authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogOutLick}>Log Out</button>
    </>
  );
};
