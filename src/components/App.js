import { React, useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "myBase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 로그인 한뒤 로그인 처리가 안되는 이유는 초기화 과정이 firbase가 너무 빨라서 로그인 처리를 못해주기 떄문이다.
  // init 는 초기화로 setInit으로 init를 true값으로 바꿔주면 초기화가 완료 되었다는 소리이다
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // onAuthStateChanged를 통해서 user에 변화가 있을시 자동으로 인식한다.

      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []); //[]값은 처음 시작될떄 실행 되는 값이다.
  // 자동으로 잠깐 시간을 가진뒤에 => 이떄 실행되는것이 initializing....
  // user가 있는지 없는지를 파악한뒤 해당 결과에 맞는 값을 파싱해 준다.

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "initializing..."
      )}
    </>
  );
}
export default App;
