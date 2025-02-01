"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import List from "../list/list";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleGetBoard } from "@/lib/features/boardSlice/slice";
import { useRouter } from "next/navigation";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

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
  {
    id: "3",
    title: "API Integration",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
];
const Board = () => {
  const router=useRouter()
  const dispatch =useAppDispatch()
  const {board}=useAppSelector((state)=>state.board);
  
  useEffect(()=>{
    dispatch(handleGetBoard())
  },[router,dispatch])
  
  console.log("boardcard",board)
  return (
    <div>
      <div className=" flex justify-end py-2">
        {" "}
        <Button className="bg-gray-800 text-white rounded-[8] hover:bg-gray-400 ">
          Add Board +
        </Button>{" "}
      </div>
      {/* <div className="flex justify-evenly">
        {board.map((i) => (
          <div
            key={i.id}
            className="flex w-80 flex-col rounded-[12] bg-neutral-900 p-4"
          >
            <div className="mb-4 font-bold text-neutral-100">{i.title}</div>
            <div className="flex flex-1 flex-col gap-4">
              <List />
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Board;
