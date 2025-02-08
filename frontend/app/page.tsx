//@ts-nocheck
"use client"
import { useState } from "react";

import Image from "next/image";
import axios from "axios";

const ChatComponent = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const [messages, setMessages] = useState<{ text:string, sender: string }[]>([
    
  ]);
  const send = (message: string) => {
    
      
    } 
  
  const [userInput, setUserInput] = useState("");

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  const sendMessage = () => {
    if (userInput.trim() !== "") {
      setMessages([...messages, { text: userInput, sender: "user" }]);
      setUserInput("");
      axios.get("http://127.0.0.1:5000/chat?prompt=" + userInput).then((response) => {
        console.log(response.data);
        setMessages((prevMessages) => [...prevMessages, { text: response.data.response, sender: "bot" }]);
      });
    }
  };

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
      <button
        onClick={toggleChatbox}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Chat with Admin Bot
      </button>

      {isChatboxOpen && (
        <div className="fixed bottom-16 right-4 w-400 bg-white shadow-md rounded-lg max-w-md ">
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">Admin Bot</p>
            <button
              onClick={toggleChatbox}
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div  className="p-4 h-80 overflow-y-auto ">
        <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${msg.sender === "user" ? "text-right" : ""}`}
              >
                <div className="flex items-center justify-end">
                {msg.sender === "bot" ? (
                <Image   src="/robot.avif"
      width={50}
      height={50}
      alt="Picture of the author"/>):null}
                <p
                  className={`${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } rounded-lg py-2 px-4 inline-block`}
                >
                  {msg.text}
                </p>
                </div>
              </div>
            ))}</>
          </div>
          <div className="p-4 border-t flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
