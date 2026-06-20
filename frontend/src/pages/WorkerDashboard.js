import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import "./JobList.css";

function WorkerDashboard() {

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const [appliedCount, setAppliedCount] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchJobs = useCallback(async () => {

  try {

    const res = await axios.get(
      "http://127.0.0.1:5000/api/jobs"
    );

    const allJobs = res.data;

    setJobs(allJobs);

    const applied = allJobs.filter(

      (job) =>

        job.applicants?.some(

          (worker) => worker._id === user._id

        )

    );

    setAppliedCount(
      applied.length
    );

    setSelectedCount(

      applied.filter(

        (job) =>

          job.selectedWorker &&

          job.selectedWorker._id === user._id

      ).length

    );

    setCompletedCount(

      applied.filter(

        (job) =>

          job.status === "completed"

      ).length

    );

  }

  catch (err) {

    console.log(err);

  }

}, [user._id]);


useEffect(() => {

  fetchJobs();

}, [fetchJobs]);

  const handleApply = async (jobId) => {

    try {

      const res = await axios.put(

        `http://127.0.0.1:5000/api/jobs/apply/${jobId}`,

        {
          workerId: user._id
        }

      );

      toast.success(
        res.data.message
      );

      fetchJobs();

    }

    catch (err) {

      toast.error(

        err.response?.data?.message ||

        "Error"

      );

    }

  };


  const availableJobs = jobs.filter(

    (job) =>

      !job.applicants?.some(

        (worker) => worker._id === user._id

      )

  ).filter(

    (job) =>

      job.location.toLowerCase().includes(

        search.toLowerCase()

      )

  );


  const appliedJobs = jobs.filter(

    (job) =>

      job.applicants?.some(

        (worker) => worker._id === user._id

      )

  );


  return (

    <div>

      <Navbar />

      <div
        style={{
          width: "80%",
          margin: "auto",
          marginTop: "40px"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            color: "#1e3a8a"
          }}
        >
          Worker Dashboard 👷
        </h1>


        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
            marginTop: "30px",
            marginBottom: "40px"
          }}
        >

          <StatsCard
            title="Applied Jobs"
            value={appliedCount}
            color="#2563eb"
          />

          <StatsCard
            title="Selected Jobs"
            value={selectedCount}
            color="#f59e0b"
          />

          <StatsCard
            title="Completed Jobs"
            value={completedCount}
            color="#10b981"
          />

        </div>


        <div
          style={{
            textAlign: "center",
            marginTop: "30px"
          }}
        >

          <input

            type="text"

            placeholder="Search jobs by location..."

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

            style={{
              width: "300px",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid gray"
            }}

          />

        </div>


        <h2
          style={{
            color: "#2563eb",
            marginTop: "50px"
          }}
        >
          Available Jobs
        </h2>


        {

          availableJobs.map((job) => (

            <div
              className="job-card"
              key={job._id}
              style={{
                marginBottom: "20px"
              }}
            >

              <h3>

                📍 {job.location}

              </h3>

              <p>

                👷 Workers Required :
                {" "}
                {job.workersRequired}

              </p>

              <p>

                💰 Wage :
                {" "}
                ₹{job.wage}

              </p>

              <p>

                📅 Date :
                {" "}
                {job.date}

              </p>


              {

                job.status === "pending" &&

                (

                  <div className="pending-status">

                    🟡 Pending

                  </div>

                )

              }

              {

                job.status === "assigned" &&

                (

                  <div className="assigned-status">

                    🔵 Assigned

                  </div>

                )

              }

              {

                job.status === "completed" &&

                (

                  <div className="completed-status">

                    🟢 Completed

                  </div>

                )

              }

              <br />

              <button

                onClick={() =>
                  handleApply(job._id)
                }

                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  cursor: "pointer"
                }}

              >

                Apply

              </button>

            </div>

          ))

        }


        <h2
          style={{
            color: "#10b981",
            marginTop: "60px"
          }}
        >

          My Applied Jobs

        </h2>


        {

          appliedJobs.map((job) => (

            <div
              className="job-card"
              key={job._id}
              style={{
                marginBottom: "20px"
              }}
            >

              <h3>

                📍 {job.location}

              </h3>

              <p>

                👷 Workers Required :
                {" "}
                {job.workersRequired}

              </p>

              <p>

                💰 Wage :
                {" "}
                ₹{job.wage}

              </p>

              <p>

                📅 Date :
                {" "}
                {job.date}

              </p>


              {

                job.status === "pending" &&

                (

                  <div className="pending-status">

                    🟡 Pending

                  </div>

                )

              }

              {

                job.status === "assigned" &&

                (

                  <div className="assigned-status">

                    🔵 Assigned

                  </div>

                )

              }

              {

                job.status === "completed" &&

                (

                  <div className="completed-status">

                    🟢 Completed

                  </div>

                )

              }

              <br />

              <button

                style={{
                  background: "#10b981",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "10px"
                }}

              >

                Applied ✓

              </button>


              {

                job.selectedWorker &&

                job.selectedWorker._id === user._id &&

                (

                  <h3
                    style={{
                      color: "#10b981",
                      marginTop: "20px"
                    }}
                  >

                    🎉 You have been selected!

                  </h3>

                )

              }

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default WorkerDashboard;