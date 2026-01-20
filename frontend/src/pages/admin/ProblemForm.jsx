import { useState, useEffect } from "react";

const cardStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  padding: "24px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
};

const labelStyle = {
  display: "block",
  fontWeight: 600,
  marginBottom: "6px",
  color: "#0F172A",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #CBD5E1",
  fontSize: "14px",
  marginBottom: "16px",
};


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

  // return (
  //   <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
  //     <label>Title</label>
  //     <input
  //       value={title}
  //       onChange={(e) => setTitle(e.target.value)}
  //       style={{ width: "100%", marginBottom: "10px" }}
  //     />

  //     <label>Description</label>
  //     <textarea
  //       value={description}
  //       onChange={(e) => setDescription(e.target.value)}
  //       style={{ width: "100%", marginBottom: "10px" }}
  //     />

  //     <label>Constraints</label>
  //     <textarea
  //       value={constraints}
  //       onChange={(e) => setConstraints(e.target.value)}
  //       style={{ width: "100%", marginBottom: "10px" }}
  //     />

  //     <label>Difficulty</label>
  //     <select
  //       value={difficulty}
  //       onChange={(e) => setDifficulty(e.target.value)}
  //       style={{ width: "100%", marginBottom: "10px" }}
  //     >
  //       <option value="Easy">Easy</option>
  //       <option value="Medium">Medium</option>
  //       <option value="Hard">Hard</option>
  //     </select>

  //     <label>Pattern Tags (comma separated)</label>
  //     <input
  //       value={patternTags}
  //       onChange={(e) => setPatternTags(e.target.value)}
  //       style={{ width: "100%", marginBottom: "10px" }}
  //     />

  //     <label>Think Prompts (comma separated)</label>
  //     <input
  //       value={thinkPrompts}
  //       onChange={(e) => setThinkPrompts(e.target.value)}
  //       style={{ width: "100%", marginBottom: "10px" }}
  //     />

  //     <button type="submit">{submitText}</button>
  //   </form>
  // );
  return (
  <form onSubmit={handleSubmit} style={{ maxWidth: "900px" }}>
    <div style={cardStyle}>
      <h2
        style={{
          fontSize: "22px",
          fontWeight: 700,
          marginBottom: "20px",
          color: "#0F172A",
        }}
      >
        🧩 Problem Details
      </h2>

      <label style={labelStyle}>Title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter problem title"
        style={inputStyle}
      />

      <label style={labelStyle}>Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the problem clearly"
        rows={5}
        style={{ ...inputStyle, resize: "vertical" }}
      />

      <label style={labelStyle}>Constraints</label>
      <textarea
        value={constraints}
        onChange={(e) => setConstraints(e.target.value)}
        placeholder="e.g. 1 ≤ n ≤ 10⁵"
        rows={3}
        style={{ ...inputStyle, resize: "vertical" }}
      />

      <label style={labelStyle}>Difficulty</label>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        style={inputStyle}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <label style={labelStyle}>
        Pattern Tags <span style={{ color: "#64748B" }}>(comma separated)</span>
      </label>
      <input
        value={patternTags}
        onChange={(e) => setPatternTags(e.target.value)}
        placeholder="e.g. Two Pointers, Hashing"
        style={inputStyle}
      />

      <label style={labelStyle}>
        Think Prompts <span style={{ color: "#64748B" }}>(comma separated)</span>
      </label>
      <input
        value={thinkPrompts}
        onChange={(e) => setThinkPrompts(e.target.value)}
        placeholder="e.g. What data structure helps here?"
        style={inputStyle}
      />

      <button
        type="submit"
        style={{
          marginTop: "8px",
          backgroundColor: "#4F46E5",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          fontWeight: 600,
          fontSize: "15px",
          cursor: "pointer",
        }}
      >
        {submitText}
      </button>
    </div>
  </form>
);

}

export default ProblemForm;
