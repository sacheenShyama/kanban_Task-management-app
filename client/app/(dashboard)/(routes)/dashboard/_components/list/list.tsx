import React, { useState } from "react";
import Task from "../task/task";
const LIST = [
  { id: "1", title: "list1" },
  { id: "2", title: "list2" },
];
const List = () => {
  // console.log("chekkkk", list);
  const [list, setList] = useState(LIST);
  return (
    <>
      {list.map((li) => (
        <div
          key={li.id}
          className="cursor-grab rounded-[12] bg-neutral-800 p-4 shadow-sm hover:shadow-md"
        >
          <h3 className="font-semibold text-neutral-100">{li.title}</h3>
          <div className="flex flex-1 flex-col gap-4">
            <Task />
          </div>
        </div>
      ))}
    </>
  );
};

export default List;
