"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import List from "../list/list";
import { useAppDispatch } from "@/lib/hooks";
import {
  handleDeleteBoard,
  handleUpdateBoard,
} from "@/lib/features/boardSlice/slice";
import { handleCreateList } from "@/lib/features/listSlice/slice";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidUpArrowSquare } from "react-icons/bi";
import toast from "react-hot-toast";
import { boardInterface, listInterface } from "@/interface/interface";

interface boardProps {
  column: boardInterface;
  triggerGetBoardApi: () => void;
}
const Board: React.FC<boardProps> = ({ column, triggerGetBoardApi }) => {
  const [boardTitle, setBoardTitle] = useState(column.title);
  const [isEdit, setIsEdit] = useState(true);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setNodeRef } = useDroppable({
    id: column._id,
  });

  const showIcon = () => {
    setIsEdit(!isEdit);
  };
  const deleteBoard = async () => {
    try {
      await dispatch(handleDeleteBoard(column._id));
      toast.success("Board deleted successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
    }
  }, [isEdit]);
  const updateBoard = async () => {
    try {
      await dispatch(handleUpdateBoard({ id: column._id, title: boardTitle }));
      toast.success("Board Updated successfully");
      showIcon();
    } catch (error) {
      toast.error(error);
    }
  };
  const createList = async () => {
    try {
      await dispatch(
        handleCreateList({ boardId: column._id, title: "<- change list title" })
      );
      toast.success("List created successfully");
      triggerGetBoardApi();
    } catch (error) {
      toast.error(error || "Error while creating list");
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="flex w-80 h-fit flex-col rounded-[12] bg-neutral-900 p-4"
    >
      <div className="flex justify-between mb-4 font-bold text-neutral-100">
        <div onClick={showIcon} className="p-0 m-0">
          {isEdit ? (
            <div className=" cursor-pointer rounded">
              <FaEdit size={25} color="white" />
            </div>
          ) : (
            <div onClick={updateBoard} className=" cursor-pointer rounded">
              <BiSolidUpArrowSquare size={25} color={"rgb(234 114 8 / 81%)"} />
            </div>
          )}
        </div>
        <div className="w-full ml-2">
          {isEdit ? (
            <span className="pl-[4] bg-neutral-900 rounded ">{boardTitle}</span>
          ) : (
            <input
              ref={inputRef}
              className="pl-[4] bg-neutral-700 rounded outline-none "
              type="text"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && updateBoard()}
            />
          )}
        </div>
        <div>
          <div className="cursor-pointer rounded" onClick={deleteBoard}>
            <MdDeleteForever size={25} color="rgb(239 68 68)" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        {column.lists.map((list: listInterface) => (
          <List
            key={list._id}
            lists={list}
            triggerGetBoardApi={triggerGetBoardApi}
          />
        ))}
        <Button
          onClick={createList}
          className="bg-white rounded-[4] hover:bg-green-300"
        >
          ADD LIST +
        </Button>
      </div>
    </div>
  );
};

export default Board;
