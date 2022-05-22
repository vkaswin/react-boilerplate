import React from "react";

const Dashboard = ({
  auth: {
    user: { name, email },
    onLogout,
  },
}) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <span>UserName : {name}</span>
      <br />
      <span>Email : {email}</span>
      <br />
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
