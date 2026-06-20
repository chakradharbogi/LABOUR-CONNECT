import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobList.css";

function JobList() {

  const [jobs, setJobs] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchJobs = async () => {

    try {

      const res = await axios.get(

        `http://127.0.0.1:5000/api/jobs/builder/${user._id}`

      );

      setJobs(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };


  useEffect(() => {

    fetchJobs();

  }, []);


  const handleAcceptWorker = async (jobId, workerId) => {

    try {

      const res = await axios.put(

        `http://127.0.0.1:5000/api/jobs/accept/${jobId}`,

        {
          workerId
        }

      );

      alert(res.data.message);

      fetchJobs();

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        "Error"

      );

    }

  };


  const handleCompleteJob = async (jobId) => {

    try {

      const res = await axios.put(

        `http://127.0.0.1:5000/api/jobs/complete/${jobId}`

      );

      alert(res.data.message);

      fetchJobs();

    }

    catch (err) {

      alert(

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

              No jobs available

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

                      👷 Workers Needed: {job.workersRequired}

                    </p>

                    <p>

                      💰 Wage: ₹{job.wage}

                    </p>

                    <p>

                      📅 Date: {job.date}

                    </p>

                    <h3>

                      Status : {job.status}

                    </h3>

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

                            <p>

                              ✅ Assigned

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
                                    cursor: "pointer"
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

                  </div>

                ))

              }

            </div>

          )

      }

    </div>

  );

}

export default JobList;