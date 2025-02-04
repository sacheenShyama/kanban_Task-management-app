"use client";

import React from "react";
import Modal from "./_components/modal";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/hooks";
import { handleDeleteTask } from "@/lib/features/taskSlice/slice";
import clsx from "clsx";
import { taskInterface } from "@/interface/interface";

interface TaskProp {
  task: taskInterface;
  triggerGetBoardApi: () => void;
}
const Task: React.FC<TaskProp> = ({ task, triggerGetBoardApi }) => {
  const dispatch = useAppDispatch();

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
            <h3 className="font-bold text-neutral-100">{task.title}</h3>
          </div>
          <div>
            <div className="cursor-pointer rounded" onClick={deleteTask}>
              <MdDeleteForever size={20} color="rgb(239 68 68)" />
            </div>
          </div>
        </div>
        <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
        <div>
          <p className="text-white text-sm mt-2">
            Due Date : {task.dueDate.toString().split("T")[0]}
          </p>
        </div>
        <div className="mt-2 flex  justify-between">
          <p
            className={clsx(
              "rounded-[6] text-sm",
              task.status === "Pending" && "text-yellow-500",
              task.status === "Review" && "text-blue-500",
              task.status === "Completed" && "text-green-500"
            )}
          >
            Status : {task.status}
          </p>
          <p className="text-white">|</p>
          <p
            className={clsx(
              "rounded-[6] text-sm",
              task.priority === "Low" && "text-green-500",
              task.priority === "Medium" && "text-orange-500",
              task.priority === "High" && "text-red-500"
            )}
          >
            Priority : {task.priority}
          </p>
        </div>

        <div className="mt-2 flex  items-center"></div>
      </div>
    </>
  );
};

export default Task;
