import React from 'react'
import './ChatComponent.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {MainContainer,ChatContainer,MessageList,Message,MessageInput,TypingIndicator} from '@chatscope/chat-ui-kit-react'
import { useState,useEffect } from 'react';


const ChatComponent = ({setStage,setFile,filename,setFileName}) => {
    const [messages,setMessages]= useState(()=>{
      // Retrieve chat history from sessionStorage, or default to an empty array
      const savedChat = sessionStorage.getItem('chatHistory')
      return savedChat ? JSON.parse(savedChat) : [{
        message:"Hello Ask Me Question About the Pdf",
        sender:"AI",
        direction:"incoming"
      }]
    });
    const [typing,setTyping] = useState(false)

    useEffect(() => {
      // Store the chat history in sessionStorage whenever it changes
      sessionStorage.setItem('chatHistory', JSON.stringify(messages));
    }, [messages]);


      const handleSend = async (message)=>{
        const newMessage = {
          message:message,
          sender:"user",
          direction:"outgoing"
        }
        // set typing
        setTyping(true)
        // update messages
    
        const newMessages = [...messages,newMessage]
        setMessages(newMessages)

        // get answer from server

        const urlWithQueryString = `https://pdf-chat-g5tg.onrender.com/ask?input=${encodeURIComponent(message)}&reference=${filename}`;
            await fetch(urlWithQueryString)
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                setTyping(false)
                
                const messageFromAi = {
                    message:data,
                    sender:"AI",
                    direction:"incoming"
                }
                const newMessagesFromAi = [...newMessages,messageFromAi]
                setMessages(newMessagesFromAi)
            })
            .catch(error => {
                // Handle errors
                console.error('There was a problem with the fetch operation:', error);
            });
    }
   const handleClick = async()=>{

    await fetch(`https://pdf-chat-g5tg.onrender.com/delete?reference=${filename}`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
       console.error(data)
    })
    .catch(error => {
        // Handle errors
        console.error('There was a problem with the delete operation:', error);
    });

        const initialMessage = [{
        message: "Hello Ask Me Question About the Pdf",
        sender: "AI",
        direction: "incoming"
        }];
        setMessages(initialMessage);
        sessionStorage.setItem('chatHistory', JSON.stringify(initialMessage));
        setFileName("")
        setStage(0)
        setFile(null)
        
       
   }
   window.addEventListener('beforeunload', async function (e) {
    // Send a request to server to delete the file
    await fetch(`https://pdf-chat-g5tg.onrender.com/delete?reference=${filename}`)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
       console.error(data)
    })
    .catch(error => {
        // Handle errors
        console.error('There was a problem with the delete operation:', error);
    });
  })
  return (
    <>
    <p className='newChat' onClick={handleClick}><button>New Chat</button></p>
    <div className='container'>
       <MainContainer>
          <ChatContainer>
        <MessageList 
        scrollBehavior='smooth'
        typingIndicator={typing?<TypingIndicator content="AI is Thinking"/>:null}>

              { messages.map((message,i) =>{
                  return <Message key={i} model={message} className='message'/>
              })} 
            </MessageList>
            <MessageInput placeholder='Type Here' onSend={handleSend} className='message'/>
          </ChatContainer>

       </MainContainer>

    </div>

</>
  )
}

export default ChatComponent