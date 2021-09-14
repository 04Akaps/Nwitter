import { authService } from "myBase";
import { React, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccout, setNewAccout] = useState(true);
  const [error, setError] = useState("");

  function onChange(event) {
    const {
      target: { name, value },
    } = event;
    // console.log(value);
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    let data;
    try {
      if (newAccout) {
        //회원가입
        data = createUserWithEmailAndPassword(authService, email, password);
      } else {
        //로그인 해야함
        data = signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  }

  const toggleAcount = () => setNewAccout((prev) => !prev);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccout ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAcount}>
        {newAccout ? "Log in" : "CreateAccount"}
      </span>
      <div>
        <button> Continue with Google</button>
        <button> Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
