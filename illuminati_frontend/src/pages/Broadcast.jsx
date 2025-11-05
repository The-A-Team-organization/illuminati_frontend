import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { sendBroadcast } from "../api";
import { getAuthToken } from "../auth";

export default function Broadcast() {
  const [tiers, setTiers] = useState([]);
  const [topic, setTopic] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const handleTierToggle = (tier) => {
    setTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier]
    );
  };

  const handleBroadcast = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const token = getAuthToken();
      await sendBroadcast({ tiers, topic, text, token });

      setStatus("success");
      setMessage("Broadcast message sent successfully.");
      setTopic("");
      setText("");
      setTiers([]);
    } catch (err) {
      setStatus("error");
      setMessage("Failed to send broadcast message. Please try again later.");
    }
  };

  return (
    <div className="center">
      <Navbar />
      <div className="card">
        <h2>Send Broadcast</h2>

        <form className="form" onSubmit={handleBroadcast}>
          <div className="tiers">
            {["GoldMason", "SilverMason", "Mason"].map((tier) => (
              <label key={tier}>
                <input
                  type="checkbox"
                  checked={tiers.includes(tier)}
                  onChange={() => handleTierToggle(tier)}
                />
                {tier}
              </label>
            ))}
          </div>

          <input
            id="topic"
            type="text"
            placeholder="Message topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />

          <textarea
            id="text"
            placeholder="Your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            required
          />

          <button
            className="btn"
            type="submit"
            disabled={
              status === "loading" || !text || !topic || tiers.length === 0
            }
          >
            {status === "loading" ? "Sending..." : "Send Broadcast"}
          </button>
        </form>

        {status && (
          <p
            className={`message ${status === "success" ? "text-accent" : "text-danger"
              }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}


