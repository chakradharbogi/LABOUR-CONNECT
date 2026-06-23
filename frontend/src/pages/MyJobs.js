import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./JobList.css";

function MyJobs() {

  const [jobs, setJobs] = useState([]);

  const [selectedProfile, setSelectedProfile] = useState(null);

  const [showProfile, setShowProfile] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchJobs = useCallback(async () => {

    try {

      const res = await axios.get(

        `https://labour-connect-backend-tql9.onrender.com/api/jobs/builder/${user._id}`

      );

      setJobs(res.data);

    }

    catch (err) {

      console.log(err);

    }

  }, [user._id]);

  useEffect(() => {

    fetchJobs();

  }, [fetchJobs]);

  const handleViewProfile = async (workerId) => {

    try {

      const res = await axios.get(

        `https://labour-connect-backend-tql9.onrender.com/api/users/${workerId}`

      );

      setSelectedProfile(
        res.data
      );

      setShowProfile(true);

    }

    catch (err) {

      toast.error(
        "Unable to load profile"
      );

    }

  };
  const handleAcceptWorker = async (jobId, workerId) => {

    try {

      const res = await axios.put(

        `https://labour-connect-backend-tql9.onrender.com/api/jobs/accept/${jobId}`,

        {
          workerId
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

  const handleCompleteJob = async (jobId) => {

    try {

      const res = await axios.put(

        `https://labour-connect-backend-tql9.onrender.com/api/jobs/complete/${jobId}`

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

  const handleRateWorker = async (jobId, workerId, rating) => {

    try {

      await axios.put(

        `https://labour-connect-backend-tql9.onrender.com/api/users/rate/${workerId}`,

        {
          rating
        }

      );

      await axios.put(

        `https://labour-connect-backend-tql9.onrender.com/api/jobs/rate/${jobId}`,

        {
          rating
        }

      );

      toast.success(
        "Rating submitted successfully"
      );

      fetchJobs();

    }

    catch (err) {

      console.log("FULL ERROR:", err);

      console.log("RESPONSE:", err.response);

      console.log("DATA:", err.response?.data);

      toast.error(
        err.response?.data?.message || "Error"
      );

    }

  };

  const handleDeleteJob = async (jobId) => {

    try {

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this job?"
      );

      if (!confirmDelete) {

        return;

      }

      const res = await axios.delete(

        `https://labour-connect-backend-tql9.onrender.com/api/jobs/delete/${jobId}`

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
  const handleEditJob = async (job) => {

    try {

      const location = prompt(
        "Enter new location",
        job.location
      );

      const workersRequired = prompt(
        "Enter workers required",
        job.workersRequired
      );

      const wage = prompt(
        "Enter wage",
        job.wage
      );

      const date = prompt(
        "Enter date",
        job.date
      );

      if (
        !location ||
        !workersRequired ||
        !wage ||
        !date
      ) {

        return;

      }

      const res = await axios.put(

        `https://labour-connect-backend-tql9.onrender.com/api/jobs/edit/${job._id}`,

        {

          location,

          workersRequired,

          wage,

          date

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
  return (

    <div className="jobs-container">

      <h2 className="jobs-heading">

        My Jobs

      </h2>

      {

        jobs.length === 0 ?

          (

            <div className="empty-jobs">

              No jobs created

            </div>

          )

          :

          (

            <div className="jobs-grid">

              {

                jobs.map((job) => (

                  <div
                    className="job-card"
                    key={job._id}
                  >

                    <h3>

                      📍 {job.location}

                    </h3>

                    <p>

                      👷 Workers Needed :
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

                    <div>

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

                    </div>

                    <hr />

                    {

                      job.selectedWorker ?

                        (

                          <>

                            <h3>

                              Selected Worker

                            </h3>

                            <p>

                              👤 {job.selectedWorker.name}

                            </p>

                            <p>

                              📞 {job.selectedWorker.phone}

                            </p>

                            {

                              job.status !== "completed" &&

                              (

                                <button

                                  style={{
                                    background: "green",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    marginRight: "10px"
                                  }}

                                  onClick={() =>
                                    handleCompleteJob(
                                      job._id
                                    )
                                  }

                                >

                                  Complete Job

                                </button>

                              )

                            }

                            {

                              job.status === "completed" &&
                              job.workerRating === 0 &&

                              (

                                <>

                                  <h3
                                    style={{
                                      color: "#f59e0b",
                                      marginTop: "20px"
                                    }}
                                  >

                                    Rate Worker ⭐

                                  </h3>

                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "10px",
                                      flexWrap: "wrap"
                                    }}
                                  >

                                    {

                                      [1, 2, 3, 4, 5].map(

                                        (star) => (

                                          <button

                                            key={star}

                                            style={{
                                              background: "#f59e0b",
                                              color: "white",
                                              border: "none",
                                              padding: "10px",
                                              borderRadius: "10px",
                                              cursor: "pointer"
                                            }}

                                            onClick={() =>

                                              handleRateWorker(

                                                job._id,

                                                job.selectedWorker._id,

                                                star

                                              )

                                            }

                                          >

                                            ⭐ {star}

                                          </button>

                                        )

                                      )

                                    }

                                  </div>

                                </>

                              )

                            }

                            {

                              job.workerRating > 0 &&

                              (

                                <>

                                  <h3
                                    style={{
                                      color: "#10b981",
                                      marginTop: "20px"
                                    }}
                                  >

                                    Rating Given Successfully ✅

                                  </h3>

                                  <h3>

                                    You Rated This Worker :

                                  </h3>

                                  <div
                                    style={{
                                      fontSize: "28px",
                                      marginTop: "10px"
                                    }}
                                  >

                                    {"⭐".repeat(job.workerRating)}

                                  </div>

                                </>

                              )

                            }

                          </>

                        )

                        :

                        (

                          <>

                            <h3>

                              Applicants

                            </h3>

                            {

                              job.applicants &&
                                job.applicants.length > 0 ?

                                (

                                  job.applicants.map(

                                    (worker) => (

                                      <div
                                        key={worker._id}
                                      >

                                        <p>

                                          👤 {worker.name}

                                        </p>

                                        <p>

                                          📞 {worker.phone}

                                        </p>
                                        <button

                                          style={{
                                            background: "#10b981",
                                            color: "white",
                                            border: "none",
                                            padding: "10px 20px",
                                            borderRadius: "10px",
                                            cursor: "pointer",
                                            marginRight: "10px"
                                          }}

                                          onClick={() =>
                                            handleViewProfile(
                                              worker._id
                                            )
                                          }

                                        >

                                          View Profile

                                        </button>

                                        <button

                                          style={{
                                            background: "#2563eb",
                                            color: "white",
                                            border: "none",
                                            padding: "10px 20px",
                                            borderRadius: "10px",
                                            cursor: "pointer"
                                          }}

                                          onClick={() =>
                                            handleAcceptWorker(
                                              job._id,
                                              worker._id
                                            )
                                          }

                                        >

                                          Accept Worker

                                        </button>

                                        <hr />

                                      </div>

                                    )

                                  )

                                )

                                :

                                (

                                  <p>

                                    No applicants yet

                                  </p>

                                )

                            }

                          </>

                        )

                    }

                    <button

                      style={{
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        marginTop: "20px",
                        marginRight: "10px"
                      }}

                      onClick={() =>
                        handleEditJob(job)
                      }

                    >

                      Edit Job

                    </button>

                    <button

                      style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        marginTop: "20px"
                      }}

                      onClick={() =>
                        handleDeleteJob(
                          job._id
                        )
                      }

                    >

                      Delete Job

                    </button>

                  </div>

                ))

              }

            </div>

          )

      }

      {
        showProfile &&
        selectedProfile && (

          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999
            }}
          >

            <div
              style={{
                background: "white",
                padding: "30px",
                borderRadius: "20px",
                width: "400px"
              }}
            >

              <h2>

                Worker Profile

              </h2>

              <p>
                👤 Name : {selectedProfile.name}
              </p>

              <p>
                📞 Phone : {selectedProfile.phone}
              </p>

              <p>
                🏠 Location : {selectedProfile.location}
              </p>

              <p>
                🔧 Skill : {selectedProfile.skill}
              </p>

              <p>
                ⭐ Rating : {selectedProfile.rating?.toFixed(1)}
              </p>

              <p>
                📊 Total Ratings : {selectedProfile.totalRatings}
              </p>
              <button

                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  cursor: "pointer"
                }}

                onClick={() =>
                  setShowProfile(false)
                }

              >

                Close

              </button>

            </div>

          </div>

        )
      }

    </div>

  );

}

export default MyJobs;