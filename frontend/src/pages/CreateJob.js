import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./CreateJob.css";

function CreateJob() {

  const [job, setJob] = useState({
    workersRequired: "",
    location: "",
    date: "",
    wage: ""
  });

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleChange = (e) => {

    setJob({

      ...job,

      [e.target.name]: e.target.value

    });

  };

  const handleCreate = async () => {

    try {

      const res = await axios.post(

        "https://labour-connect-backend-tql9.onrender.com/api/jobs/create",

        {

          ...job,

          builderId: user._id

        }

      );

      toast.success(

        res.data.message

      );

      setJob({

        workersRequired: "",

        location: "",

        date: "",

        wage: ""

      });

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Error"

      );

    }

  };

  return (

    <div className="create-job-container">

      <h2>

        Create Job

      </h2>

      <input

        type="number"

        name="workersRequired"

        placeholder="Workers Required"

        value={job.workersRequired}

        onChange={handleChange}

      />

      <input

        name="location"

        placeholder="Location"

        value={job.location}

        onChange={handleChange}

      />

      <input

        type="date"

        name="date"

        value={job.date}

        onChange={handleChange}

      />

      <input

        name="wage"

        placeholder="Wage"

        value={job.wage}

        onChange={handleChange}

      />

      <br />

      <button

        onClick={handleCreate}

      >

        Create Job

      </button>

    </div>

  );

}

export default CreateJob;