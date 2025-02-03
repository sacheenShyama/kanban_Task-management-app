"use client";
import React, { useRef, useState } from "react";
import Task from "../task/task";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { BiSolidUpArrowSquare } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  handleDeleteList,
  handleUpdateList,
} from "@/lib/features/listSlice/slice";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { handleCreateTask } from "@/lib/features/taskSlice/slice";

const List = ({ lists, triggerGetBoardApi }) => {
  const [isEdit, setIsEdit] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.list);

  const [listTitle, setListTitle] = useState(lists.title);

  const showIcon = () => {
    setIsEdit(!isEdit);
  };

  const updateList = async () => {
    try {
      await dispatch(handleUpdateList({ id: lists._id, title: listTitle }));
      toast.success("Board Updated successfully");
      showIcon();
      triggerGetBoardApi();
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteList = async () => {
    try {
      await dispatch(handleDeleteList(lists._id));
      toast.success("Board deleted successfully");
      triggerGetBoardApi();
    } catch (error) {
      toast.error(error || "Error while deleting list");
    }
  };

  const createTask = async () => {
    try {
      await dispatch(
        handleCreateTask({
          title: "your task",
          description: "default description",
          dueDate: new Date().toISOString(),
          priority: "Low",
          status: "Pending",
          listId: lists._id,
        })
      );
      toast.success("Task created successfully");
      triggerGetBoardApi();
    } catch (error) {
      toast.error(error || "Error while creating list");
    }
  };
  return (
    <>
      <div className="cursor-grab rounded-[12] bg-neutral-800 p-4 shadow-sm hover:shadow-md">
        <div className="flex justify-between mb-4 font-bold text-neutral-100">
          <span onClick={showIcon} className="p-0 m-0">
            {isEdit ? (
              <Button>
                <FaEdit />
              </Button>
            ) : (
              <Button onClick={updateList}>
                <BiSolidUpArrowSquare />
              </Button>
            )}
          </span>
          <div className="w-full ml-2">
            {" "}
            {isEdit ? (
              `${listTitle}`
            ) : (
              <input
                ref={inputRef}
                className="pl-[4] bg-neutral-500 rounded outline-none "
                type="text"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && updateList()}
              />
            )}
          </div>
          <div>
            <Button onClick={deleteList}>
              <MdDeleteForever />
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {lists.tasks.map((task) => (
            <Task
              key={task._id}
              task={task}
              triggerGetBoardApi={triggerGetBoardApi}
            />
          ))}
          <Button
            onClick={createTask}
            className="bg-white rounded-[4] hover:bg-green-300"
          >
            ADD TASK +
          </Button>
        </div>
      </div>
    </>
  );
};

export default List;
