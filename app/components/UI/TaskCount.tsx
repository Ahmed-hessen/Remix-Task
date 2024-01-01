import { useNavigate } from "@remix-run/react";
import { useTaskStore } from "../../store/store";
import { useEffect } from "react";

export default function TaskCount() {
  const tasks = useTaskStore((state) => state.tasks);
  const { initializeFromLocalStorage } = useTaskStore();

  useEffect(() => {
    initializeFromLocalStorage();
  }, [initializeFromLocalStorage]);

  const navigate = useNavigate();

  return (
    <div className="relative cursor-pointer">
      <div className="text-3xl">
        <button onClick={() => navigate("/tasks")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
          >
            <path
              d="M20 2C21.6569 2 23 3.34315 23 5V7H21V19C21 20.6569 19.6569 22 18 22H4C2.34315 22 1 20.6569 1 19V17H17V19C17 19.5128 17.386 19.9355 17.8834 19.9933L18 20C18.5128 20 18.9355 19.614 18.9933 19.1166L19 19V15H3V5C3 3.34315 4.34315 2 6 2H20Z"
              fill="currentColor"
            ></path>
          </svg>
          <span
            className="absolute top-[-10px] right-[-10px] bg-slate-700 text-white
       h-6 w-6 rounded-full
        flex items-center justify-center text-sm"
          >
            {tasks.length}
          </span>
        </button>
      </div>
    </div>
  );
}
