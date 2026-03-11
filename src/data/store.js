// In-memory "database"

let projects = [
  {
    id: 1,
    name: "Portfolio Website",
    description: "My first Hono API project",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    name: "Task Manager",
    description: "Manage tasks with API",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

let nextProjectId = 3

// Get all projects
export function listProjects() {
  return projects
}

// Get project by id
export function getProjectById(id) {
  return projects.find(p => p.id === id)
}

// Create project
export function createProject(name, description) {
  const project = {
    id: nextProjectId++,
    name,
    description,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  projects.push(project)
  return project
}