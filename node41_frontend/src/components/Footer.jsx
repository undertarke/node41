import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { getUserAPI } from '../utils/fetchFromAPI';


import { io } from 'socket.io-client'

const socket = io("ws://localhost:8081");

const Footer = () => {

    let userToken = localStorage.getItem("LOGIN_USER");
    // data.userId
    let { data } = jwtDecode(userToken);

    const showChat = (show) => {
        document.querySelector("#formChat").style.display = show;

    }


    useEffect(() => {


        getUserAPI().then(result => {

            setUser(result)
        })

    }, [])

    const [drawer, setDrawer] = useState(0);
    const [user, setUser] = useState([]);
    const [toUserId, setToUserId] = useState(0);

    const [dataChat, setDataChat] = useState([]);

    //load danh sách chat
    socket.on("load-chat", (lstchat) => {
        setDataChat(lstchat)
    })

    // { userId, txtChat }
    socket.on("mess-server", (data) => {

        let newChat = [...dataChat];

        newChat.push({
            user_id: data.userId,
            content: data.txtChat
        })

        setDataChat(newChat)
    })


    return <div>

        <button className="open-button" style={{ bottom: 50 }} onClick={() => setDrawer(250)}><i className="fa fa-users" aria-hidden="true" /></button>

        {/* <button hidden className="open-button" onClick={() => showChat("block")}><i className="fa fa-comments" aria-hidden="true" /></button> */}

        <div className="chat-popup" id="formChat">

            <div className="chatHead">
                <p className="chatName" onClick={() => setDrawer(250)}><i className='fa fa-users'></i> List friend</p>
                <button type="button" className="chatClose" aria-label="Close" onClick={() => showChat("none")}><span aria-hidden="true">×</span></button>
            </div>

            <ol className="discussion" id="chat-noiDung">

                {
                    dataChat.map(item => {

                        return item.user_id == data.userId ?

                            <li className="self">
                                <div className="avatar">
                                    <img src="https://amp.businessinsider.com/images/5947f16889d0e20d5e04b3d9-750-562.jpg" />
                                </div>
                                <div className="messages">
                                    {item.content}
                                    <br />
                                    <time dateTime="2009-11-13T20:14">2/2/2022 22:22</time>
                                </div>
                            </li>
                            :

                            <li className="other">
                                <div className="avatar">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHTEFMnih7ZgOPIZej2dclAphUeOhVR1OIFaPoYCOqm9fY1Fv7" />
                                </div>
                                <div className="messages">
                                    {item.content}
                                    <br />
                                    <time dateTime="2009-11-13T20:00">2/2/2022 22:22</time>
                                </div>
                            </li>

                    })
                }

                {/* phải
                <li className="self">
                    <div className="avatar">
                        <img src="https://amp.businessinsider.com/images/5947f16889d0e20d5e04b3d9-750-562.jpg" />
                    </div>
                    <div className="messages">
                        Hallo
                        <br />
                        <time dateTime="2009-11-13T20:14">2/2/2022 22:22</time>
                    </div>
                </li>

                trái
                <li className="other">
                    <div className="avatar">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHTEFMnih7ZgOPIZej2dclAphUeOhVR1OIFaPoYCOqm9fY1Fv7" />
                    </div>
                    <div className="messages">
                        Nope
                        <br />
                        <time dateTime="2009-11-13T20:00">2/2/2022 22:22</time>
                    </div>
                </li>
        */}

            </ol>

            {/* input chat */}
            <div className="chatBottom">
                <input id="txt-chat" className="sentText" type="text" placeholder="Your Text" style={{ flex: 1, border: '1px solid #0374d8', borderRadius: 20, padding: '0 20px' }} />

                <button id="btn-send" onClick={() => {
                    let txtChat = document.querySelector("#txt-chat").value;

                    let roomId = localStorage.getItem("roomId");
                    socket.emit("send-mess", { userId: data.userId, txtChat, roomId })

                }} type="button" className="sendbtn" aria-label="Close"><span aria-hidden="true"><i className="fa-regular fa-paper-plane"></i></span></button>
            </div>

        </div>



        <div style={{ width: drawer }} className='sidenav'>
            <a href="javascript:void(0)" className="closebtn" onClick={() => setDrawer(0)}>×</a>

            {user.map(item => {

                return <a href="#" onClick={() => {
                    let to = data.userId;
                    let from = item.user_id
                    let roomId = to > from ? `${from}-${to}` : `${to}-${from}`

                    socket.emit("join-room", roomId)

                    localStorage.setItem("roomId", roomId);

                    showChat("block")
                }}>

                    <img width={50} src={item.avatar} /> {item.full_name}</a>
            })}
            <hr />

        </div>


    </div>
}

export default Footer