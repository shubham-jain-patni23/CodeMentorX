import { useState } from "react";

function AdminAddProblem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [patternTags, setPatternTags] = useState("");
  const [thinkPrompts, setThinkPrompts] = useState("");

  const handleSubmit = async () => {
  if (
    !title ||
    !description ||
    !constraints ||
    !patternTags ||
    !thinkPrompts
  ) {
    alert("All fields are required");
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:5000/problems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        description,
        constraints,
        difficulty,
        patternTags: patternTags.split(",").map((t) => t.trim()),
        thinkPrompts: thinkPrompts.split(",").map((p) => p.trim()),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to add problem");
      return;
    }

    alert("Problem added successfully!");

    // Reset form
    setTitle("");
    setDescription("");
    setConstraints("");
    setDifficulty("Easy");
    setPatternTags("");
    setThinkPrompts("");
  } catch (error) {
    alert("Server error");
  }
};


  return (
    <div style={{ padding: "20px", maxWidth: "700px" }}>
      <h2>Add New Problem (Admin)</h2>

      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Constraints</label>
      <textarea
        value={constraints}
        onChange={(e) => setConstraints(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Difficulty</label>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <label>Pattern Tags (comma separated)</label>
      <input
        type="text"
        value={patternTags}
        onChange={(e) => setPatternTags(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Think Prompts (comma separated)</label>
      <input
        type="text"
        value={thinkPrompts}
        onChange={(e) => setThinkPrompts(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button onClick={handleSubmit}>Add Problem</button>

    </div>
  );
}

export default AdminAddProblem;
