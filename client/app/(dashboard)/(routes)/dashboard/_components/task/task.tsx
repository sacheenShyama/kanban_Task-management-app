"use client";

import React, { useState } from "react";
import Modal from "./_components/modal";
import { Button } from "@/components/ui/button";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/hooks";
import { handleDeleteTask } from "@/lib/features/taskSlice/slice";
import clsx from "clsx";

const Task = ({ task, triggerGetBoardApi }) => {
  const dispatch = useAppDispatch();
  const [tasks, setTasks] = useState(task);
  const deleteList = async () => {
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
      <div className="cursor-grab rounded-[12] bg-neutral-700 p-4 shadow-[2] hover:shadow-[6]">
        <div className="flex justify-between mb-4 font-bold text-neutral-100">
          <span className="p-0 m-0">
            <Modal task={task} triggerGetBoardApi={triggerGetBoardApi} />
          </span>
          <div className="w-full ml-2">
            <h3 className="font-bold text-neutral-100">{tasks.title}</h3>
          </div>
          <div>
            <Button onClick={deleteList}>
              <MdDeleteForever />
            </Button>
          </div>
        </div>
        <p className="mt-2 text-sm text-neutral-400">{tasks.description}</p>
        <div>
          <p className="text-white text-sm mt-2">
            Due Date : {tasks.dueDate.toString().split("T")[0]}
          </p>
        </div>
        <div className="mt-2 flex text-white items-center gap-2">
          <p className="text-sm">Status :</p>
          <span
            className={clsx(
              "p-1 rounded-[6] text-white",
              tasks.status === "Pending" && "bg-yellow-500",
              tasks.status === "Review" && "bg-blue-500",
              tasks.status === "Completed" && "bg-green-500"
            )}
          >
            {tasks.status}
          </span>
        </div>

        <div className="mt-2 flex text-white items-center gap-2">
          <p className="text-sm">Priority :</p>
          <span
            className={clsx(
              "p-1 rounded-[6] text-white",
              tasks.priority === "Low" && "bg-green-500",
              tasks.priority === "Medium" && "bg-orange-500",
              tasks.priority === "High" && "bg-red-500"
            )}
          >
            {tasks.priority}
          </span>
        </div>
      </div>
    </>
  );
};

export default Task;
