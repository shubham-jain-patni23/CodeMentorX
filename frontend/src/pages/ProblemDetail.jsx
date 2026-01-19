import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [review, setReview] = useState(null);
  const [message, setMessage] = useState("");
  const [submissionId, setSubmissionId] = useState(null);


  useEffect(() => {
    const fetchProblem = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://codementorx-oh8c.onrender.com/problems/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setProblem(data);
    };

    fetchProblem();
  }, [id]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("https://codementorx-oh8c.onrender.com/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        problemId: id,
        language,
        code,
      }),
    });

    const data = await response.json();

    if (data.submission) {
      setReview(data.submission.reviewResult);
      setSubmissionId(data.submission._id);
      setMessage("Code submitted successfully");
    }
    else {
      setMessage(data.message || "Submission failed");
    }
  };

  if (!problem) return <p>Loading...</p>;

  return (
    <div>
      <h2>{problem.title}</h2>

      <p><b>Difficulty:</b> {problem.difficulty}</p>
      <p><b>Description:</b> {problem.description}</p>
      <p><b>Constraints:</b> {problem.constraints}</p>
      <p><b>Patterns:</b> {problem.patternTags?.join(", ")}</p>

      <h3>Think Before You Code</h3>
      <ul>
        {problem.thinkPrompts?.map((prompt, index) => (
          <li key={index}>{prompt}</li>
        ))}
      </ul>

      <h3>Write Your Code</h3>

      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
      </select>

      <br /><br />

      <textarea
        rows="10"
        cols="70"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your solution here..."
      />

      <br /><br />

      <button onClick={handleSubmit}>Submit Code</button>

      <p>{message}</p>

      {review && (
        <div>
          <h3>Rule-Based Review</h3>
          <p><b>Time Complexity:</b> {review.mock.timeComplexity}</p>
          <p><b>Space Complexity:</b> {review.mock.spaceComplexity}</p>
          <p><b>Pattern Hint:</b> {review.mock.patternHint}</p>

          <ul>
            {review.mock.suggestions?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <hr />

          <h3>AI Review (Gemini-Flash)</h3>
          <p style={{ fontSize: "0.9em", color: "gray" }}>
            AI feedback is experimental and may be approximate.
          </p>


          {review.aiStatus === "success" ? (
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {review.ai}
            </pre>
          ) : (
            <p style={{ color: "gray" }}>
              AI feedback is currently unavailable (free-tier or safety limits).
              Rule-based review is shown instead.
            </p>
          )}
        </div>
      )}

      {submissionId && (
        <button
          onClick={() =>
            window.location.href = `/interview/${submissionId}`
          }
        >
          Enter Interview Mode
        </button>
      )}

    </div>
  );
}

export default ProblemDetail;