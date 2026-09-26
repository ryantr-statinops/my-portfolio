import { createRoot } from "react-dom/client";
import ProjectHub from "../../app/components/sections/ProjectHub";
import { fixtureProjects } from "./projects";
import "./styles.css";

const theme = localStorage.getItem("theme") ?? "dark";
document.documentElement.classList.toggle("dark", theme === "dark");
createRoot(document.getElementById("root")!).render(<ProjectHub projects={new URLSearchParams(location.search).has("empty") ? [] : fixtureProjects} />);
