import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth } from "./firebase";
import { provider } from "./firebase";

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((e) => alert(e));
  };

  return (
    <div className="login">
      <div className="login__user">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/9/98/Discord_logo.svg/233px-Discord_logo.svg.png"
          alt="discord"
        />
      </div>
      <Button onClick={signIn} variant="contained" color="primary">
        Sign in
      </Button>
    </div>
  );
}
export default Login;
