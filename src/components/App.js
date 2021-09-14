import { React, useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "myBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 로그인 한뒤 로그인 처리가 안되는 이유는 초기화 과정이 firbase가 너무 빨라서 로그인 처리를 못해주기 떄문이다.
  // init 는 초기화로 setInit으로 init를 true값으로 바꿔주면 초기화가 완료 되었다는 소리이다
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // user가 바뀌는 것에 따라서 자동으로 페이지를 맵핑해주는 로직
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>{init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..."}</>
  );
}
export default App;
