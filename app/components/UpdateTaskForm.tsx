import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import { useTaskStore } from "../store/store";
import toast from "react-hot-toast";
import Container from "./UI/Container";
import Button from "./UI/Button";

interface Task {
  id: number;
  title: string;
  description: string;
}

interface UpdateTaskFormProps {}

const UpdateTaskForm: React.FC<UpdateTaskFormProps> = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const taskStore = useTaskStore();
  const task = taskStore.tasks.find((t) => t.id === Number(id));

  const updateTask = taskStore.updateTask;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (task) {
      const updatedTask = { id: task.id, title, description };
      // Check if anything has changed
      const hasChanged =
        updatedTask.title !== task.title ||
        updatedTask.description !== task.description;
      if (hasChanged) {
        updateTask(task.id, updatedTask);

        // Access localStorage only on the client side
        if (typeof window !== "undefined") {
          updateLocalStorage(task.id, updatedTask);
        }
        toast.success("Task is updated");
      }
      navigate(`/tasks`);
    }
  };

  // Function to update local storage
  const updateLocalStorage = (taskId: number, updatedTask: Task) => {
    const storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    const updatedTasks = tasks.map((t: Task) =>
      t.id === taskId ? { ...t, ...updatedTask } : t
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    // Reset form fields based on task's current values
    setTitle(task?.title || "");
    setDescription(task?.description || "");
  }, [task]);

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-5"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Update Task</h1>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <label>
            <span className="block mb-2 text-gray-700">Title:</span>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            <span className="block mb-2 text-gray-700">Description:</span>
            <textarea
              className="w-full min-h-[60px] max-h-[200px] px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 word-wrap break-word"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col gap-2 md:gap-4 md:flex-row justify-center mt-6">
          <Button
            label="Update Task"
            custom
            type="submit"
            onClick={handleSubmit}
          />
          <Button
            label="Cancel"
            custom
            cancel
            onClick={() => navigate(`/tasks/${id}`)}
          />
        </div>
      </form>
    </Container>
  );
};

export default UpdateTaskForm;
