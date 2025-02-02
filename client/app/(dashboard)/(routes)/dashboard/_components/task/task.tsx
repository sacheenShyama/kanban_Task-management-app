import React, { useState } from "react";

const Task = ({ task }) => {
  const [tasks, setTasks] = useState(task);
  return (
    <>
      <div className="cursor-grab rounded-[12] bg-neutral-700 p-4 shadow-[2] hover:shadow-[6]">
        <h3 className="font-medium text-neutral-100">{tasks.title}</h3>
        <p className="mt-2 text-sm text-neutral-400">{tasks.description}</p>
      </div>
    </>
  );
};

export default Task;
