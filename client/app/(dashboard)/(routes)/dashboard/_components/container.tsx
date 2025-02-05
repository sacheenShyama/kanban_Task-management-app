"use client";
import React, { useEffect, useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import Board from "./board/board";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  handleCreateBoard,
  handleGetBoard,
} from "@/lib/features/boardSlice/slice";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progressBar";
import { FaPlus } from "react-icons/fa6";
import toast from "react-hot-toast";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { handleListDragDrop } from "@/lib/features/listSlice/slice";

const Container: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [trigger, setTrigger] = useState(false);

  const { board, loading } = useAppSelector((state) => state.board);
  const triggerGetBoardApi = () => {
    setTrigger(!trigger);
  };

  useEffect(() => {
    dispatch(handleGetBoard());
  }, [dispatch, trigger]);

  const createBoard = async () => {
    try {
      const res = await dispatch(handleCreateBoard("Board title"));
      toast.success(res.payload.message);
    } catch (error) {
      toast.error(error);
    }
  };
  const dragEnd = async (e: DragEndEvent) => {
    const id = e.active.id as string;
    const targetBoardId = e.over?.id as string;
    const currentBoardId = e.active.data.current?.currentBoardId;

    if (
      e.over === null ||
      targetBoardId === null ||
      targetBoardId === currentBoardId
    ) {
      return;
    }
    try {
      await dispatch(
        handleListDragDrop({ id, targetBoardId, currentBoardId })
      ).unwrap();
      toast.success("List moved successfully");
      triggerGetBoardApi();
    } catch (error) {
      toast.error(error);
    }
  };
  const logOut = () => {
    localStorage.removeItem("kanbanToken");
    router.push("/sign-in");
  };
  return (
    <div className="overflow-y-auto">
      {loading && <ProgressBar />}
      <div className="">
        <div className="flex flex-wrap gap-8  justify-around mt-6">
          <div className="cursor-pointer" onClick={logOut}>
            <RiLogoutCircleLine color="white" size={30} />
          </div>
          <div>
            <p className="text-white">
              Welcome to KanBan board, Now you can manage your task at ease
            </p>
          </div>
          <Button
            onClick={createBoard}
            className="bg-white  text-black rounded-[8] hover:bg-gray-400 "
          >
            ADD BOARD <FaPlus />
          </Button>
        </div>
        <div className="p-3 mt-6">
          <DndContext collisionDetection={closestCorners} onDragEnd={dragEnd}>
            <div className="flex flex-wrap gap-8 justify-center">
              {board &&
                board.map((column) => (
                  <Board
                    column={column}
                    key={column._id}
                    triggerGetBoardApi={triggerGetBoardApi}
                  />
                ))}
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default Container;
