import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/chat.css";
import {getChatMessages } from '../../services'
import ChatPerson from '../../components/ChatPerson'
import MsgBox from '../../components/MsgBox'
import io from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState({})
  const [room, setRoom] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([])
  const [activeUser, setActiveUser] = useState({})
  const [msg, setMsg] = useState("")
  const [messages, setMessages] = useState([])

  
  useEffect(() => {
    var _user = JSON.parse(localStorage.getItem('user'));
    setUser(_user.user)

    socket = io("localhost:5000")
    //console.log(socket)
    var temp = _user.user
    temp = { _id: temp._id, email: temp.email, name: temp.name, room: 'all', blocks: temp.blocks}
    console.log(temp)
    //socket.emit('join', { _id: temp._id, email: temp.email, name: temp.name, room: 'all', blocks: temp.blocks})
    joinUser(temp)
    return () => {
      //socket.emit('disconnect');
      //socket.off();
    }
  }, [])

  const joinUser = (new_user) => {
    socket.emit('join', new_user)

  }

  const sendMessage = (e) => {
    e.preventDefault()
    if(activeUser.socket_id) {
      if(!msg) {
        alert(" message box is empty")
        return 
      } else {
        var _msg = {sender_name: user.name, sender_id: user._id, receiver_id: activeUser._id, message: msg, type: 'private_msg', receiver_socket_id: activeUser.socket_id}
        socket.emit('sendMessage', _msg)
        setMessages((messages) => [
          ...messages,
          _msg
        ])
        setMsg("")

        //console.log(msg)
      }
    } else {
      alert("Select a userUser")
    }
    
  }

  useEffect(() => {
    socket.on('joined', (message) => {   
      var activeUser = JSON.parse(localStorage.getItem('user'));
        var _users = message.users
        _users = _users.filter((item) => {
          if(item.email !== activeUser.user.email) {
            return item
          }
        })  
        //console.log(user.email + "just joined")
        console.log(_users)
        setOnlineUsers(_users)
    })
  }, [])
  
  useEffect(() => {
    socket.on('message', (message) => {
     
        if(!!activeUser && (activeUser._id == message.message.sender_id)) {
          
          message = message.message
          setMessages((messages) => [
            ...messages,
            message
          ])
        } else {
          var _payload = message.message
          toast.success(`@${_payload.sender_name}: ${_payload.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          //toast(`@${_payload.sender_name} - `)
          //alert(_payload.sender_name + " "+_payload.message)
        }

        
        //setMessages([...messages, {...message}])
    })
  }, [activeUser])

  const selectUser = async (payload) => {
    try {
      var results = await getChatMessages({sender_id: payload._id, receiver_id: user._id})
      setMessages(results.data.messages)
      console.log(results)
    } catch (error) {
      
    }
    setActiveUser(payload)
    console.log(payload)
  }

  
  return (
    <div>
      <div className="container">
        <h3 className=" text-center">Welcome to Rio</h3>
        <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <h4>{user.name}</h4>
                  <h4>{user.email}</h4>
                </div>
                
              </div>
              <div className="inbox_chat">
                  {
                    onlineUsers.map((u) => {
                      return (
                        <ChatPerson user={u} key={u._id} onClick={selectUser} joinUser={joinUser}  activeUserId={activeUser._id || null}/>
                      )
                    })
                  }
                  
                
               
            
                
                
                
              </div>
            </div>
            <div className="mesgs">
              <div className="msg_history">
                  {messages.map((m, index) => {
                    return (
                      <MsgBox key={index} msg={m} user_id={user._id}/>
                    )
                  })}
                
                </div>
                
              <div className="type_msg">
                <div className="input_msg_write">
                  <form onSubmit={(e) => sendMessage(e)}>
                  <input
                    type="text"
                    className="write_msg"
                    placeholder="Type a message"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  />
                  <button className="msg_send_btn" type="button" onClick={sendMessage}>
                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                  </button>
                  </form>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Chat;
