import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {

  const [form, setForm] = useState({

    name: "",

    phone: "",

    role: "worker",

    location: "",

    skill: ""

  });
  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async () => {

    try {

      const res = await axios.post(

        "https://labour-connect-backend-tql9.onrender.com/api/users/register",

        form

      );

      toast.success(

        res.data.message

      );

      setForm({

        name: "",

        phone: "",

        role: "worker",

        location: ""

      });

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Server error"

      );

    }

  };

  return (

    <div className="auth-card">

      <h2>

        Register

      </h2>

      <input

        name="name"

        placeholder="Name"

        value={form.name}

        onChange={handleChange}

      />

      <input

        name="phone"

        placeholder="Phone"

        value={form.phone}

        onChange={handleChange}

      />

      <select

        name="role"

        value={form.role}

        onChange={handleChange}

      >

        <option value="worker">

          Worker

        </option>

        <option value="mason">

          Mason

        </option>

        <option value="builder">

          Builder

        </option>

      </select>

      <input

        name="location"

        placeholder="Location"

        value={form.location}

        onChange={handleChange}

      />
      {

        form.role === "worker" && (

          <select

            name="skill"

            value={form.skill}

            onChange={handleChange}

          >

            <option value="">

              Select Skill

            </option>

            <option value="Mason">

              Mason

            </option>

            <option value="Painter">

              Painter

            </option>

            <option value="Electrician">

              Electrician

            </option>

            <option value="Plumber">

              Plumber

            </option>

            <option value="Carpenter">

              Carpenter

            </option>

            <option value="Helper">

              Helper

            </option>

          </select>

        )

      }
      <button

        onClick={handleSubmit}

      >

        Register

      </button>

    </div>

  );

}

export default Register;