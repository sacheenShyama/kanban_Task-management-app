"use client";
import React from "react";
import Navbar from "./navbar";
import Board from "./board/board";

const Container = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Navbar />
      <Board />
    </div>
  );
};

export default Container;
