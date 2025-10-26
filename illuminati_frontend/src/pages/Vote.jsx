import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAuthToken } from "../auth";
import { getVotes, sendVote } from "../api";

export default function Vote() {
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const token = getAuthToken();

  useEffect(() => {
    async function fetchVotes() {
      try {
        const res = await getVotes(token);

        console.log("Server response:", res);

        if (res.status === "OK") {
          setVotes(res.data);
        } else {
          setError("Server returned wrong response");
        }
      } catch (err) {
        console.error("Error fetching votes:", err);
        setError("Failed to fetch votes");
      } finally {
        setLoading(false);
      }
    }

    fetchVotes();
  }, [token]);

  const handleVote = async (vote, choice) => {
    try {
      setMessage("");
      const res = await sendVote(token, {
        id: vote.id,
        name: vote.name,
        choice: choice,
      });

      if (res.status === "OK") {
        setMessage(`Vote ${choice} sent successfully!`);
        setTimeout(() => globalThis.location.reload(), 1000);
      } else {
        setMessage(`Server error: ${res.notification}`);
      }
    } catch (err) {
      console.error("Vote error:", err);
      setMessage("Failed to send vote!");
    }
  };

  if (loading) {
    return (
      <div className="page-home">
        <Navbar />
        <div className="center">
          <p>Loading votes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-home">
        <Navbar />
        <div className="center">
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-home">
      <Navbar />
      <div className="map-card" style={{ maxWidth: "800px" }}>
        <h2>Active Votes</h2>

        {message && (
          <div
            style={{
              marginBottom: "15px",
              color: message.includes("AGREE") ? "lightgreen" : "salmon",
            }}
          >
            {message}
          </div>
        )}

        {votes.length === 0 ? (
          <p>There are no active votes</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              color: "#f5f5f5",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--accent)" }}>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Vote Type</th>
                <th style={{ padding: "10px", textAlign: "center" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {votes.map((vote) => (
                <tr key={vote.id} style={{ borderBottom: "1px solid #333" }}>
                  <td style={{ padding: "10px" }}>{vote.name}</td>
                  <td style={{ padding: "10px" }}>{vote.vote_type}</td>
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <button
                      className="btn"
                      style={{ marginRight: "10px" }}
                      onClick={() => handleVote(vote, "AGREE")}
                    >
                      Agree
                    </button>
                    <button
                      className="btn"
                      style={{ background: "var(--danger)" }}
                      onClick={() => handleVote(vote, "DISAGREE")}
                    >
                      Disagree
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
