import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import StatsCard from "../components/StatsCard";
import CreateJob from "./CreateJob";
import MyJobs from "./MyJobs";

function BuilderDashboard() {

  const [totalJobs, setTotalJobs] = useState(0);
  const [pendingJobs, setPendingJobs] = useState(0);
  const [assignedJobs, setAssignedJobs] = useState(0);
  const [completedJobs, setCompletedJobs] = useState(0);

  const fetchStats = async () => {

    try {

      const res = await axios.get(
        "https://labour-connect-backend-tql9.onrender.com/api/jobs"
      );

      const jobs = res.data;

      setTotalJobs(
        jobs.length
      );

      setPendingJobs(

        jobs.filter(

          (job) =>

            job.status === "pending"

        ).length

      );

      setAssignedJobs(

        jobs.filter(

          (job) =>

            job.status === "assigned"

        ).length

      );

      setCompletedJobs(

        jobs.filter(

          (job) =>

            job.status === "completed"

        ).length

      );

    }

    catch (err) {

      console.log(err);

    }

  };


  useEffect(() => {

    fetchStats();

  }, []);


  return (

    <div>

      <Navbar />

      <ProfileCard />

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

          title="Total Jobs"

          value={totalJobs}

          color="#2563eb"

        />

        <StatsCard

          title="Pending Jobs"

          value={pendingJobs}

          color="#f59e0b"

        />

        <StatsCard

          title="Assigned Jobs"

          value={assignedJobs}

          color="#3b82f6"

        />

        <StatsCard

          title="Completed Jobs"

          value={completedJobs}

          color="#10b981"

        />

      </div>

      <CreateJob />

      <MyJobs />

    </div>

  );

}

export default BuilderDashboard;