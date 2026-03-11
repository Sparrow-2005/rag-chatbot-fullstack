import ReactMarkdown from "react-markdown";

export default function MessageBubble({ type, text }) {
  const isUser = type === "user";

  return (

    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "14px"
      }}
    >
      <div
        style={{
          backgroundColor: isUser ? "#4f46e5" : "white",
          color: isUser ? "white" : "#1f2937",
          padding: "14px 18px",
          borderRadius: "14px",
          maxWidth: "75%",
          fontSize: "14px",
          lineHeight: "1.5",
          boxShadow: "0 3px 10px rgba(0,0,0,0.05)"
        }}
      >
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <p style={{ margin: "4px 0" }}>{children}</p>
            ),
            ul: ({ children }) => (
              <ul style={{ margin: "6px 0", paddingLeft: "18px" }}>
                {children}
              </ul>
            ),
            li: ({ children }) => (
              <li style={{ marginBottom: "4px" }}>{children}</li>
            )
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}