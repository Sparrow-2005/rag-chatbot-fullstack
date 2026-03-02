// // import { useState } from "react";
// // import axios from "axios";
// // import UploadSection from "./components/UploadSection";
// // import ChatBox from "./components/ChatBox";
// // function App() {
// //   const [file, setFile] = useState(null);
// //   const [question, setQuestion] = useState("");
// //   const [messages, setMessages] = useState([]);

// //   const uploadPDF = async () => {
// //     const formData = new FormData();
// //     formData.append("file", file);

// //     await axios.post("http://localhost:8000/upload-pdf", formData);
// //     alert("PDF Uploaded Successfully");
// //   };

// //   const askQuestion = async () => {
// //     const res = await axios.post("http://localhost:8000/ask", null, {
// //       params: { question }
// //     });

// //     setMessages([
// //       ...messages,
// //       { type: "user", text: question },
// //       { type: "bot", text: res.data.answer }
// //     ]);

// //     setQuestion("");
// //   };

// //   return (
// //     <div style={{ padding: "40px", fontFamily: "Arial" }}>
// //       <h1>RAG Chatbot</h1>

// //       <input
// //         type="file"
// //         onChange={(e) => setFile(e.target.files[0])}
// //       />
// //       <button onClick={uploadPDF}>Upload PDF</button>

// //       <hr />

// //       <div style={{ marginTop: "20px" }}>
// //         {messages.map((msg, index) => (
// //           <div key={index}>
// //             <strong>{msg.type === "user" ? "You" : "Bot"}:</strong> {msg.text}
// //           </div>
// //         ))}
// //       </div>

// //       <div style={{ marginTop: "20px" }}>
// //         <input
// //           type="text"
// //           value={question}
// //           onChange={(e) => setQuestion(e.target.value)}
// //           placeholder="Ask something..."
// //         />
// //         <button onClick={askQuestion}>Send</button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;
// import UploadSection from "./components/UploadSection";
// import ChatBox from "./components/ChatBox";

// function App() {
//   return (
//     <div style={{ padding: "40px", fontFamily: "Arial" }}>
//       <h1>RAG Chatbot</h1>
//       <UploadSection />
//       <ChatBox />
//     </div>
//   );
// }

// export default App;
import { useState } from "react";
import UploadSection from "./components/UploadSection";
import ChatBox from "./components/ChatBox";

function App() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [chatKey, setChatKey] = useState(0); // used to reset ChatBox

  const handleUploadSuccess = (name) => {
    setFileName(name);
    setIsUploaded(true);
  };

  const handleNewChat = () => {
    setIsUploaded(false);
    setFileName("");
    setChatKey(prev => prev + 1); // 🔥 forces ChatBox reset
  };

  // return (
  //   <div style={{ padding: "40px", fontFamily: "Arial" }}>
  //     <h1>RAG Chatbot</h1>

  //     {!isUploaded ? (
  //       <UploadSection onUploadSuccess={handleUploadSuccess} />
  //     ) : (
  //       <div style={{ marginBottom: "20px" }}>
  //         <p><strong>Document:</strong> {fileName}</p>
  //         <button onClick={handleNewChat}>
  //           Start New Chat 
  //         </button>
  //       </div>
  //     )}

  //     {isUploaded && <ChatBox key={chatKey} />}
  //   </div>
  // );
  return (
      <div
          style={{
            minHeight: "100vh",
            background: "#111827",
            fontFamily: "Segoe UI, sans-serif",
            display: "flex",
            flexDirection: "column"
          }}
      >
      <div
        style={{
          width: "94.5vw",
          flex: 1,
          padding: "40px",
          background: "#1f2937",
          display: "flex",
          flexDirection: "column",
          paddingBottom:"0px",
          background: "black",
          borderRadius: "0px",
          padding: "40px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontWeight: "600",
            fontSize: "28px",
            color: "white"
          }}
        >
          RAG Chatbot
        </h1>
  
        {!isUploaded ? (
          <UploadSection onUploadSuccess={handleUploadSuccess} />
        ) : (
          <>
            <div
              style={{
                marginBottom: "20px",
                padding: "14px 20px",
                background: "white",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                color:'black',
                alignItems: "center"
              }}
            >
              <span style={{ fontWeight: 500 }}>
                Document: {fileName}
              </span>
  
              <button
                onClick={handleNewChat}
                style={{
                  background: "#ef4444",
                  border: "none",
                  color: "white",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 500
                }}
              >
                Start New Chat
              </button>
            </div>
  
            <ChatBox key={chatKey} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;