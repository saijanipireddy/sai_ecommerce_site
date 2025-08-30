import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [serviceAsked, setServiceAsked] = useState(false);

  const quickOptions = [
    "Show Products",
    "Show Products below 500",
    "Show 5-star Products",
    "View Cart",
    "Check Orders",
    "FAQs"
  ];

  const randomFAQs = [
    "📦 You can check our return policy at /returns",
    "🚚 Free delivery for orders above ₹499",
    "💳 We support UPI, Cards, Wallets & Netbanking",
    "📞 Support available Mon–Sat, 9AM–6PM",
    "🔎 Track your order at /track"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const resetChat = () => {
    setMessages([
      { role: "assistant", text: "👋 Hi! I’m your smart shopping assistant. Ask me anything!" }
    ]);
    setInput("");
    setServiceAsked(false);
  };

  const sendMessage = async (msgText) => {
    if (!msgText.trim()) return;

    const newMsgs = [...messages, { role: "user", text: msgText }];
    setMessages(newMsgs);
    setInput("");

    try {
      // 🔹 Handle FAQs locally
      if (msgText.toLowerCase().includes("faq") || msgText.toLowerCase().includes("question")) {
        const randomIndex = Math.floor(Math.random() * randomFAQs.length);
        setMessages((prev) => [
          ...newMsgs,
          { role: "assistant", text: randomFAQs[randomIndex] }
        ]);
        return;
      }

      // 🔹 Handle service rating
      if (/good|bad|excellent|poor|1|2|3|4|5/.test(msgText) && serviceAsked) {
        setMessages((prev) => [
          ...newMsgs,
          { role: "assistant", text: `🙏 Thank you for your feedback! ❤️` },
          { role: "assistant", text: "☎️ For queries, call us at: +91-9876543210" }
        ]);
        setServiceAsked(false);
        return;
      }

      // 🔹 Call backend
      const res = await axios.post(
        "http://localhost:8000/assistant/chat",
        { message: msgText },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );

      const { products, reply } = res.data;

      if (products?.length > 0) {
        const productMsgs = products.map((p) => ({ role: "assistant", product: p }));
        setMessages((prev) => [...newMsgs, ...productMsgs]);
      } else {
        setMessages((prev) => [...newMsgs, { role: "assistant", text: reply || "🤔 I didn’t quite get that." }]);
      }

      // 🔹 Ask for service feedback at end
      if (!serviceAsked && !msgText.toLowerCase().includes("faq")) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", text: "⭐ How was our service? Please rate 1-5 or type your feedback." }
          ]);
          setServiceAsked(true);
        }, 1000);
      }
    } catch (err) {
      setMessages((prev) => [...newMsgs, { role: "assistant", text: "⚠️ Server error. Please try again later." }]);
    }
  };

  return (
    <div style={styles.container}>
      {!open && (
        <button
          style={styles.openBtn}
          onClick={() => {
            setOpen(true);
            resetChat();
          }}
        >
          💬
        </button>
      )}

      {open && (
        <div style={styles.widget}>
          <div style={styles.header}>
            🛒 Assistant
            <span
              style={styles.closeBtn}
              onClick={() => {
                setOpen(false);
                setMessages([]);
                setInput("");
                setServiceAsked(false);
              }}
            >
              ✖
            </span>
          </div>

          <div style={styles.chatBox}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: "12px",
                  width: "100%"
                }}
              >
                {m.text && (
                  <div
                    style={{
                      ...styles.msg,
                      background: m.role === "user" ? "#007bff" : "#fff",
                      color: m.role === "user" ? "#fff" : "#333",
                      border: m.role === "assistant" ? "1px solid #ddd" : "none",
                      textAlign: "left"
                    }}
                  >
                    {m.text}
                  </div>
                )}

                {m.product && (
                  <div style={styles.productCard}>
                    {m.product.image && (
                      <img
                        src={m.product.image}
                        alt={m.product.name}
                        style={styles.productImg}
                      />
                    )}
                    <div>
                      <b>{m.product.name}</b>
                      {m.product.price && <p>₹{m.product.price}</p>}
                      {m.product.rating && <p>⭐ {m.product.rating}</p>}
                      {m.product.status && <p>Status: {m.product.status}</p>}
                      {m.product.qty && <p>Qty: {m.product.qty}</p>}
                      {m.product.price && !m.product.status && (
                        <button style={styles.addBtn}>Add to Cart</button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div style={styles.quickOptions}>
            {quickOptions.map((q, i) => (
              <button key={i} style={styles.optionBtn} onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>

          <div style={styles.inputBar}>
            <input
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your question..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button style={styles.sendBtn} onClick={() => sendMessage(input)}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 },

  openBtn: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
    transition: "all 0.3s ease"
  },

  widget: {
    width: "380px",
    height: "520px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "18px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    overflow: "hidden",
    fontFamily: "'Segoe UI', sans-serif"
  },

  header: {
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    color: "#fff",
    padding: "14px 16px",
    fontWeight: "600",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "16px"
  },

  closeBtn: { cursor: "pointer", fontSize: "18px" },

  chatBox: {
    flex: 1,
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    background: "#f7f9fc"
  },

  msg: {
    padding: "10px 14px",
    borderRadius: "18px",
    maxWidth: "75%",
    lineHeight: "1.4",
    marginBottom: "8px"
  },

  productCard: {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #ddd",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    padding: "12px",
    maxWidth: "90%"
  },

  productImg: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "8px"
  },

  addBtn: {
    marginTop: "6px",
    padding: "6px 12px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  inputBar: {
    display: "flex",
    borderTop: "1px solid #eee",
    padding: "10px",
    background: "#fff"
  },

  input: {
    flex: 1,
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    outline: "none",
    fontSize: "14px"
  },

  sendBtn: {
    marginLeft: "8px",
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px"
  },

  quickOptions: {
    display: "flex",
    gap: "6px",
    padding: "8px",
    borderTop: "1px solid #eee",
    flexWrap: "wrap",
    background: "#fff"
  },

  optionBtn: {
    padding: "6px 14px",
    borderRadius: "20px",
    border: "1px solid #4facfe",
    background: "#f0f8ff",
    color: "#007bff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500"
  }
};
