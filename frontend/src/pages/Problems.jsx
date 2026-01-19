import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Problems() {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("https://codementorx-oh8c.onrender.com/problems", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setProblems(data.problems);
      } catch (err) {
        setError("Failed to load problems");
      }
    };

    fetchProblems();
  }, []);

  return (
    <div>
      <h2>DSA Problems</h2>

      {error && <p>{error}</p>}

      {problems.map((problem) => (
        <div
          key={problem._id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h3>
            <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
          </h3>

          <p>Difficulty: {problem.difficulty}</p>
          <p>Patterns: {problem.patternTags?.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}

export default Problems;