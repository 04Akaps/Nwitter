import { authService, firebaseInstance } from "myBase";
import { React, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccout, setNewAccout] = useState(true);
  const [error, setError] = useState("");

  function onChange(event) {
    const {
      target: { name, value },
    } = event; // event에 있는 target을 가져오고 그중 name와 value를 가져 오겠다는 의미

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
        //createUserWithEmailAndPassword자체가 회원가입이 완료되면 자동으로 로그인 처리를 해준다.
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

  const onSocialClicek = (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else {
      provider = new GithubAuthProvider();
    }
    try {
      const data = signInWithPopup(authService, provider);
    } catch (err) {
      console.log(err);
    }
  };

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
      </form>

      <span onClick={toggleAcount}>
        {newAccout ? "Log in" : "CreateAccount"}
      </span>
      <div>
        <button onClick={onSocialClicek} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClicek} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
