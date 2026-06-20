import "./App.css";
import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import BuilderDashboard from "./pages/BuilderDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Register from "./pages/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [showLogin, setShowLogin] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {

    return (

      <>

        <div className="auth-page">

          <div className="auth-header">

            <h1>

              Labour Connect

            </h1>

            <p>

              Find Work • Hire Workers Easily

            </p>

          </div>

          <div className="auth-container">

            {

              showLogin ?

              (

                <div>

                  <Login />

                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "20px"
                    }}
                  >

                    Don't have an account?

                    <button

                      style={{
                        border: "none",
                        background: "none",
                        color: "#2563eb",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginLeft: "5px"
                      }}

                      onClick={() =>
                        setShowLogin(false)
                      }

                    >

                      Register

                    </button>

                  </p>

                </div>

              )

              :

              (

                <div>

                  <Register />

                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "20px"
                    }}
                  >

                    Already have an account?

                    <button

                      style={{
                        border: "none",
                        background: "none",
                        color: "#2563eb",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginLeft: "5px"
                      }}

                      onClick={() =>
                        setShowLogin(true)
                      }

                    >

                      Login

                    </button>

                  </p>

                </div>

              )

            }

          </div>

        </div>

        <ToastContainer
          position="top-right"
          autoClose={2000}
        />

      </>

    );

  }

  return (

    <BrowserRouter>

      <Routes>

        <Route

          path="/"

          element={

            user.role === "worker"

              ?

              <WorkerDashboard />

              :

              <BuilderDashboard />

          }

        />

        <Route

          path="/profile"

          element={<Profile />}

        />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

    </BrowserRouter>

  );

}

export default App;