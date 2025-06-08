import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import FloatingShapes from "./components/FloatingShape";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import EmailVerification from "./pages/EmailVerification";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/authStore";
import { ProtectedRoute } from "./utils/protectedRoute";
import { RedirectAuthenticatedUser } from "./utils/redirect";

function App() {
  // return <div className="text-8xl bg-green-500 font-bold">Bismillah</div>;
  const { checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShapes
        color="bg-green-500"
        size="w-64 h-64"
        top={"-5%"}
        left={"10%"}
        delay={0}
      />
      <FloatingShapes
        color="bg-emarald-500"
        size="w-48 h-48"
        top={"70%"}
        left={"80%"}
        delay={5}
      />
      <FloatingShapes
        color="bg-lime-500"
        size="w-32 h-32"
        top={"40%"}
        left={"-10%"}
        delay={2}
      />

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        stacked
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser
              isAuthenticated={isAuthenticated}
              user={user}
            >
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser
              isAuthenticated={isAuthenticated}
              user={user}
            >
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerification />} />
      </Routes>
    </div>
  );
}

export default App;
