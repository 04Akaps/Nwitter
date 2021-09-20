import { dbService } from "myBase";
import React from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react/cjs/react.development";

const Nweet = ({ tweet, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(tweet.text);

  const onDelete = () => {
    const ok = window.confirm("정말 삭제 하시겠습니까?");
    if (ok) {
      deleteDoc(doc(dbService, `nweets/${tweet.id}`));
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateDoc(doc(dbService, `nweets/${tweet.id}`), {
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  return (
    <div>
      <p>{tweet.text}</p>
      {editing ? (
        <form onSubmit={onSubmit}>
          <input
            placeholder="edit your nweet"
            value={newNweet}
            onChange={onChange}
            required
          />
          <input type="submit" value="Update Nweet" />
          <button onClick={toggleEditing}>Cancel</button>
        </form>
      ) : (
        <>
          {isOwner === true ? (
            <>
              <button onClick={onDelete}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
