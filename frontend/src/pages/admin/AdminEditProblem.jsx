import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProblemForm from "./ProblemForm";

function AdminEditProblem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:5000/admin/problems/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch problem");
        }

        setProblem(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProblem();
  }, [id]);

  const handleUpdate = async (payload) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/admin/problems/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update problem");
      }

      alert("Problem updated successfully!");
      navigate("/admin/problems");
    } catch (err) {
      alert(err.message);
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!problem) return <p>Loading problem...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Problem</h2>
      <ProblemForm
        initialData={problem}
        onSubmit={handleUpdate}
        submitText="Update Problem"
      />
    </div>
  );
}

export default AdminEditProblem;
