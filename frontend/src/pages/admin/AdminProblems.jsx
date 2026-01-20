import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const cardStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  padding: "24px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
};

const thStyle = {
  textAlign: "left",
  padding: "12px",
  fontWeight: 600,
  color: "#0F172A",
  backgroundColor: "#F8FAFC",
};

const tdStyle = {
  padding: "12px",
  color: "#334155",
  borderBottom: "1px solid #E5E7EB",
};

const actionBtn = {
  padding: "6px 12px",
  borderRadius: "8px",
  border: "none",
  fontWeight: 600,
  cursor: "pointer",
};


function AdminProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("https://codementorx-oh8c.onrender.com/admin/problems", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch problems");
        }

        setProblems(data.problems || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this problem?"
    );
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://codementorx-oh8c.onrender.com/admin/problems/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete problem");
      }

      // Remove deleted problem from UI
      setProblems((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading problems...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // return (
  //   <div style={{ padding: "20px" }}>
  //     <h2>Admin Problems</h2>

  //     <Link to="/admin/problems/new">
  //       <button>Add New Problem</button>
  //     </Link>

  //     <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
  //       <thead>
  //         <tr>
  //           <th>Title</th>
  //           <th>Difficulty</th>
  //           <th>Actions</th>
  //         </tr>
  //       </thead>

  //       <tbody>
  //         {problems.length === 0 ? (
  //           <tr>
  //             <td colSpan="3">No problems found.</td>
  //           </tr>
  //         ) : (
  //           problems.map((problem) => (
  //             <tr key={problem._id}>
  //               <td>{problem.title}</td>
  //               <td>{problem.difficulty}</td>
  //               <td>
  //                 <Link to={`/admin/problems/${problem._id}/edit`}>
  //                   <button>Edit</button>
  //                 </Link>
  //                 <button
  //                   style={{ marginLeft: "10px" }}
  //                   onClick={() => handleDelete(problem._id)}
  //                 >
  //                   Delete
  //                 </button>
  //               </td>
  //             </tr>
  //           ))
  //         )}
  //       </tbody>
  //     </table>
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
      📝 Manage Problems
    </h1>

    <div style={{ marginBottom: "20px" }}>
      <Link to="/admin/problems/new">
        <button
          style={{
            backgroundColor: "#4F46E5",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "10px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ➕ Add New Problem
        </button>
      </Link>
    </div>

    <div style={cardStyle}>
      {problems.length === 0 ? (
        <p style={{ color: "#64748B" }}>No problems found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Difficulty</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {problems.map((problem) => (
                <tr key={problem._id}>
                  <td style={tdStyle}>{problem.title}</td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 600,
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
                  </td>

                  <td style={tdStyle}>
                    <Link to={`/admin/problems/${problem._id}/edit`}>
                      <button
                        style={{
                          ...actionBtn,
                          backgroundColor: "#E0E7FF",
                          color: "#3730A3",
                          marginRight: "8px",
                        }}
                      >
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(problem._id)}
                      style={{
                        ...actionBtn,
                        backgroundColor: "#FEE2E2",
                        color: "#991B1B",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);

}

export default AdminProblems;
