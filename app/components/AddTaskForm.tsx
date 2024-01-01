import { useEffect, useState } from "react";
import { useTaskStore } from "../store/store";
import { useNavigate } from "@remix-run/react";
import toast, { Toaster } from "react-hot-toast";
import Container from "./UI/Container";
import Button from "./UI/Button";
import Heading from "./UI/Heading";

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function AddTaskForm() {
  const addTask = useTaskStore((state) => state.addTask);
  const tasks = useTaskStore((state) => state.tasks);
  const { idCounter } = useTaskStore.getState();

  console.log(tasks.length);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { initializeFromLocalStorage } = useTaskStore();

  useEffect(() => {
    // Initialize state from local storage when the component mounts on the client
    initializeFromLocalStorage();
  }, [initializeFromLocalStorage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = { id: idCounter, title, description };
    // Update the state and local storage
    addTask(newTask);
    updateLocalStorage(newTask);
    setTitle("");
    setDescription("");
    toast.success("Task is added", {
      duration: 3000,
    });
  };

  // Function to update local storage
  const updateLocalStorage = (newTask: Task) => {
    const storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    console.log("stored tasked : ", storedTasks, tasks);

    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
  };

  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />

      <form
        onSubmit={handleSubmit}
        className="max-w-md my-28 mx-auto p-6 bg-white rounded-md shadow-lg"
      >
        <div className="mb-6 text-center">
          <Heading title="Add Task" center />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <label>
            <span className="block mb-2 text-gray-700 tracking-wider ">
              Title
            </span>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <span className="block mb-2 text-gray-700 tracking-wider ">
              Description
            </span>
            <textarea
              className="w-full min-h-[60px] max-h-fit text-left overflow-y-auto px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="flex justify-center items-center gap-3 mt-6">
          <Button
            label="Add Task"
            custom
            onClick={() => handleSubmit}
            type="submit"
          />
          <Button
            custom
            label="View Tasks"
            onClick={() => navigate("/tasks")}
          />
        </div>
      </form>
    </Container>
  );
}
