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

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAdmin, logout, loading } = useAuth();

  if (loading) return null; // prevent flicker during auth check

  return (
    <nav style={{ marginBottom: "20px" }}>
      {user && (
        <>
          <Link to="/">Home</Link>{" | "}
          <Link to="/problems">Problems</Link>{" | "}
          <Link to="/dashboard">Dashboard</Link>{" | "}
        </>
      )}

      {isAdmin && (
        <>
          <Link to="/admin/dashboard">Admin Dashboard</Link>{" | "}
          <Link to="/admin/problems">Admin Problems</Link>{" | "}
          <Link to="/admin/problems/new">Add Problem</Link>{" | "}
        </>
      )}

      {!user ? (
        <>
          <Link to="/login">Login</Link>{" | "}
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <span style={{ marginLeft: "10px", marginRight: "10px" }}>
            Hi, <strong>{user.name}</strong>
          </span>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
