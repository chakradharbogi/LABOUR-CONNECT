import "./ProfileCard.css";

function ProfileCard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile-card">

      <div className="profile-left">
        <div className="avatar">
          👤
        </div>
      </div>

      <div className="profile-right">

        <h1>
          Welcome, {user?.name || "Chakri"} 👋
        </h1>

        <div className="profile-info">

          <div className="info-box">
            <h3>Role</h3>
            <p>{user?.role || "Builder"}</p>
          </div>

          <div className="info-box">
            <h3>Location</h3>
            <p>{user?.location || "Gurla"}</p>
          </div>

          <div className="info-box">
            <h3>Phone</h3>
            <p>{user?.phone || "9876543210"}</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfileCard;