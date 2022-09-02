import {createDemo} from './logic.js';
import {addNewProject, displayProject, switchProject} from './projects.js';
import {addNewTodo, openTodo, displayTodo} from './todos.js';

export function dashboard() {
  let content = document.createElement('div');
  let projectsContainer = document.createElement('div');
  let sidebar = document.createElement('ul');
  let todosContainer = document.createElement('div');
  let todos = document.createElement('ul');

  // let { demoAccount, inbox } = createDemo();
  // let currentProject = inbox;
  // localStorage.clear();

  let demoAccount = JSON.parse(localStorage.getItem('user'));
  console.log(demoAccount);
  let currentProject = demoAccount.projects[0];

  let addProject = addNewProject(sidebar, demoAccount, todos, currentProject);
  projectsContainer.className = 'projects-container';
  sidebar.className = 'projects';
  todosContainer.className = 'todos-container';
  todos.className = 'todos';

  for (const todo of currentProject.todos) {
    displayTodo(todo, todos, demoAccount, currentProject);
  }
  todos.append(addNewTodo(currentProject, todos, demoAccount));
  for (const project of demoAccount.projects) {
    sidebar.append(displayProject(project, sidebar));
  }
  sidebar.append(addProject);
  todosContainer.append(todos);
  projectsContainer.append(sidebar);
  content.className = 'dashboard';
  content.append(projectsContainer);
  content.append(todosContainer);
  localStorage.setItem('user', JSON.stringify(demoAccount));


  for (const element of todos.querySelectorAll('li')) {
    openTodo(element, todos, demoAccount, currentProject);
  }
  let currentProjectIndex = switchProject(sidebar, todos, demoAccount, currentProject);
  currentProject = demoAccount.projects[currentProjectIndex];

  return content;
}
