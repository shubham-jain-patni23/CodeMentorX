import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const sectionStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: "14px",
  padding: "20px",
  marginBottom: "24px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};


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

  // return (
  //   <div>
  //     <h2>{problem.title}</h2>

  //     <p><b>Difficulty:</b> {problem.difficulty}</p>
  //     <p><b>Description:</b> {problem.description}</p>
  //     <p><b>Constraints:</b> {problem.constraints}</p>
  //     <p><b>Patterns:</b> {problem.patternTags?.join(", ")}</p>

  //     <h3>Think Before You Code</h3>
  //     <ul>
  //       {problem.thinkPrompts?.map((prompt, index) => (
  //         <li key={index}>{prompt}</li>
  //       ))}
  //     </ul>

  //     <h3>Write Your Code</h3>

  //     <select value={language} onChange={(e) => setLanguage(e.target.value)}>
  //       <option value="cpp">C++</option>
  //       <option value="python">Python</option>
  //       <option value="javascript">JavaScript</option>
  //     </select>

  //     <br /><br />

  //     <textarea
  //       rows="10"
  //       cols="70"
  //       value={code}
  //       onChange={(e) => setCode(e.target.value)}
  //       placeholder="Write your solution here..."
  //     />

  //     <br /><br />

  //     <button onClick={handleSubmit}>Submit Code</button>

  //     <p>{message}</p>

  //     {review && (
  //       <div>

  //         <h3>AI Review (Gemini-Flash)</h3>
  //         <p style={{ fontSize: "0.9em", color: "gray" }}>
  //           AI feedback is experimental and may be approximate.
  //         </p>


  //         {review.aiStatus === "success" ? (
  //           <pre style={{ whiteSpace: "pre-wrap" }}>
  //             {review.ai}
  //           </pre>
  //         ) : (
  //           <p style={{ color: "gray" }}>
  //             AI feedback is currently unavailable.
  //           </p>
  //         )}
  //       </div>
  //     )}

  //     {submissionId && (
  //       <button
  //         onClick={() =>
  //           window.location.href = `/interview/${submissionId}`
  //         }
  //       >
  //         Enter Interview Mode
  //       </button>
  //     )}

  //   </div>
  // );
  return (
  <div>
    {/* 🧩 Problem Overview */}
    <div style={sectionStyle}>
      <h1
        style={{
          fontSize: "26px",
          fontWeight: 700,
          marginBottom: "12px",
          color: "#0F172A",
        }}
      >
        {problem.title}
      </h1>

      <span
        style={{
          display: "inline-block",
          fontSize: "12px",
          fontWeight: 600,
          padding: "4px 10px",
          borderRadius: "999px",
          marginBottom: "12px",
          backgroundColor:
            problem.difficulty === "Easy"
              ? "#DCFCE7"
              : problem.difficulty === "Medium"
              ? "#FEF3C7"
              : "#FEE2E2",
          color:
            problem.difficulty === "Easy"
              ? "#166534"
              : problem.difficulty === "Medium"
              ? "#92400E"
              : "#991B1B",
        }}
      >
        {problem.difficulty}
      </span>

      <p style={{ marginTop: "12px", color: "#334155", lineHeight: "1.6" }}>
        {problem.description}
      </p>

      <p style={{ marginTop: "10px", color: "#475569" }}>
        <strong>Constraints:</strong> {problem.constraints}
      </p>

      {problem.patternTags?.length > 0 && (
        <div style={{ marginTop: "12px" }}>
          {problem.patternTags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                display: "inline-block",
                marginRight: "6px",
                marginBottom: "6px",
                fontSize: "12px",
                padding: "4px 8px",
                borderRadius: "999px",
                backgroundColor: "#EEF2FF",
                color: "#4F46E5",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>

    {/* 🧠 Think Before You Code */}
    <div style={sectionStyle}>
      <h3 style={{ marginBottom: "12px" }}>
        🧠 Think Before You Code
      </h3>

      <ul style={{ paddingLeft: "18px", color: "#334155" }}>
        {problem.thinkPrompts?.map((prompt, index) => (
          <li key={index} style={{ marginBottom: "6px" }}>
            {prompt}
          </li>
        ))}
      </ul>
    </div>

    {/* 💻 Code Editor */}
    <div style={sectionStyle}>
      <h3 style={{ marginBottom: "12px" }}>
        💻 Write Your Code
      </h3>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{
          padding: "6px 10px",
          borderRadius: "6px",
          border: "1px solid #CBD5E1",
          marginBottom: "12px",
        }}
      >
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
      </select>

      <textarea
        rows="10"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your solution here..."
        style={{
          width: "100%",
          fontFamily: "monospace",
          fontSize: "14px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #CBD5E1",
          marginBottom: "12px",
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#4F46E5",
          color: "white",
          border: "none",
          padding: "10px 16px",
          borderRadius: "8px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Submit Code
      </button>

      {message && (
        <p style={{ marginTop: "10px", color: "#475569" }}>
          {message}
        </p>
      )}
    </div>

    {/* 🤖 AI Review */}
    {review && (
      <div style={sectionStyle}>
        <h3 style={{ marginBottom: "8px" }}>
          🤖 AI Code Review
        </h3>

        {review.aiStatus === "success" && review.ai ? (
          <pre
            style={{
              backgroundColor: "#0F172A",
              color: "#E5E7EB",
              padding: "16px",
              borderRadius: "10px",
              whiteSpace: "pre-wrap",
              fontSize: "13px",
            }}
          >
            {review.ai}
          </pre>
        ) : (
          <p style={{ color: "#64748B" }}>
            AI feedback is currently unavailable.
          </p>
        )}
      </div>
    )}

    {/* 🎤 Interview CTA */}
    {submissionId && (
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <button
          onClick={() =>
            window.location.href = `/interview/${submissionId}`
          }
          style={{
            backgroundColor: "#22C55E",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          🎤 Enter Interview Mode
        </button>
      </div>
    )}
  </div>
);

}

export default ProblemDetail;
