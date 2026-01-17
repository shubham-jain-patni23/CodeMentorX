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
  const [flags, setFlags] = useState([]);
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
      setFlags(data.flags);
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

          {flags.length > 0 && (
            <>
              <p><b>Improvements Needed:</b></p>
              <ul>
                {flags.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Interview;
