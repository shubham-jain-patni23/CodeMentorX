import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("https://codementorx-oh8c.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      setMessage("Login successful");
    } else {
      setMessage(data.message);
    }
  };

  // return (
  //   <div>
  //     <h2>Login</h2>

  //     <form onSubmit={handleLogin}>
  //       <input
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //       />
  //       <br />

  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //       <br />

  //       <button type="submit">Login</button>
  //     </form>

  //     <p>{message}</p>
  //   </div>
  // );
  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F8FAFC",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "380px",
        backgroundColor: "#FFFFFF",
        padding: "28px",
        borderRadius: "16px",
        border: "1px solid #E5E7EB",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          fontSize: "26px",
          fontWeight: 700,
          marginBottom: "6px",
          color: "#0F172A",
          textAlign: "center",
        }}
      >
        Welcome Back 👋
      </h2>

      <p
        style={{
          fontSize: "14px",
          color: "#64748B",
          textAlign: "center",
          marginBottom: "24px",
        }}
      >
        Log in to continue to CodeMentorX
      </p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "8px",
            backgroundColor: "#4F46E5",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "14px",
            textAlign: "center",
            color: message.includes("successful")
              ? "#16A34A"
              : "#EF4444",
            fontSize: "14px",
          }}
        >
          {message}
        </p>
      )}
    </div>
  </div>
);

}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  border: "1px solid #CBD5E1",
  fontSize: "14px",
};


export default Login;
