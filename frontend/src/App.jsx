// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Problems from "./pages/Problems";
// import ProblemDetail from "./pages/ProblemDetail";
// import Interview from "./pages/Interview";
// import Dashboard from "./pages/Dashboard";
// import AdminAddProblem from "./pages/AdminAddProblem";



// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/problems"
//           element={
//             <ProtectedRoute>
//               <Problems />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/problems/:id"
//           element={
//             <ProtectedRoute>
//               <ProblemDetail />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/interview/:submissionId"
//           element={
//             <ProtectedRoute>
//               <Interview />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/admin/add-problem" element={<AdminAddProblem />} />


//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Problems from "./pages/Problems";
import ProblemDetail from "./pages/ProblemDetail";
import Interview from "./pages/Interview";
import Dashboard from "./pages/UserDashboard";
import AdminProblems from "./pages/admin/AdminProblems";
import AdminAddProblem from "./pages/admin/AdminAddProblem";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEditProblem from "./pages/admin/AdminEditProblem";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User protected routes */}
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

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/problems"
          element={
            <ProtectedRoute adminOnly>
              <AdminProblems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/problems/new"
          element={
            <ProtectedRoute adminOnly>
              <AdminAddProblem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/problems/:id/edit"
          element={
            <ProtectedRoute adminOnly>
              <AdminEditProblem />
            </ProtectedRoute>
          }
        />


        
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

