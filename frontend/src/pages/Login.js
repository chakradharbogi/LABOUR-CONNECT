import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Auth.css";

function Login() {

  const [phone, setPhone] = useState("");

  const handleLogin = async () => {

    try {

      const res = await axios.post(

        "http://127.0.0.1:5000/api/users/login",

        {
          phone
        }

      );

      toast.success(
        res.data.message
      );

      localStorage.setItem(

        "user",

        JSON.stringify(res.data.user)

      );

      setTimeout(() => {

        window.location.reload();

      }, 1000);

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Login failed"

      );

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1 className="auth-title">

          🔐 Login

        </h1>

        <input

          placeholder="📞 Phone Number"

          value={phone}

          onChange={(e) =>
            setPhone(e.target.value)
          }

        />

        <button

          className="auth-btn"

          onClick={handleLogin}

        >

          Login

        </button>

      </div>

    </div>

  );

}

export default Login;