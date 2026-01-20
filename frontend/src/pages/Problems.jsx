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

//   return (
//     <div>
//       <h2>DSA Problems</h2>

//       {error && <p>{error}</p>}

//       {problems.map((problem) => (
//         <div
//           key={problem._id}
//           style={{
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//             padding: "10px",
//           }}
//         >
//           <h3>
//             <Link to={`/problems/${problem._id}`}>{problem.title}</Link>
//           </h3>

//           <p>Difficulty: {problem.difficulty}</p>
//           <p>Patterns: {problem.patternTags?.join(", ")}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

    return (
    <div>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: 700,
          marginBottom: "24px",
          color: "#0F172A",
        }}
      >
        DSA Problems
      </h1>

      {error && (
        <p style={{ color: "#EF4444", marginBottom: "16px" }}>
          {error}
        </p>
      )}

      {problems.length === 0 ? (
        <p style={{ color: "#64748B" }}>
          No problems available yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {problems.map((problem) => (
            <Link
              key={problem._id}
              to={`/problems/${problem._id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: "14px",
                  padding: "18px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  display: "flex",
                  minHeight: "260px",
                  flexDirection: "column",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.08)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 6px rgba(0,0,0,0.05)";
                }}
              >

                {/* Title */}
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#0F172A",
                    marginBottom: "8px",
                  }}
                >
                  {problem.title}
                </h3>

                {/* Difficulty badge */}
                <div style={{ marginBottom: "10px" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "999px",
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
                      width: "fit-content",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {problem.difficulty}
                  </span>
                </div>


                {/* Description preview (optional but nice) */}
                {problem.description && (
                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "14px",
                      color: "#475569",
                      lineHeight: "1.4",
                    }}
                  >
                    {problem.description.slice(0, 100)}...
                  </p>
                )}

                {/* Pattern tags */}
                {problem.patternTags?.length > 0 && (
                  <div
                    style={{
                      marginTop: "12px",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "6px",
                    }}
                  >
                    {problem.patternTags.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


export default Problems;