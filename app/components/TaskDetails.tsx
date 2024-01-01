import { useNavigate, useParams } from "@remix-run/react";
import { useTaskStore } from "../store/store";
import toast, { Toaster } from "react-hot-toast";
import Container from "./UI/Container";
import Button from "./UI/Button";

interface Task {
  id: number;
  title: string;
  description: string;
}

const TaskDetail = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const taskId = id ? parseInt(id, 10) : undefined;
  const task = useTaskStore((state) =>
    taskId !== undefined ? state.tasks.find((t) => t.id === taskId) : undefined
  );
  const deleteTask = useTaskStore((state) => state.deleteTask);

  if (!task) {
    return (
      <div className="text-center mt-10 font-semibold text-3xl text-red-700">
        Task not found
      </div>
    );
  }

  const handleDeleteTask = () => {
    if (taskId !== undefined) {
      deleteTask(taskId);
      updateLocalStorage(taskId);
      toast.success("Task is deleted", {
        duration: 3000,
      });
      navigate("/tasks");
    }
  };

  const handleEditTask = () => {
    if (taskId !== undefined) {
      // Navigate to the edit page after closing the current page
      navigate(`/tasks/${task.id}/edit`);
    }
  };

  const handleCancel = () => {
    if (taskId !== undefined) {
      navigate(`/tasks`);
    }
  };

  // Function to update local storage after deleting a task
  const updateLocalStorage = (taskId: number) => {
    const storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    const updatedTasks = tasks.filter((t: Task) => t.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-md mt-10 flex flex-col  mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">{`Title : ${task.title}`}</h2>
        <p className="text-gray-700 font-semibold mb-7 overflow-hidden break-all">
          {`Description : ${task.description}`}
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-3 ">
          <Button label="Edit" custom onClick={handleEditTask} />
          <Button label="Delete" onClick={handleDeleteTask} />
          <Button label="cancel" custom cancel onClick={handleCancel} />
        </div>
      </div>
    </Container>
  );
};

export default TaskDetail;
