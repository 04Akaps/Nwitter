import { React } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/home";
import Navigation from "./Nvigation";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <>
            <Route path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
// hook을 사용해서 인증된 사용자= 로그인된 사용자 는 홈페이지로 이동
// 로그인이 안된 사용자는 로그인 페이지로 이동하는 로직
