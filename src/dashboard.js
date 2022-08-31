import {addNewProject, displayProjects, switchProject} from './projects.js';
import {displayTodos, addNewTodo, openTodo, displayTodo} from './todos.js';

export function dashboard() {
  let content = document.createElement('div');
  let projectsContainer = document.createElement('div');
  let projects = document.createElement('ul');
  let todosContainer = document.createElement('div');
  let todos = document.createElement('ul');

  // let { demoAccount, inbox } = createDemo();
  // let currentProject = inbox;
  // localStorage.clear();

  let demoAccount = JSON.parse(localStorage.getItem('user'));
  let currentProject = demoAccount.projects[0];

  console.log(demoAccount);
  let addProject = addNewProject(projects, demoAccount, todos, currentProject);
  projectsContainer.className = 'projects-container';
  projects.className = 'projects';
  todosContainer.className = 'todos-container';
  todos.className = 'todos';

  for (const todo of currentProject.todos) {
    displayTodo(todo, todos, demoAccount, currentProject);
  }
  todos.append(addNewTodo(currentProject, todos, demoAccount));
  displayProjects(demoAccount, projects);
  projects.append(addProject);
  todosContainer.append(todos);
  projectsContainer.append(projects);
  content.className = 'dashboard';
  content.append(projectsContainer);
  content.append(todosContainer);
  localStorage.setItem('user', JSON.stringify(demoAccount));


  for (const element of todos.querySelectorAll('li')) {
    openTodo(element, todos, demoAccount, currentProject);
  }
  let currentProjectIndex = switchProject(projects, todos, demoAccount, currentProject);
  currentProject = demoAccount.projects[currentProjectIndex];

  return content;
}
