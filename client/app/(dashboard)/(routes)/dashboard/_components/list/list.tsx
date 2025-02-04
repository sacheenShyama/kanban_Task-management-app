"use client";
import React, { useRef, useState } from "react";
import {

  useDraggable,
} from "@dnd-kit/core";

import Task from "../task/task";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { BiSolidUpArrowSquare } from "react-icons/bi";
import { useAppDispatch } from "@/lib/hooks";
import {
  handleDeleteList,
  handleUpdateList,
} from "@/lib/features/listSlice/slice";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { handleCreateTask } from "@/lib/features/taskSlice/slice";
import { FaDiceSix } from "react-icons/fa6";
import { listInterface } from "@/interface/interface";

import { CSS } from "@dnd-kit/utilities";

interface listProp {
  lists: listInterface;
  triggerGetBoardApi: () => void;
}

const List: React.FC<listProp> = ({ lists, triggerGetBoardApi }) => {
  const [isEdit, setIsEdit] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [listTitle, setListTitle] = useState(lists.title);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: lists._id,
    data: { currentBoardId: lists.boardId },
  });
 
  const showIcon = () => {
    setIsEdit(!isEdit);
  };

  const style = {
    transform: CSS.Translate.toString(transform),

  };

  const updateList = async () => {
    try {
      await dispatch(handleUpdateList({ id: lists._id, title: listTitle }));
      toast.success("List Updated successfully");
      showIcon();
      triggerGetBoardApi();
    } catch (error) {
      toast.error(error);
    }
  };

  const deleteList = async () => {
    try {
      await dispatch(handleDeleteList(lists._id));
      toast.success("List deleted successfully");
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
      <div
        ref={setNodeRef}
        style={style}
        className=" rounded-[12] bg-neutral-800 p-4 shadow-sm hover:shadow-md"
      >
        <div className="flex justify-end mb-[6]">
          <div {...listeners} {...attributes} className="cursor-grab">
            <FaDiceSix color="white" />
          </div>
        </div>
        <div className="flex justify-between mb-4 font-bold text-neutral-100">
          <div onClick={showIcon} className="p-0 m-0">
            {isEdit ? (
              <div className=" cursor-pointer rounded">
                <FaEdit size={20} color="white" />
              </div>
            ) : (
              <div onClick={updateList} className=" cursor-pointer rounded">
                <BiSolidUpArrowSquare
                  size={20}
                  color={"rgb(234 114 8 / 81%)"}
                />
              </div>
            )}
          </div>
          <div className="w-full ml-2">
            {isEdit ? (
              <span className="pl-[4] bg-neutral-800 rounded ">
                {listTitle}
              </span>
            ) : (
              <input
                ref={inputRef}
                className="pl-[1] bg-neutral-500 rounded outline-none "
                type="text"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && updateList()}
              />
            )}
          </div>
          <div>
            <div className="cursor-pointer rounded" onClick={deleteList}>
              <MdDeleteForever size={24} color="rgb(239 68 68)" />
            </div>
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
            onClick={(e) => {
              e.stopPropagation();
              createTask();
            }}
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
