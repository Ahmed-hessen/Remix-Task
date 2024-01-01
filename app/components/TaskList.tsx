import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "@remix-run/react";
import { useTaskStore } from "../store/store";
import Container from "./UI/Container";
import Heading from "./UI/Heading";

const TaskList: React.FC = () => {
  const taskList = useTaskStore((state) => state.tasks);
  const customSet = useTaskStore((state) => state.customSet);
  const sortTasksByTitle = useTaskStore((state) => state.sortTasksByTitle);
  const sortOrder = useTaskStore((state) => state.sortOrder);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Hydrate the store with data from localStorage
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      customSet({ tasks: parsedTasks });
    }
  }, [customSet]);
  const { initializeFromLocalStorage } = useTaskStore();

  useEffect(() => {
    // Initialize state from local storage when the component mounts on the client
    initializeFromLocalStorage();
  }, [initializeFromLocalStorage]);

  // Function to filter tasks based on search term
  const filteredTasks = taskList.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <Heading title="My Tasks" center />
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mb-8">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onFocus={() => navigate("/tasks")}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-4"
            />

            {/* Select input for sorting */}
            <select
              onFocus={() => navigate("/tasks")}
              onChange={(e) =>
                sortTasksByTitle(e.target.value as "asc" | "desc")
              }
              value={sortOrder}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 mb-4"
            >
              <option value="asc">Sort A-Z</option>
              <option value="desc">Sort Z-A</option>
            </select>
          </div>
          {taskList.length === 0 && (
            <div className="text-center text-red-500 font-semibold text-xl">
              {" "}
              <Link className="flex justify-center items-center" to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="30"
                  height="30"
                >
                  <path
                    d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <p>There is no tasks go and add ones</p>
              </Link>
            </div>
          )}
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredTasks.length !== 0 &&
              filteredTasks.map((task) => (
                <li
                  key={`${task.id} ${task.title} `}
                  className="bg-white rounded-md shadow-md p-4"
                >
                  <Link to={`/tasks/${task.id}`}>
                    <h2 className="text-blue-500 font-semibold hover:underline">
                      {task.title}
                    </h2>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default TaskList;
