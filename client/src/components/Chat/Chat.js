import React , {useState,useEffect} from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css'
import InfoBar from '../InfoBar/InfoBar.js'
import Input from '../Input/Input.js'
import Messages from '../Messages/Messages.js'

let socket ;

const Chat = ({location}) =>{

    const [name,setName]= useState('');
    const [room,setRoom]= useState('');
    const [message,setMessage]= useState('');
    const [messages,setMessages]= useState([])
    const [users,setUsers]=useState([]);
    const ENDPOINT = 'localhost:5000';


    useEffect(()=>{
        const {name,room} = queryString.parse(location.search);
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
        socket.emit('join',{name,room},()=>{
            
        });

        return ()=>{
            socket.emit('disconnected');
            socket.off();
            
        }
    
    },[ENDPOINT, location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message])
        })
    },[messages]);

    // sending message code
    const sendMessage = (event) =>{
        event.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=> setMessage(''));
        }
    }
    // console.log(message,messages)

    useEffect(()=>{
        socket.on('roomData',({users})=>{
            setUsers(users)
            console.log(users)
        })
    },[users])

    return(
        <div className="outerContainer">
            <div className="container">
            <InfoBar roomName={room} users={users}/>
            <Messages messages={messages} name ={name}/>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

export default Chat;