import "./chat.scss";
import Header from "../../../components/header";
import { useState } from "react";
import Conversation from "../../../components/conversations/Conversation.js";
import Message from "../../../components/message/Message";
import axios from "axios";
import { useEffect, useRef } from "react";

export default function Messenger({ connectionId }) {
  const [user, setUser] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  const id = localStorage.getItem("_id");

  console.log("Inside React component: " + id);

  const connId = localStorage.getItem("connectionId");

  console.log("Con Id: " + connId);
  useEffect(() => {
    conversationI();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/get-profile-data/${id}`)
      .then((res) => {
        // console.log(res.data);
        const {
          firstname,
          lastname,
          email,
          github_profile,
          linkedin_profile,
          target_role,
          target_company,
          resume,
        } = res.data;

        // console.log("User Menu: " + res.data.target_role);
        setUser(res.data);
      });

    const getConversations = async () => {
      try {
        console.log("Get Convo method");
        const conversationId = localStorage.getItem("conversationId");
        const res = await axios.get(
          `http://localhost:5050/convo/${conversationId}`
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, []);

  useEffect(() => {
    if (currentChat) {
      const getMessages = async () => {
        try {
          const res = await axios.get(
            // `http://localhost:5050/allMessages/${currentChat?._id}`
            `http://localhost:5050/allMessages/${id}`
          );
          console.log("Set Mess: " + res.data);
          setMessages(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getMessages();
    }
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      // conversationId: currentChat._id,
      conversationId: id,
    };
    try {
      console.log("Sender user id: " + user._id);
      const res = await axios.post("http://localhost:5050/Messages", message);
      setMessages([...messages, res.data]);
      console.log("Conversation iD: " + currentChat._id);
      console.log("Set Messages 1: " + newMessage);

      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    // try {
    //  // const res = await axios.post("http://localhost:5050/convo", message);
    //   // setMessages([...messages, res.data]);
    //   // setNewMessage("");

    //   axios({
    //     method: 'post',
    //     url: "http://localhost:5050/convo",

    //     // members: [req.body.senderId, req.body.receiverId],
    //     data: {
    //       senderId: '638d996a3e6107cf60c5adf4',
    //       receiverId: '6391677e2010c5d3e5c24c36'// This is the body part
    //     }
    //   });

    // } catch (error) {
    //   console.log(error);
    // }
  };

  function conversationI() {
    try {
      // const res = await axios.post("http://localhost:5050/convo", message);
      // setMessages([...messages, res.data]);
      // setNewMessage("");

      axios({
        method: "post",
        url: "http://localhost:5050/convo",

        // members: [req.body.senderId, req.body.receiverId],
        data: {
          //  senderId: '638d996a3e6107cf60c5adf4',
          //  receiverId: '6391677e2010c5d3e5c24c36'// This is the body part

          senderId: id,
          receiverId: localStorage.getItem("connectionId"), // This is the body part
        },
      }).then((response) => {
        localStorage.setItem("conversationId", response.data);
        console.log(response.data);
      });
      //  ;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <Header page="messenger" />
      <div className="messenger">
        <div className="chatmenu">
          <div className="chatMenuWrapper">
            <input placeholder="serach for matches" className="chatMenuInput" />
            {/* {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))} */}

            <div
              onClick={
                () => {
                  setCurrentChat(connId);
                  // conversationI();
                }
                // setCurrentChat(connId)}>
              }
            >
              <Conversation conversation={connId} currentUser={id} />
            </div>
            {/* <Conversation conversation={connectionId} currentUser={user} /> */}
          </div>
        </div>
        <div className="chatbox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write a message..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConvoText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
