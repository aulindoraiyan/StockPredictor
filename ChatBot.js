import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chatbot.css';

function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your financial advisor. How can I assist you today?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(true); // State for toggle
  const messagesEndRef = useRef(null);

  const handleUserInput = async () => {
    if (userInput.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    const response = await getOpenAIResponse(userInput);
    setMessages([...newMessages, { sender: "bot", text: response }]);
  };

  const getOpenAIResponse = async (message) => {
    try {
      const apiKey = ''; // Replace with your OpenAI API key
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful financial advisor. Only give financial advice.' },
            { role: 'user', content: message },
          ],
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching OpenAI response: ", error);
      return "Sorry, I'm having trouble understanding that.";
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChatbot = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`chatbot-container ${isExpanded ? '' : 'minimized'}`} style={{ height: isExpanded ? '450px' : '60px' }}>
      <div className="chatbot-header" onClick={toggleChatbot}>
        {isExpanded ? 'Financial Advisor ChatBot' : ''}
      </div>
      {isExpanded && (
        <>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-body">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask me about stocks or financial advice..."
              className="chatbot-input"
            />
            <button onClick={handleUserInput} className="chatbot-submit-btn">
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ChatBot;
