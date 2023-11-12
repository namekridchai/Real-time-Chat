import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3001';
import { io } from 'socket.io-client'
const socket = io(URL);
function App() {
  const [allMsg,setAllMsg] = useState([])
  const [name, setName] = useState('name')
  const [msg, setMsg] = useState('message')
  const [isConnected, setIsConnected] = useState(socket.connetced);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    function recMsg(value) {
      console.log(socket)
    

      setAllMsg((allMsg)=>[...allMsg,value]);
        console.log(value)
        
      
    }
    console.log('rendor')
   
    socket.on('connect', onConnect); 
    socket.on('disconnect', onDisconnect);
  
    socket.on('new-message', recMsg);
 
    return () => {
      console.log('clear')
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('new-message');
   
    };
  },[socket]);
  function sent_msg(){
    socket.emit('sent-msg',{'name':name,'msg':msg})
    setAllMsg((allMsg)=>[...allMsg,{'name':name,'msg':msg}]);
  }
  return (
    <>
    
      <div className="card">
        
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
       
        <input type="text"  value={msg} onChange={(e) => setMsg(e.target.value)}/>
        <button onClick={sent_msg}>submit</button>
      </div>
     
      {allMsg.length!=0 && allMsg.map((e)=><p><b>{e.name}:</b>  {e.msg}</p>)}    
    </>
  )
}

export default App
