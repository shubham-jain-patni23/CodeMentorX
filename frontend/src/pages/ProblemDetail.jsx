import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProblemDetail() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [review, setReview] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/problems/${id}`,
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

    const response = await fetch("http://localhost:5000/submissions", {
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
      setMessage("Code submitted successfully");
    } else {
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
          <h3>Review Feedback</h3>
          <p><b>Time Complexity:</b> {review.timeComplexity}</p>
          <p><b>Space Complexity:</b> {review.spaceComplexity}</p>
          <p><b>Pattern Hint:</b> {review.patternHint}</p>
          <ul>
            {review.suggestions?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProblemDetail;
