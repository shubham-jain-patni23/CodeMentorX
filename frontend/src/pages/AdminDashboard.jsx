import { useEffect, useState } from "react";

const cardStyle = {
  backgroundColor: "#FFFFFF",
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


function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [health, setHealth] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchStats = async () => {
      try {
        const res = await fetch("https://codementorx-oh8c.onrender.com/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError("Failed to load admin stats");
      }
    };

    const fetchHealth = async () => {
      try {
        const res = await fetch("https://codementorx-oh8c.onrender.com/admin/health", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setHealth(data);
      } catch (err) {
        setError("Failed to load system health");
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch("https://codementorx-oh8c.onrender.com/admin/reviews", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err) {
        setError("Failed to load review logs");
      }
    };

    fetchStats();
    fetchHealth();
    fetchReviews();
  }, []);

  // return (
  //   <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
  //     <h2>Admin Dashboard</h2>

  //     {error && <p style={{ color: "red" }}>{error}</p>}

  //     {/* Stats Section */}
  //     <section>
  //       <h3>System Stats</h3>
  //       {!stats ? (
  //         <p>Loading stats...</p>
  //       ) : (
  //         <ul>
  //           <li>Total Problems: {stats.totalProblems}</li>
  //           <li>Total Users: {stats.totalUsers}</li>
  //           <li>Total Reviews: {stats.totalReviews}</li>
  //         </ul>
  //       )}
  //     </section>

  //     <hr />

  //     {/* Health Section */}
  //     <section>
  //       <h3>System Health</h3>
  //       {!health ? (
  //         <p>Loading health...</p>
  //       ) : (
  //         <ul>
  //           <li>Status: {health.status}</li>
  //           <li>Database: {health.database}</li>
  //           <li>Environment: {health.environment}</li>
  //           <li>Uptime: {Math.floor(health.uptime)} seconds</li>
  //         </ul>
  //       )}
  //     </section>

  //     <hr />

  //     {/* Reviews Section */}
  //     <section>
  //       <h3>Recent Reviews</h3>

  //       {reviews.length === 0 ? (
  //         <p>No reviews found.</p>
  //       ) : (
  //         <table border="1" cellPadding="8">
  //           <thead>
  //             <tr>
  //               <th>User</th>
  //               <th>Problem</th>
  //               <th>Language</th>
  //               <th>Status</th>
  //               <th>Created At</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {reviews.map((r) => (
  //               <tr key={r._id}>
  //                 <td>{r.user?.email || "N/A"}</td>
  //                 <td>{r.problem?.title || "N/A"}</td>
  //                 <td>{r.language}</td>
  //                 <td>{r.reviewStatus}</td>
  //                 <td>{new Date(r.createdAt).toLocaleString()}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       )}
  //     </section>
  //   </div>
  // );
  return (
  <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
    <h1
      style={{
        fontSize: "28px",
        fontWeight: 700,
        marginBottom: "24px",
        color: "#0F172A",
      }}
    >
      🛠 Admin Dashboard
    </h1>

    {/* 🚀 Admin Actions */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  }}
>
  {/* Add Problem */}
  <div
    onClick={() => (window.location.href = "/admin/problems/new")}
    style={{
      cursor: "pointer",
      backgroundColor: "#EEF2FF",
      borderRadius: "16px",
      padding: "24px",
      border: "1px solid #E0E7FF",
      transition: "transform 0.2s",
    }}
    onMouseOver={(e) =>
      (e.currentTarget.style.transform = "translateY(-4px)")
    }
    onMouseOut={(e) =>
      (e.currentTarget.style.transform = "translateY(0)")
    }
  >
    <h3 style={{ fontSize: "18px", fontWeight: 700 }}>
      ➕ Add New Problem
    </h3>
    <p style={{ marginTop: "8px", color: "#475569" }}>
      Create a new DSA problem with prompts and tags
    </p>
  </div>

  {/* Manage Problems */}
  <div
    onClick={() => (window.location.href = "/admin/problems")}
    style={{
      cursor: "pointer",
      backgroundColor: "#ECFEFF",
      borderRadius: "16px",
      padding: "24px",
      border: "1px solid #CFFAFE",
      transition: "transform 0.2s",
    }}
    onMouseOver={(e) =>
      (e.currentTarget.style.transform = "translateY(-4px)")
    }
    onMouseOut={(e) =>
      (e.currentTarget.style.transform = "translateY(0)")
    }
  >
    <h3 style={{ fontSize: "18px", fontWeight: 700 }}>
      📝 Manage Problems
    </h3>
    <p style={{ marginTop: "8px", color: "#475569" }}>
      View, edit, or delete existing problems
    </p>
  </div>
</div>


    {error && (
      <p style={{ color: "#EF4444", marginBottom: "16px" }}>
        {error}
      </p>
    )}

    {/* 📊 System Stats */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginBottom: "32px",
      }}
    >
      <div style={cardStyle}>
        <p style={{ color: "#64748B" }}>Total Problems</p>
        <h2 style={{ fontSize: "28px", marginTop: "8px" }}>
          {stats ? stats.totalProblems : "—"}
        </h2>
      </div>

      <div style={cardStyle}>
        <p style={{ color: "#64748B" }}>Total Users</p>
        <h2 style={{ fontSize: "28px", marginTop: "8px" }}>
          {stats ? stats.totalUsers : "—"}
        </h2>
      </div>

      <div style={cardStyle}>
        <p style={{ color: "#64748B" }}>Total Reviews</p>
        <h2 style={{ fontSize: "28px", marginTop: "8px" }}>
          {stats ? stats.totalReviews : "—"}
        </h2>
      </div>
    </div>

    {/* ❤️ System Health */}
    <div style={{ ...cardStyle, marginBottom: "32px" }}>
      <h3 style={sectionTitle}>❤️ System Health</h3>

      {!health ? (
        <p style={{ color: "#64748B" }}>Loading system health...</p>
      ) : (
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <span>🟢 Status: {health.status}</span>
          <span>🗄 Database: {health.database}</span>
          <span>⚙ Environment: {health.environment}</span>
          <span>⏱ Uptime: {Math.floor(health.uptime)}s</span>
        </div>
      )}
    </div>

    {/* 🧾 Recent Reviews */}
    <div style={cardStyle}>
      <h3 style={sectionTitle}>🧾 Recent Reviews</h3>

      {reviews.length === 0 ? (
        <p style={{ color: "#64748B" }}>No reviews found.</p>
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
              <tr style={{ backgroundColor: "#F8FAFC" }}>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Problem</th>
                <th style={thStyle}>Language</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Created</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r._id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                  <td style={tdStyle}>{r.user?.email || "N/A"}</td>
                  <td style={tdStyle}>{r.problem?.title || "N/A"}</td>
                  <td style={tdStyle}>{r.language}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 600,
                        backgroundColor:
                          r.reviewStatus === "reviewed"
                            ? "#DCFCE7"
                            : "#FEF3C7",
                        color:
                          r.reviewStatus === "reviewed"
                            ? "#166534"
                            : "#92400E",
                      }}
                    >
                      {r.reviewStatus}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {new Date(r.createdAt).toLocaleString()}
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

const thStyle = {
  textAlign: "left",
  padding: "10px",
  fontWeight: 600,
  color: "#334155",
};

const tdStyle = {
  padding: "10px",
  color: "#334155",
};

export default AdminDashboard;
