"use client";
import { Button } from "@/components/ui/button";
import React, { Fragment, useEffect, useRef, useState } from "react";
import List from "../list/list";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  handleDeleteBoard,
  handleGetBoard,
  handleUpdateBoard,
} from "@/lib/features/boardSlice/slice";
import { handleCreateList } from "@/lib/features/listSlice/slice";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidUpArrowSquare } from "react-icons/bi";
import toast from "react-hot-toast";
import Loading from "@/components/icons/loading";

const Board = ({ column, triggerGetBoardApi }) => {
  const [boardTitle, setBoardTitle] = useState(column.title);
  const [isEdit, setIsEdit] = useState(true);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const { loading, error } = useAppSelector((state) => state.board);

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
        handleCreateList({ boardId: column._id, title: "Last blood" })
      );
      toast.success("List created successfully");
      triggerGetBoardApi();
    } catch (error) {
      toast.error("Error while creating list");
    }
  };
  return (
    <div className="flex w-80 flex-col rounded-[12] bg-neutral-900 p-4">
      {/* {true && <Loading />} */}
      <div className="flex justify-between mb-4 font-bold text-neutral-100">
        <span onClick={showIcon} className="p-0 m-0">
          {isEdit ? (
            <Button>
              <FaEdit />
            </Button>
          ) : (
            <Button onClick={updateBoard}>
              <BiSolidUpArrowSquare />
            </Button>
          )}
        </span>
        <div className="w-full ml-2">
          {" "}
          {isEdit ? (
            `${boardTitle}`
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
          <span onClick={deleteBoard}>
            <MdDeleteForever />
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        {column.lists.map((list: any) => (
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
