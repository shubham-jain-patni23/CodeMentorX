import { useEffect, useState } from "react";

const cardStyle = {
  backgroundColor: "#F9FAFB",
  borderRadius: "14px",
  padding: "20px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const sectionTitle = {
  fontSize: "16px",
  fontWeight: 600,
  marginBottom: "12px",
  color: "#0F172A",
};


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
          "https://codementorx-oh8c.onrender.com/submissions/metrics/progress",
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
          "https://codementorx-oh8c.onrender.com/submissions/metrics/difficulty",
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
          "https://codementorx-oh8c.onrender.com/submissions/metrics/patterns",
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
          "https://codementorx-oh8c.onrender.com/submissions/metrics/attempts",
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

  // return (
  //   <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
  //     <h2>Dashboard</h2>

  //     <section>
  //       <h3>Progress Over Time</h3>

  //       {error && <p>{error}</p>}

  //       {progress.length === 0 ? (
  //         <p>Start solving problems to see your progress here.</p>
  //       ) : (
  //         <ul>
  //           {progress.map((item) => (
  //             <li key={item.date}>
  //               {item.date}: {item.count} submissions
  //             </li>
  //           ))}
  //         </ul>
  //       )}
  //     </section>

  //     <hr />

  //     <section>
  //       <h3>Difficulty Distribution</h3>

  //       {!difficulty ? (
  //         <p>Loading difficulty data...</p>
  //       ) : (
  //         <ul>
  //           <li>Easy: {difficulty.Easy}</li>
  //           <li>Medium: {difficulty.Medium}</li>
  //           <li>Hard: {difficulty.Hard}</li>
  //         </ul>
  //       )}
  //     </section>

  //     <hr />

  //     <section>
  //       <h3>DSA Patterns Practiced</h3>

  //       {!patterns ? (
  //         <p>Loading pattern data...</p>
  //       ) : Object.keys(patterns).length === 0 ? (
  //         <p>No pattern data yet</p>
  //       ) : (
  //         <ul>
  //           {Object.entries(patterns).map(([pattern, count]) => (
  //             <li key={pattern}>
  //               {pattern}: {count} problems
  //             </li>
  //           ))}
  //         </ul>
  //       )}
  //     </section>

  //     <hr />
      
  //     <section>
  //       <h3>Attempts per Problem</h3>

  //       {!attempts ? (
  //         <p>Loading attempts data...</p>
  //       ) : attempts.length === 0 ? (
  //         <p>No attempts yet</p>
  //       ) : (
  //         <ul>
  //           {attempts.map((item) => (
  //             <li key={item.problemId}>
  //               {item.title}: {item.attempts} attempt(s)
  //             </li>
  //           ))}
  //         </ul>
  //       )}
  //     </section>
  //       <hr />

  //   </div>
  // );
  return (
  <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px" }}>
    <h1
      style={{
        fontSize: "28px",
        fontWeight: 700,
        marginBottom: "24px",
        color: "#0F172A",
      }}
    >
      📊 Your Dashboard
    </h1>

    {/* 🧩 Top Summary */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginBottom: "32px",
      }}
    >
      <div style={cardStyle}>
        <p style={{ color: "#64748B" }}>Total Submissions</p>
        <h2 style={{ fontSize: "28px", marginTop: "8px" }}>
          {progress.reduce((sum, p) => sum + p.count, 0)}
        </h2>
      </div>

      <div style={cardStyle}>
        <p style={{ color: "#64748B" }}>Problems Attempted</p>
        <h2 style={{ fontSize: "28px", marginTop: "8px" }}>
          {attempts ? attempts.length : 0}
        </h2>
      </div>

      <div style={cardStyle}>
        <p style={{ color: "#64748B" }}>Patterns Practiced</p>
        <h2 style={{ fontSize: "28px", marginTop: "8px" }}>
          {patterns ? Object.keys(patterns).length : 0}
        </h2>
      </div>
    </div>

    {/* 📈 Progress Over Time */}
    <div style={{ ...cardStyle, marginBottom: "24px" }}>
      <h3 style={sectionTitle}>📈 Progress Over Time</h3>

      {error && <p style={{ color: "#EF4444" }}>{error}</p>}

      {progress.length === 0 ? (
        <p style={{ color: "#64748B" }}>
          Start solving problems to see progress.
        </p>
      ) : (
        <ul style={{ paddingLeft: "18px", color: "#334155" }}>
          {progress.map((item) => (
            <li key={item.date}>
              {item.date} → {item.count} submissions
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* 🎯 Difficulty Distribution */}
    <div style={{ ...cardStyle, marginBottom: "24px" }}>
      <h3 style={sectionTitle}>🎯 Difficulty Distribution</h3>

      {!difficulty ? (
        <p style={{ color: "#64748B" }}>Loading...</p>
      ) : (
        <div style={{ display: "flex", gap: "20px" }}>
          <span>🟢 Easy: {difficulty.Easy}</span>
          <span>🟡 Medium: {difficulty.Medium}</span>
          <span>🔴 Hard: {difficulty.Hard}</span>
        </div>
      )}
    </div>

    {/* 🧠 Patterns Practiced */}
    <div style={{ ...cardStyle, marginBottom: "24px" }}>
      <h3 style={sectionTitle}>🧠 DSA Patterns Practiced</h3>

      {!patterns ? (
        <p style={{ color: "#64748B" }}>Loading...</p>
      ) : Object.keys(patterns).length === 0 ? (
        <p style={{ color: "#64748B" }}>No pattern data yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {Object.entries(patterns).map(([pattern, count]) => (
            <span
              key={pattern}
              style={{
                backgroundColor: "#EEF2FF",
                color: "#4F46E5",
                padding: "6px 10px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 500,
              }}
            >
              {pattern} · {count}
            </span>
          ))}
        </div>
      )}
    </div>

    {/* 🔁 Attempts per Problem */}
    <div style={cardStyle}>
      <h3 style={sectionTitle}>🔁 Attempts per Problem</h3>

      {!attempts ? (
        <p style={{ color: "#64748B" }}>Loading...</p>
      ) : attempts.length === 0 ? (
        <p style={{ color: "#64748B" }}>No attempts yet.</p>
      ) : (
        <ul style={{ paddingLeft: "18px", color: "#334155" }}>
          {attempts.map((item) => (
            <li key={item.problemId}>
              {item.title} → {item.attempts} attempt(s)
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

}

export default Dashboard;
