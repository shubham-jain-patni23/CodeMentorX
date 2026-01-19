import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Problems</h2>

      <Link to="/admin/problems/new">
        <button>Add New Problem</button>
      </Link>

      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {problems.length === 0 ? (
            <tr>
              <td colSpan="3">No problems found.</td>
            </tr>
          ) : (
            problems.map((problem) => (
              <tr key={problem._id}>
                <td>{problem.title}</td>
                <td>{problem.difficulty}</td>
                <td>
                  <Link to={`/admin/problems/${problem._id}/edit`}>
                    <button>Edit</button>
                  </Link>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDelete(problem._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProblems;
