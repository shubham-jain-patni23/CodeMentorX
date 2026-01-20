import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const cardStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: "14px",
  padding: "20px",
  marginBottom: "24px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const labelStyle = {
  fontWeight: 600,
  marginBottom: "6px",
  display: "block",
  color: "#0F172A",
};


function Interview() {
  const { submissionId } = useParams();

  const [approach, setApproach] = useState("");
  const [timeComplexity, setTimeComplexity] = useState("");
  const [spaceComplexity, setSpaceComplexity] = useState("");
  const [optimization, setOptimization] = useState("");
  const [edgeCases, setEdgeCases] = useState("");

  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    const response = await fetch("https://codementorx-oh8c.onrender.com/interview/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        submissionId,
        approachExplanation: approach,
        timeComplexity,
        spaceComplexity,
        optimizationIdeas: optimization,
        edgeCases,
      }),
    });

    const data = await response.json();

    if (data.evaluationScore !== undefined) {
      setScore(data.evaluationScore);
      setFeedback(data.interviewFeedback);
      setMessage("Interview evaluation completed");
    } else {
      setMessage(data.message || "Submission failed");
    }

  };

  // return (
  //   <div>
  //     <h2>Interview Mode</h2>

  //     <p><b>Explain your approach</b></p>
  //     <textarea value={approach} onChange={(e) => setApproach(e.target.value)} />

  //     <p><b>Time Complexity</b></p>
  //     <input value={timeComplexity} onChange={(e) => setTimeComplexity(e.target.value)} />

  //     <p><b>Space Complexity</b></p>
  //     <input value={spaceComplexity} onChange={(e) => setSpaceComplexity(e.target.value)} />

  //     <p><b>Optimization Ideas</b></p>
  //     <textarea value={optimization} onChange={(e) => setOptimization(e.target.value)} />

  //     <p><b>Edge Cases</b></p>
  //     <textarea value={edgeCases} onChange={(e) => setEdgeCases(e.target.value)} />

  //     <br /><br />
  //     <button onClick={handleSubmit}>Submit Interview Answers</button>

  //     <p>{message}</p>

  //     {score !== null && (
  //       <div>
  //         <h3>Interview Feedback</h3>
  //         <p><b>Score:</b> {score} / 100</p>

  //         {feedback && (
  // <div>
  //   <h3>AI Interview Feedback</h3>

  //   <p><b>Score:</b> {feedback.score} / 10</p>

  //   <p><b>Strengths:</b></p>
  //   <ul>
  //     {feedback.strengths?.map((s, i) => (
  //       <li key={i}>{s}</li>
  //       ))}
  //     </ul>

  //     <p><b>Weaknesses:</b></p>
  //     <ul>
  //       {feedback.weaknesses?.map((w, i) => (
  //         <li key={i}>{w}</li>
  //       ))}
  //     </ul>

  //     <p><b>Improvements:</b></p>
  //     <ul>
  //       {feedback.improvements?.map((imp, i) => (
  //         <li key={i}>{imp}</li>
  //       ))}
  //     </ul>
  //   </div>
  // )}

  //       </div>
  //     )}
  //   </div>
  // );
  return (
  <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
    <h1
      style={{
        fontSize: "28px",
        fontWeight: 700,
        marginBottom: "24px",
        color: "#0F172A",
      }}
    >
      🎤 Interview Mode
    </h1>

    {/* 📝 Interview Answers */}
    <div style={cardStyle}>
      <h3 style={{ marginBottom: "16px" }}>
        🧠 Explain Your Thinking
      </h3>

      <label style={labelStyle}>Approach Explanation</label>
      <textarea
        value={approach}
        onChange={(e) => setApproach(e.target.value)}
        rows={4}
        style={textareaStyle}
      />

      <label style={labelStyle}>Time Complexity</label>
      <input
        value={timeComplexity}
        onChange={(e) => setTimeComplexity(e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>Space Complexity</label>
      <input
        value={spaceComplexity}
        onChange={(e) => setSpaceComplexity(e.target.value)}
        style={inputStyle}
      />

      <label style={labelStyle}>Optimization Ideas</label>
      <textarea
        value={optimization}
        onChange={(e) => setOptimization(e.target.value)}
        rows={3}
        style={textareaStyle}
      />

      <label style={labelStyle}>Edge Cases</label>
      <textarea
        value={edgeCases}
        onChange={(e) => setEdgeCases(e.target.value)}
        rows={3}
        style={textareaStyle}
      />

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "16px",
          backgroundColor: "#4F46E5",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "8px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Submit Interview Answers
      </button>

      {message && (
        <p style={{ marginTop: "10px", color: "#475569" }}>
          {message}
        </p>
      )}
    </div>

    {/* 🤖 AI Feedback */}
    {score !== null && (
      <div style={cardStyle}>
        <h3 style={{ marginBottom: "12px" }}>
          🤖 AI Interview Feedback
        </h3>

        <p
          style={{
            fontSize: "16px",
            fontWeight: 600,
            marginBottom: "12px",
          }}
        >
          Final Score:{" "}
          <span style={{ color: "#22C55E" }}>
            {score} / 10
          </span>
        </p>

        {feedback && (
          <>
            <FeedbackList title="✅ Strengths" items={feedback.strengths} />
            <FeedbackList title="⚠️ Weaknesses" items={feedback.weaknesses} />
            <FeedbackList title="🛠 Improvements" items={feedback.improvements} />
          </>
        )}
      </div>
    )}
  </div>
);

}

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #CBD5E1",
  marginBottom: "12px",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #CBD5E1",
  marginBottom: "12px",
  fontFamily: "inherit",
};

function FeedbackList({ title, items }) {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ marginBottom: "16px" }}>
      <h4 style={{ marginBottom: "6px" }}>{title}</h4>
      <ul style={{ paddingLeft: "18px", color: "#334155" }}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
    
  );
}


export default Interview;
