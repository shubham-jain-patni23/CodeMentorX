import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
    const response = await fetch("http://localhost:5000/interview/submit", {
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

  return (
    <div>
      <h2>Interview Mode</h2>

      <p><b>Explain your approach</b></p>
      <textarea value={approach} onChange={(e) => setApproach(e.target.value)} />

      <p><b>Time Complexity</b></p>
      <input value={timeComplexity} onChange={(e) => setTimeComplexity(e.target.value)} />

      <p><b>Space Complexity</b></p>
      <input value={spaceComplexity} onChange={(e) => setSpaceComplexity(e.target.value)} />

      <p><b>Optimization Ideas</b></p>
      <textarea value={optimization} onChange={(e) => setOptimization(e.target.value)} />

      <p><b>Edge Cases</b></p>
      <textarea value={edgeCases} onChange={(e) => setEdgeCases(e.target.value)} />

      <br /><br />
      <button onClick={handleSubmit}>Submit Interview Answers</button>

      <p>{message}</p>

      {score !== null && (
        <div>
          <h3>Interview Feedback</h3>
          <p><b>Score:</b> {score} / 100</p>

          {feedback && (
  <div>
    <h3>AI Interview Feedback</h3>

    <p><b>Score:</b> {feedback.score} / 10</p>

    <p><b>Strengths:</b></p>
    <ul>
      {feedback.strengths?.map((s, i) => (
        <li key={i}>{s}</li>
        ))}
      </ul>

      <p><b>Weaknesses:</b></p>
      <ul>
        {feedback.weaknesses?.map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>

      <p><b>Improvements:</b></p>
      <ul>
        {feedback.improvements?.map((imp, i) => (
          <li key={i}>{imp}</li>
        ))}
      </ul>
    </div>
  )}

        </div>
      )}
    </div>
  );
}

export default Interview;
