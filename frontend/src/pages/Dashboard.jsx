import { useEffect, useState } from "react";

function Dashboard() {
  const [progress, setProgress] = useState([]);
  const [error, setError] = useState("");
  const [difficulty, setDifficulty] = useState(null);
  const [patterns, setPatterns] = useState(null);
  const [attempts, setAttempts] = useState(null);


  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/submissions/metrics/progress",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setProgress(data);
      } catch (err) {
        setError("Failed to load progress data");
      }
    };

    fetchProgress();

    const fetchDifficulty = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/submissions/metrics/difficulty",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setDifficulty(data);
      } catch (err) {
        console.error("Failed to load difficulty data");
      }
    };

    fetchDifficulty();

    const fetchPatterns = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/submissions/metrics/patterns",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setPatterns(data);
      } catch (err) {
        console.error("Failed to load pattern data");
      }
    };

    fetchPatterns();

    const fetchAttempts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/submissions/metrics/attempts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setAttempts(data);
      } catch (err) {
        console.error("Failed to load attempts data");
      }
    };

    fetchAttempts();


  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Dashboard</h2>

      <section>
        <h3>Progress Over Time</h3>

        {error && <p>{error}</p>}

        {progress.length === 0 ? (
          <p>Start solving problems to see your progress here.</p>
        ) : (
          <ul>
            {progress.map((item) => (
              <li key={item.date}>
                {item.date}: {item.count} submissions
              </li>
            ))}
          </ul>
        )}
      </section>

      <hr />

      <section>
        <h3>Difficulty Distribution</h3>

        {!difficulty ? (
          <p>Loading difficulty data...</p>
        ) : (
          <ul>
            <li>Easy: {difficulty.Easy}</li>
            <li>Medium: {difficulty.Medium}</li>
            <li>Hard: {difficulty.Hard}</li>
          </ul>
        )}
      </section>

      <hr />

      <section>
        <h3>DSA Patterns Practiced</h3>

        {!patterns ? (
          <p>Loading pattern data...</p>
        ) : Object.keys(patterns).length === 0 ? (
          <p>No pattern data yet</p>
        ) : (
          <ul>
            {Object.entries(patterns).map(([pattern, count]) => (
              <li key={pattern}>
                {pattern}: {count} problems
              </li>
            ))}
          </ul>
        )}
      </section>

      <hr />
      
      <section>
        <h3>Attempts per Problem</h3>

        {!attempts ? (
          <p>Loading attempts data...</p>
        ) : attempts.length === 0 ? (
          <p>No attempts yet</p>
        ) : (
          <ul>
            {attempts.map((item) => (
              <li key={item.problemId}>
                {item.title}: {item.attempts} attempt(s)
              </li>
            ))}
          </ul>
        )}
      </section>
        <hr />

    </div>
  );
}

export default Dashboard;
