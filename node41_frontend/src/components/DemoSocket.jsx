// rafce

import React, { useState } from 'react'
import { io } from "socket.io-client";

const DemoSocket = () => {

    // đối tượng socket client => connect với server realtime
    // const socket = io("http://localhost:8081")
    let [data, setData] = useState("");
    const socket = io("ws://localhost:8081")

    // key , function
    socket.on("send-data", (dataSocket) => {

        document.querySelector("#noiDung").innerHTML += dataSocket + " đã kết nối <br/>"
    })


    socket.emit("client-data",123)

    return (
        <div id="noiDung" className='text-white'>


        </div>
    )
}

export default DemoSocket