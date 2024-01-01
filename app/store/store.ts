import { create } from "zustand";

interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskStore {
  tasks: Task[];
  idCounter: number;
  customSet: (newState: { tasks?: Task[]; idCounter?: number }) => {
    tasks: Task[];
    idCounter: number;
  };
  initializeFromLocalStorage: () => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
  searchTasksByTitle: (searchTerm: string) => Task[];
  sortTasksByTitle: (order: "asc" | "desc") => void;
  sortOrder: "asc" | "desc";
}

export const useTaskStore = create<TaskStore>((set, getState) => ({
  tasks: [],
  idCounter: 1,
  customSet: (newState) => {
    set((state) => ({
      tasks: newState.tasks ?? state.tasks,
      idCounter: newState.idCounter ?? state.idCounter,
    }));
    localStorage.setItem(
      "tasks",
      JSON.stringify(newState.tasks ?? getState().tasks)
    );
    return newState as { tasks: Task[]; idCounter: number };
  },
  initializeFromLocalStorage: () => {
    const storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    set({ tasks });
  },
  addTask: (task) =>
    set((state) => ({
      // tasks: [...state.tasks, task],
      tasks: [...state.tasks, task],
      idCounter: state.idCounter + 1,
    })),
  updateTask: (taskId, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  searchTasksByTitle: (searchTerm) => {
    const { tasks } = getState();
    const filteredTasks = tasks.filter((task: Task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredTasks;
  },
  sortTasksByTitle: (order) =>
    set((state) => ({
      tasks: [...state.tasks].sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return order === "asc"
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      }),
      sortOrder: order,
    })),
  sortOrder: "asc",
}));
