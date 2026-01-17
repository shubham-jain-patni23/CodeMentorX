import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import Interview from "./pages/Interview";



function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/problems"
          element={
            <ProtectedRoute>
              <Problems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/problems/:id"
          element={
            <ProtectedRoute>
              <ProblemDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interview/:submissionId"
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
