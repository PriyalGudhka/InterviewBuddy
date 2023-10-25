import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./conversation.scss";

//function to set conversation between two users
export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  //UseEffect to get matchId
  useEffect(() => {
    const matchId = localStorage.getItem("connectionId");

    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5050/api/get-profile-data/${matchId}` //Api to get one user's data with matchId
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  //Connenction's name in messenger
  return (
    <div className="conversation">
      <span className="conversationName">{user && user.firstname}</span>
    </div>
  );
}
