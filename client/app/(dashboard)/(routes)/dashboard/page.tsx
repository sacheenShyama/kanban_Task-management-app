import React from "react";
import Board from "./_components/board/board";
import Navbar from "./_components/navbar";

const Dashboard = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Navbar />
      <Board />
    </div>
  );
};

export default Dashboard;
