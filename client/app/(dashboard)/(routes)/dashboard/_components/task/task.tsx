import React, { useState } from "react";

const INITIAL_TASKS = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create component library and design tokens",
    status: "TODO",
  },
];
const Task = () => {
  const [task, setTask] = useState(INITIAL_TASKS);
  return (
    <>
      {task.map((t) => (
        <div
          key={t.id}
          className="cursor-grab rounded-[12] bg-neutral-700 p-4 shadow-[2] hover:shadow-[6]"
        >
          <h3 className="font-medium text-neutral-100">{t.title}</h3>
          <p className="mt-2 text-sm text-neutral-400">{t.description}</p>
        </div>
      ))}
    </>
  );
};

export default Task;
