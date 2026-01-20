// function Home() {
//   return (
//     <div>
//       <h2>Welcome to CodeMentorX</h2>
//       <p>You are logged in.</p>
//     </div>
//   );
// }

// export default Home;
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, isAdmin } = useAuth();

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px" }}>
      {/* Hero Section */}
      <div
        style={{
          marginBottom: "40px",
          padding: "32px",
          borderRadius: "20px",
          background:
            "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: 800 }}>
          Welcome{user ? `, ${user.name}` : ""} 👋
        </h1>

        <p style={{ marginTop: "12px", fontSize: "18px", maxWidth: "700px" }}>
          CodeMentorX helps you practice DSA, get AI-powered code reviews,
          and simulate real interview feedback — all in one place.
        </p>
      </div>

      {/* Action Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Problems */}
        <HomeCard
          title="🧩 Practice Problems"
          description="Solve curated DSA problems with AI review"
          to="/problems"
        />

        {/* Dashboard */}
        <HomeCard
          title="📊 Your Dashboard"
          description="Track progress, patterns, and attempts"
          to="/dashboard"
        />

        

        {/* Admin */}
        {isAdmin && (
          <HomeCard
            title="🛠 Admin Panel"
            description="Manage problems and system stats"
            to="/admin/dashboard"
          />
        )}
      </div>
    </div>
  );
}

function HomeCard({ title, description, to }) {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "24px",
          border: "1px solid #E5E7EB",
          boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
          height: "100%",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow =
            "0 8px 20px rgba(0,0,0,0.08)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 2px 10px rgba(0,0,0,0.06)";
        }}
      >
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "8px",
            color: "#0F172A",
          }}
        >
          {title}
        </h3>

        <p style={{ color: "#475569", lineHeight: "1.5" }}>
          {description}
        </p>
      </div>
    </Link>
  );
}

export default Home;
