import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [health, setHealth] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/stats", {
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
        const res = await fetch("http://localhost:5000/admin/health", {
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
        const res = await fetch("http://localhost:5000/admin/reviews", {
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

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Stats Section */}
      <section>
        <h3>System Stats</h3>
        {!stats ? (
          <p>Loading stats...</p>
        ) : (
          <ul>
            <li>Total Problems: {stats.totalProblems}</li>
            <li>Total Users: {stats.totalUsers}</li>
            <li>Total Reviews: {stats.totalReviews}</li>
          </ul>
        )}
      </section>

      <hr />

      {/* Health Section */}
      <section>
        <h3>System Health</h3>
        {!health ? (
          <p>Loading health...</p>
        ) : (
          <ul>
            <li>Status: {health.status}</li>
            <li>Database: {health.database}</li>
            <li>Environment: {health.environment}</li>
            <li>Uptime: {Math.floor(health.uptime)} seconds</li>
          </ul>
        )}
      </section>

      <hr />

      {/* Reviews Section */}
      <section>
        <h3>Recent Reviews</h3>

        {reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>User</th>
                <th>Problem</th>
                <th>Language</th>
                <th>Status</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r._id}>
                  <td>{r.user?.email || "N/A"}</td>
                  <td>{r.problem?.title || "N/A"}</td>
                  <td>{r.language}</td>
                  <td>{r.reviewStatus}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
