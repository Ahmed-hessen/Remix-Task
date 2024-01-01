import { Link } from "@remix-run/react";
import Container from "./Container";
import TaskCount from "./TaskCount";

export default function NavBar() {
  return (
    <header>
      <nav className="sticky top-0 bg-slate-200 z-30 shadow-sm ">
        <div className="py-4 border-b-[1px]">
          <Container>
            <div className="flex justify-between items-center gap-3 md-gap-0">
              <Link to="/">
                <span className="text-xl font-semibold">Task Manager</span>
              </Link>

              <Link to="/tasks">
                <TaskCount />
              </Link>
            </div>
          </Container>{" "}
        </div>
      </nav>
    </header>
  );
}
