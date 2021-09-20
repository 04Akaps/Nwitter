import { dbService } from "myBase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, SetNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await getDocs(collection(dbService, "nweets"));
    dbNweets.forEach((a) => {
      const nweetObject = {
        ...a.data(),
        id: a.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
      // setNweets((prev) => [a.data(), ...prev]);
    });
  };
  // db에서 이름이 nweets인 모든 값을 가져온다.
  // 이떄 이상한 값을 가져오는데 queryselector라는 것을
  // 이곳에서 내가 쓴 글을 꺼내오는 로직이다.
  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    // db에 내가 적는 값을 파싱해주는 로직이다.
    try {
      const docRef = addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } catch (error) {
      console.log(error);
    }
    SetNweet("");
  };
  // onsubmit부분은 firebase에 있는 db로 저장이 되게 하는 곳이다.

  const onChange = (event) => {
    SetNweet(event.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="what is your mind"
          maxLength={120}
        />
        <input type="submit" value="Nweeet" />
      </form>
      <div>
        {nweets.map((c) => {
          return (
            <Nweet key={c.id} tweet={c} isOwner={c.creatorId === userObj.uid} />
          );
        })}
      </div>
      <p>2021 Nwitter[연습용]</p>
    </div>
  );
};

export default Home;
