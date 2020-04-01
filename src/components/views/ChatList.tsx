/*
This component is for listing all previously opnened chats.
*/
import "../chat-window/chat.scss";
import React, { useEffect, useState, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { History, LocationState } from "history";

import { getChats, newChat } from "../../services/chat";
import { User } from "../../models/types";
import history from "../../history";
import icon from "../../pictures/tradyheadorange.png";
import renderIcon from "../../pictures/renderingChat.gif";
import picture from "../../pictures/tradygradedarkblue.png";
import { render } from "react-dom";

interface Props {
  user: User;
  history: History<LocationState>;
  users: User[];
}

const ChatList = (props: Props) => {
  const [chatList, setChatList] = useState<Array<any>>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number>();
  const [renderingYes, setRenderingYes] = useState<boolean>(true)

  const myLists = async () => {
    let chatList = await getChats(props.user.id);
    setChatList(chatList);
    setUserList(props.users);
    setRenderingYes(false)
  };

  useEffect(() => {
    myLists();
  }, [props.user]);

  const createChat = async () => {
    let newChatID;  
    try {
          newChatID = await newChat({
            user1: props.user.id,
            user2: selectedUser
          })
      } catch (err) {
          throw err
      }
    history.push(`/chat/${newChatID}`)
  };

  return (
    <div className="MyChatWindow">
      <div className="MyChats">
        <h3>MyChats</h3>
        <div>
          <select
            name="users"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedUser(parseInt(e.target.value))}
          >
            <option value=""></option>
            {userList.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
          <button onClick={() => createChat()}>Start a new conversation</button>
          {renderingYes ? (<img src={renderIcon} height="50em" />) : (chatList === undefined ? (
            <div className="ChatBlock">
              <div id="noChats">
                <p>
                  First time chatting? <br />
                  <br /> No worries just search for a person and start a new
                  conversation!
                </p>
                <img src={icon} height="50em" />
              </div>
            </div>
          ) : (
            chatList.map(chat => (
              <div
                key={chat.chatid}
                style={{ textDecoration: "none" }}
                onClick={() => history.push(`/chat/${chat.chatid}`)}
              >
                <div className="ChatBlock">
                  <div id="userDiv">
                    <img src={chat.picture || icon} height="20em" />
                    <b> {chat.name} </b>
                  </div>
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
      <div className="MyChatOutput">
        <img src={picture} alt="tradygradedarkblue" />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  users: state.users
});

export default connect(mapStateToProps)(ChatList);
