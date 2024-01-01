import { json, LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useTaskStore } from "../store/store";
import TaskDetail from "../components/TaskDetails";
import { Outlet } from "@remix-run/react";

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const taskId = params?.id && parseInt(params.id, 10);

  // Check if taskId is undefined before using it
  if (taskId === undefined) {
    return json({ error: "Invalid task ID" }, { status: 400 });
  }

  const task = useTaskStore.getState().tasks.find((t) => t.id === taskId);

  if (!task) {
    return json({ error: "Task not found" }, { status: 404 });
  }

  return json({ task });
};

export default function TheTaskDetail() {
  return (
    <div>
      <TaskDetail />
      <Outlet />
    </div>
  );
}
