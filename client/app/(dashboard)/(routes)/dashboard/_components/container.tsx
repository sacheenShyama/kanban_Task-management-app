"use client";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import Navbar from "./navbar";
import Board from "./board/board";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  handleCreateBoard,
  handleGetBoard,
} from "@/lib/features/boardSlice/slice";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progressBar";
import toast from "react-hot-toast";
const Container = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [trigger, setTrigger] = useState(false);

  const { board, loading, error, message } = useAppSelector(
    (state) => state.board
  );

  const triggerGetBoardApi = () => {
    setTrigger(!trigger);
  };

  useEffect(() => {
    dispatch(handleGetBoard());
  }, [dispatch, router, trigger]);

  const createBoard = async () => {
    try {
      const res = await dispatch(handleCreateBoard("Your Board new"));
      toast.success(res.payload.message);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Fragment>
      {loading && <ProgressBar />}
      <div style={{ width: "100%", height: "100%" }}>
        <Navbar />
        <div className=" flex justify-end py-2">
          <Button
            onClick={createBoard}
            className="bg-white  text-black rounded-[8] hover:bg-gray-400 "
          >
            ADD BOARD +
          </Button>
        </div>
        <div className="p-4">
          <div className="flex gap-8">
            {board &&
              board.map((column: any) => (
                <Board
                  column={column}
                  key={column._id}
                  triggerGetBoardApi={triggerGetBoardApi}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Container;
