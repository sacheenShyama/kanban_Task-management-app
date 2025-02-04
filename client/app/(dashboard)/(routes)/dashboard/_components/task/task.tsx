"use client";

import React, { useState } from "react";
import Modal from "./_components/modal";
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/hooks";
import { handleDeleteTask } from "@/lib/features/taskSlice/slice";
import clsx from "clsx";

interface TaskProp {
  task: unknown;
  triggerGetBoardApi: () => void;
}
const Task: React.FC<TaskProp> = ({ task, triggerGetBoardApi }) => {
  const dispatch = useAppDispatch();
  const [tasks, setTasks] = useState(task);

  const deleteTask = async () => {
    try {
      await dispatch(handleDeleteTask(task._id));
      toast.success("Task deleted successfully");
      triggerGetBoardApi();
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <div className="rounded-[12] bg-neutral-700 p-4 shadow-[2] hover:shadow-md">
        <div className="flex justify-between mb-4 font-bold text-neutral-100">
          <div className=" cursor-pointer rounded">
            <Modal task={task} triggerGetBoardApi={triggerGetBoardApi} />
          </div>
          <div className="w-full ml-2">
            <h3 className="font-bold text-neutral-100">{tasks.title}</h3>
          </div>
          <div>
            <div className="cursor-pointer rounded" onClick={deleteTask}>
              <MdDeleteForever size={20} color="rgb(239 68 68)" />
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-neutral-400">{tasks.description}</p>
        <div>
          <p className="text-white text-sm mt-2">
            Due Date : {tasks.dueDate.toString().split("T")[0]}
          </p>
        </div>
        <div className="mt-2 flex text-white items-center">
          <p
            className={clsx(
              "rounded-[6] text-white",
              tasks.status === "Pending" && "text-yellow-500",
              tasks.status === "Review" && "text-blue-500",
              tasks.status === "Completed" && "text-green-500"
            )}
          >
            Status : {tasks.status}
          </p>
        </div>

        <div className="mt-2 flex text-white items-center">
          <p
            className={clsx(
              " rounded-[6] text-white",
              tasks.priority === "Low" && "text-green-500",
              tasks.priority === "Medium" && "text-orange-500",
              tasks.priority === "High" && "text-red-500"
            )}
          >
            Priority : {tasks.priority}
          </p>
        </div>
      </div>
    </>
  );
};

export default Task;
