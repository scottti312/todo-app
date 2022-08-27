import { createDemo, todo, project, account } from './logic.js';

export function dashboard() {
  let content = document.createElement('div');
  let sidebarContainer = document.createElement('div');
  let sidebar = document.createElement('ul');
  let todosContainer = document.createElement('div');
  let todos = document.createElement('ul');
  let todo1 = todo();
  let { demoAccount, inbox } = createDemo();
  for (const todo of inbox.todos) {
    let todoDisplay = document.createElement('li');
    todoDisplay.innerHTML = todo.title;
    todos.append(todoDisplay);
  }
  for (const project of demoAccount.projects) {
    let projectDisplay = document.createElement('li');
    projectDisplay.innerHTML = project.title;
    sidebar.append(projectDisplay);
  }
  todosContainer.append(todos);
  sidebarContainer.append(sidebar);
  content.className = 'dashboard';
  sidebarContainer.className = 'sidebar';
  todosContainer.className = 'todos';
  content.append(sidebarContainer);
  content.append(todosContainer);

  return content;
}

