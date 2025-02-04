"use client";
import React, { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEdit } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/lib/hooks";
import { handleUpdateTask } from "@/lib/features/taskSlice/slice";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { taskInterface } from "@/interface/interface";
interface modalProp {
  task: taskInterface;
  triggerGetBoardApi: () => void;
}
const Modal: React.FC<modalProp> = ({ task, triggerGetBoardApi }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        handleUpdateTask({
          title,
          description,
          dueDate,
          status,
          priority,
          id: task._id,
          listId: task.listId,
        })
      );
      toast.success("Task updated successfully");
      triggerGetBoardApi();
      router.refresh();
    } catch (error) {
      toast.error(error || "Error updating task");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className=" cursor-pointer rounded">
          <FaEdit size={19} color="white" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-max bg-neutral-950 border-none">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Task</DialogTitle>
          <DialogDescription className="text-white">
            Make changes to your task here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid w-full max-w-sm items-start gap-1.5">
              <Label htmlFor="title" className="text-start text-white">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3 text-white outline-none border-none rounded-[4] bg-neutral-700"
              />
            </div>
            <div className="grid w-full max-w-sm items-start gap-1.5">
              <Label htmlFor="description" className="text-start text-white">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3 text-white border-none outline-none rounded-[4] bg-neutral-700"
              />
            </div>
            <div className="grid w-full max-w-sm items-start gap-1.5">
              <Label htmlFor="dueDate" className="text-start text-white">
                Due-Date
              </Label>
              <Input
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                type="date"
                className="col-span-3 text-white border-none outline-none rounded-[4] bg-neutral-700"
              />
            </div>
            <div className="grid w-full max-w-sm items-start gap-1.5">
              <Label htmlFor="status" className="text-start text-white">
                Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[180px] text-white border-none outline-none bg-neutral-700">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-black border-none">
                  <SelectItem
                    value="Pending"
                    className="text-white data-[state=checked]:text-black data-[state=checked]:bg-white"
                  >
                    Pending
                  </SelectItem>
                  <SelectItem
                    value="Review"
                    className="text-white data-[state=checked]:text-black data-[state=checked]:bg-white"
                  >
                    Review
                  </SelectItem>
                  <SelectItem
                    value="Completed"
                    className="text-white data-[state=checked]:text-black data-[state=checked]:bg-white"
                  >
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-start gap-1.5">
              <Label htmlFor="priority" className="text-start text-white">
                Priority
              </Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-[180px] text-white border-none outline-none bg-neutral-700">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent className="bg-black border-none">
                  <SelectItem
                    value="Low"
                    className="text-white data-[state=checked]:text-black data-[state=checked]:bg-white"
                  >
                    Low
                  </SelectItem>
                  <SelectItem
                    value="Medium"
                    className="text-white data-[state=checked]:text-black data-[state=checked]:bg-white"
                  >
                    Medium
                  </SelectItem>
                  <SelectItem
                    value="High"
                    className="text-white data-[state=checked]:text-black data-[state=checked]:bg-white"
                  >
                    High
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                className="text-black bg-white hover:bg-neutral-400"
              >
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
