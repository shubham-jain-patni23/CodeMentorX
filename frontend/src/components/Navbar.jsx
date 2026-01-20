// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <nav style={{ marginBottom: "20px" }}>
//       <Link to="/">Home</Link>{" | "}
//       <Link to="/dashboard">Dashboard</Link>{" | "}
//       <Link to="/problems">Problems</Link>{" | "}
      



//       {!token ? (
//         <>
//           <Link to="/login">Login</Link>{" | "}
//           <Link to="/register">Register</Link>
//         </>
//       ) : (
//         <button onClick={handleLogout}>Logout</button>
//       )}
//     </nav>
//   );
// }

// export default Navbar;


// original from here 

// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Navbar() {
//   const { user, isAdmin, logout, loading } = useAuth();

//   if (loading) return null; // prevent flicker during auth check

//   return (
//     <nav style={{ marginBottom: "20px" }}>
//       {user && (
//         <>
//           <Link to="/">Home</Link>{" | "}
//           <Link to="/problems">Problems</Link>{" | "}
//           <Link to="/dashboard">Dashboard</Link>{" | "}
//         </>
//       )}

//       {isAdmin && (
//         <>
//           <Link to="/admin/dashboard">Admin Dashboard</Link>{" | "}
//           <Link to="/admin/problems">Admin Problems</Link>{" | "}
//           <Link to="/admin/problems/new">Add Problem</Link>{" | "}
//         </>
//       )}

//       {!user ? (
//         <>
//           <Link to="/login">Login</Link>{" | "}
//           <Link to="/register">Register</Link>
//         </>
//       ) : (
//         <>
//           <span style={{ marginLeft: "10px", marginRight: "10px" }}>
//             Hi, <strong>{user.name}</strong>
//           </span>
//           <button onClick={logout}>Logout</button>
//         </>
//       )}
//     </nav>
//   );
// }

// export default Navbar;


import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navLinkStyle = {
  textDecoration: "none",
  color: "#334155",
  fontWeight: 500,
  padding: "6px 10px",
  borderRadius: "6px",
  transition: "background 0.2s, color 0.2s",
};

function Navbar() {
  const navigate = useNavigate();
  const { user, isAdmin, logout, loading } = useAuth();

  if (loading) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "20px",
            fontWeight: 700,
            color: "#0F172A",
            letterSpacing: "-0.3px",
          }}
        >
          <span>CodeMentor</span>
          <span style={{ color: "#4F46E5" }}>X</span> 
        </Link>

        {/* Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {user && (
            <>
              <Link
                to="/problems"
                style={navLinkStyle}
                onMouseOver={(e) => {
                  e.target.style.background = "#EEF2FF";
                  e.target.style.color = "#4F46E5";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#334155";
                }}
              >
                Problems
              </Link>

              <Link
                to="/dashboard"
                style={navLinkStyle}
                onMouseOver={(e) => {
                  e.target.style.background = "#EEF2FF";
                  e.target.style.color = "#4F46E5";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#334155";
                }}
              >
                Dashboard
              </Link>
            </>
          )}

          {isAdmin && (
            <Link
              to="/admin/dashboard"
              style={{
                ...navLinkStyle,
                backgroundColor: "#EEF2FF",
                color: "#4F46E5",
                fontWeight: 600,
              }}
            >
              Admin
            </Link>
          )}

          {user ? (
            <>
              <span
                style={{
                  marginLeft: "8px",
                  color: "#64748B",
                  fontSize: "14px",
                }}
              >
                Hi, <strong>{user.name}</strong>
              </span>

              <button
                onClick={handleLogout}
                style={{
                  marginLeft: "8px",
                  backgroundColor: "#EF4444",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  fontWeight: 500,
                  cursor: "pointer",
                  boxShadow:
                    "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link style={navLinkStyle} to="/login">
                Login
              </Link>
              <Link style={navLinkStyle} to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
