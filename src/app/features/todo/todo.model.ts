export interface Todo {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
}

export interface CreateEditTodo {
  id?: string;
  action: string;
  title: string;
  description: string;
  date: Date;
}
