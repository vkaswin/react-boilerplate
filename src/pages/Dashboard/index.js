import React from "react";
import { useAuth } from "hooks";

const Dashboard = () => {
  const {
    user: { name, email },
    onLogout,
  } = useAuth();

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
