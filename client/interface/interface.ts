export interface boardInterface {
  _id: string;
  title: string;
  lists: listInterface;
  userId: string;
}

export interface listInterface {
  _id: string;
  title: string;
  boardId: string;
  tasks: taskInterface;
}

export interface taskInterface {
  _id: string;
  title: string;
  description: string;
  dueDate: Date | string | number;
  priority: string;
  status: string;
  listId: string;
}
