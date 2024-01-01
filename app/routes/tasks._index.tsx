import { Toaster } from "react-hot-toast";
import TaskList from "../components/TaskList";

export default function tasks() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <TaskList />
    </div>
  );
}
