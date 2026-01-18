import { useState, useEffect } from "react";

function ProblemForm({ initialData = {}, onSubmit, submitText }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [patternTags, setPatternTags] = useState("");
  const [thinkPrompts, setThinkPrompts] = useState("");

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setConstraints(initialData.constraints || "");
      setDifficulty(initialData.difficulty || "Easy");
      setPatternTags((initialData.patternTags || []).join(", "));
      setThinkPrompts((initialData.thinkPrompts || []).join(", "));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !constraints) {
      alert("Title, description, and constraints are required");
      return;
    }

    const payload = {
      title,
      description,
      constraints,
      difficulty,
      patternTags: patternTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      thinkPrompts: thinkPrompts
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
      <label>Title</label>
      <input
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
        value={patternTags}
        onChange={(e) => setPatternTags(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Think Prompts (comma separated)</label>
      <input
        value={thinkPrompts}
        onChange={(e) => setThinkPrompts(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button type="submit">{submitText}</button>
    </form>
  );
}

export default ProblemForm;
