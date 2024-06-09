
import React,{useEffect,useState,useRef} from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
// import Logout from './Logout';
//import Messages from './Messages';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import {v4 as uuidv4} from 'uuid';
import {IoIosArrowRoundBack} from 'react-icons/io'

export default function ChatContainer({ currentChat ,currentUser, socket, getVisibility}) {
   
const [messages , setMessages] = useState([]);
const [arrivalMessage, setArrivalMessage] = useState(null);
//const [fromConfirmation, setFromConfirmation]= useState(undefined);

const [visibilityFromChatContainer, setVisibilityfromChatContainer] = useState(false);

const scrollRef = useRef();

useEffect(()=>{
const myfunction = async ()=>{
    if(currentChat){
const response = await axios.post(getAllMessagesRoute,{
    from: currentUser._id,
    to: currentChat._id,
});
//console.log('response',response);
setMessages(response.data)
    }
}
myfunction();

},[currentChat])



    const handleSendMessage = async (msg)=>{
        
        await axios.post(sendMessageRoute,{
            from: currentUser._id,
            to: currentChat._id,
            message:msg
        });
        socket.current.emit("send-msg",{
            to:currentChat._id,
            from:currentUser._id,
            message:msg,
        });

        const msgs = [...messages];
        //console.log(msgs);
        msgs.push({ fromSelf: true, message:msg});
        setMessages(msgs);
    }
   
        // socket.current.on("msg-recieve",(msg,cChat)=>{
        //     console.log(cChat+","+currentChat._id);
        //   if(cChat===currentChat)
        //    setArrivalMessage({fromSelf: false, message: msg})
        // })
     
 

    useEffect(()=>{
       
        //console.log('socket.current',socket.current);
     if(socket.current){
        socket.current.on("msg-recieve",(msg,cChat)=>{
           //randomfunction(msg,cChat);
           if(cChat===currentChat._id){
            setArrivalMessage({fromSelf: false, message: msg})
         }

        })
        return ()=> socket.current.off('msg-recieve');
     }
    })

    useEffect(()=>{
       // console.log('arrivalMessage',arrivalMessage);
        arrivalMessage && setMessages((prev) => {
            console.log("in useEfeect 2 ",prev);
            return [...prev, arrivalMessage]
        });
      //  console.log('Messages',messages);
    },[arrivalMessage]);

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"});
    },[messages])


    const handleBackButton = ()=>{
        setVisibilityfromChatContainer(true);
        getVisibility(visibilityFromChatContainer)
    }
    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <button onClick={handleBackButton}>
                     <IoIosArrowRoundBack/>
                     </button>
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                        <p>{currentChat.username}</p>
                    </div>
                </div>
                
            </div>

            
               <div className="chat-messages">
                {
                messages.map((message)=>{
                    return(
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${message.fromSelf ? "sended":"recieved"}`}>
                                <div className="content">
                                    <p>
                                       {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })

                }
               </div>
            
            
                <ChatInput handleSendMessage={handleSendMessage}/>
          
        </Container>
    )
}
const Container = styled.div`
overflow:hidden;
background-color:#111528;
border-radius: 1rem;
gap:0.1rem;
display:flex;
flex-direction:column;
.chat-header{
    border-bottom: 0.5px solid #323046;
    display:flex;
    justify-content:space-between;
    padding:1rem;
    .user-details{
        display:flex;
        align-items:center;
        margin-left:1rem;
        button{
            display:none;
            border-radius: 2rem;
            display: flex;
            padding:0 0.5rem;
            justify-content: center;
            align-items: center;
            background-color: transparent;
            border: none;
            height:100%;
            svg {
              font-size: 2rem;
              color: white;
            }
        }
      .username{
        p {
            margin-top: 0;
            margin-bottom: 0rem; 
            color:white;
            font-size: 1.5rem;
        }
      }
        .avatar{
            padding-right:1rem;
            img{
                height:2rem;
            }
        }
    }
}
.chat-messages{
    height:65vh;
    max-height:80vh;
    padding: 1rem 1rem;
    display:flex;
    flex-direction: column;
    gap:1rem;
    overflow:auto;
    bakcground-color:#111528;
    
    .message{
        display:flex;
        align-items: center;
        .content{
            max-width:40%;
            overflow-wrap: break-word;
            padding:0rem 1rem;
            font-size:1rem;
            display:flex;
            border-radius: 1rem;
            align-items: center;
            color: #d1d1d1;
            p{
                margin-top:1rem;
            }
        }
    }
    .sended{
        justify-content:flex-end;
        .content{
           // background: linear-gradient(to bottom,#01050B,#011533);
           // align-items: center;
           background: #f41b3e;
        }
    }
    .recieved{
        justify-content:flex-start;
        .content{
            background: linear-gradient(#0C1122, #0C1122) padding-box,
            linear-gradient(45deg, #FF1067, #6F27FD) border-box;
            border: 1px solid transparent;
            border-radius: 20px;
            background-color: transparent;
            color:grey;
        }
    }
}

@media screen and (min-width: 545px) {
    .chat-header{
        .user-details{
            button{
                display:none;
            }
        }
    }
}
@media screen and (max-width: 545px){
    .chat-header{
        .user-details{
            margin: 0;
            button{
                
                border-radius: 2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: transparent;
                border: none;
                height:100%;
                svg {
                  font-size: 2rem;
                  color: white;
                }
            }
        }
    }
    .chat-messages{
        height:78vh;
    }
}
`;
