import React, { useState } from "react";
import Task from "../task/task";

const List = ({ lists }) => {
  const [list, setList] = useState(lists);
  return (
    <>
      <div className="cursor-grab rounded-[12] bg-neutral-800 p-4 shadow-sm hover:shadow-md">
        <h3 className="font-semibold text-neutral-100">{list.title}</h3>
        <div className="flex flex-1 flex-col gap-4">
          {list.tasks &&
            list.tasks.map((task) => <Task key={task._id} task={task} />)}
        </div>
      </div>
    </>
  );
};

export default List;
