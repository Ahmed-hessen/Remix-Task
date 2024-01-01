import AddTaskForm from "../components/AddTaskForm";

export const meta = () => {
  return [
    { title: "Task Manager" },
    { name: "description", content: "Welcome to my task manager" },
  ];
};

const AppRoutes: React.FC = () => {
  return (
    <div>
      <AddTaskForm />
    </div>
  );
};

export default AppRoutes;
