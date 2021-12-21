import React from "react";
import { Outlet } from "react-router-dom";

import "./MainLayout.scss";

const MainLayout = () => {
  return (
    <div>
      <h1>Main Layout</h1>
      <Outlet />
    </div>
  );
};

export default MainLayout;
