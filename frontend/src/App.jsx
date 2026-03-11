
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
          paddingBottom: "0px",
          background: "black",
          borderRadius: "0px",
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
                color: 'black',
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