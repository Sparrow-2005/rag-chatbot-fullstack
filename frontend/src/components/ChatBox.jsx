import { useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!question) return;

//     const newMessages = [...messages, { type: "user", text: question }];
//     setMessages(newMessages);
//     setQuestion("");

//     try {
//       setLoading(true);

//       const res = await axios.post("http://localhost:8000/ask", null, {
//         params: { question }
//       });

//       setMessages([
//         ...newMessages,
//         { type: "bot", text: res.data.answer }
//       ]);
//     } catch (error) {
//       console.error(error);
//       setMessages([
//         ...newMessages,
//         { type: "bot", text: "Error getting response ❌" }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };
const sendMessage = async () => {
    if (!question) return;
  
    const newMessages = [...messages, { type: "user", text: question }];
    setMessages(newMessages);
    setQuestion("");
  
    try {
      setLoading(true);
  
      const res = await axios.post(
        "http://localhost:8000/ask",
        {
          question: question
        }
      );
  
      setMessages([
        ...newMessages,
        { type: "bot", text: res.data.answer }
      ]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { type: "bot", text: "Error getting response ❌" }
      ]);
    } finally {
      setLoading(false);
    }
  };

//   return (
//     <div>
//       <div style={{ marginBottom: "20px" }}>
//         {messages.map((msg, index) => (
//           <MessageBubble key={index} type={msg.type} text={msg.text} />
//         ))}
//         {loading && <p>Bot is typing...</p>}
//       </div>

//       <input
//         type="text"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         placeholder="Ask something..."
//         style={{ width: "70%", marginRight: "10px" }}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
return (
    // <div 
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     height: "70vh",
    //     border: "1px solid #ddd",
    //     borderRadius: "10px",
    //     padding: "10px"
    //   }}
    // >
    <div
  style={{
    display: "flex",
    flexDirection: "column",
    height: "570px",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px",
    background: "#242424"
  }}
>
      {/* Scrollable Messages Area */}
      <div 
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "10px"
        }}
      >
        {messages.map((msg, index) => (
          <MessageBubble key={index} type={msg.type} text={msg.text} />
        ))}
  
        {loading && <p>Bot is typing...</p>}
      </div>
  
      {/* Input Section */}
      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
          style={{ flex: 1, marginRight: "10px", padding: "10px" }}
        />
        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}