import Navbar from "../components/Navbar";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const stars = "⭐".repeat(
    Math.round(user.rating)
  );
    return (

    <div>

      <Navbar />

      <div
        style={{
          width: "60%",
          margin: "50px auto",
          background: "white",
          padding: "40px",
          borderRadius: "25px",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.1)"
        }}
      >

        <h1
          style={{
            color: "#1e3a8a",
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          👤 Profile
        </h1>

        <hr />

        <h2>

          👤 Name :
          {" "}
          {user.name}

        </h2>

        <h2>

          📞 Phone :
          {" "}
          {user.phone}

        </h2>

        <h2>

          🏠 Location :
          {" "}
          {user.location}

        </h2>

        <h2>

          🧑‍💼 Role :
          {" "}
          {user.role}

        </h2>

        <hr
          style={{
            marginTop: "30px"
          }}
        />

        <h2
          style={{
            color: "#f59e0b"
          }}
        >

          ⭐ Average Rating :
          {" "}
          {user.rating.toFixed(1)}

        </h2>

        <div
          style={{
            fontSize: "35px",
            marginTop: "10px"
          }}
        >

          {stars}

        </div>

        <h2
          style={{
            color: "#10b981",
            marginTop: "25px"
          }}
        >

          📊 Total Ratings :
          {" "}
          {user.totalRatings}

        </h2>

      </div>

    </div>

  );

}

export default Profile;