import { remember, createDemo, todo, project, account } from './logic.js';

export function dashboard() {
  let content = document.createElement('div');
  let sidebarContainer = document.createElement('div');
  let projects = document.createElement('ul');
  let todosContainer = document.createElement('div');
  let todos = document.createElement('ul');
  let addTodo = document.createElement('button');
  let addProject = document.createElement('button');
  // let { demoAccount, inbox } = createDemo();
  // localStorage.clear();
  let demoAccount = JSON.parse(localStorage.getItem('user'));
  console.log(demoAccount);
  let inbox = demoAccount.projects[0];
  displayTodos(inbox, todos);
  addTodo.innerHTML = 'Add new task';

  addTodo.addEventListener('click', () => {
    todos.removeChild(addTodo);
    let todoInput = document.createElement('input');
    let todoSubmit = document.createElement('button');
    let todoDisplay = document.createElement('li');
    todoSubmit.innerHTML = 'Submit';
    todoSubmit.id = 'submit';
    todoSubmit.addEventListener('click', () => {
      let newTodo = todo(todoInput.value);
      inbox.todos.push(newTodo);
      localStorage.setItem('user', JSON.stringify(demoAccount));
      todoDisplay.innerHTML = newTodo.title;
      todos.append(todoDisplay);
      todos.append(addTodo);
      todos.removeChild(todoInput);
      todos.removeChild(todoSubmit);
      todos.appendChild(addTodo);
    });
    todos.append(todoInput);
    todos.append(todoSubmit);
    todoInput.addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById('submit').click();
      }
    });
  });
  
  addProject.innerHTML = 'Add new project';
  addProject.addEventListener('click', () => {
    projects.removeChild(addProject);
    let projectInput = document.createElement('input');
    let projectSubmit = document.createElement('button');
    let projectDisplay = document.createElement('li');
    projectSubmit.innerHTML = 'Submit';
    projectSubmit.id = 'submit';
    projectSubmit.addEventListener('click', () => {
      let newProject = project(projectInput.value);
      demoAccount.projects.push(newProject);
      localStorage.setItem('user', JSON.stringify(demoAccount));
      projectDisplay.innerHTML = newProject.title;
      projects.append(projectDisplay);
      projects.append(addProject);
      projects.removeChild(projectInput);
      projects.removeChild(projectSubmit);
      projects.appendChild(addProject);
    });
    projects.append(projectInput);
    projects.append(projectSubmit);
    projectInput.addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById('submit').click();
      }
    });
  });

  displayProjects(demoAccount, projects);
  projects.append(addProject);
  todos.append(addTodo);
  todosContainer.append(todos);
  sidebarContainer.append(projects);
  content.className = 'dashboard';
  sidebarContainer.className = 'sidebar';
  todosContainer.className = 'todos';
  content.append(sidebarContainer);
  content.append(todosContainer);
  console.log('final');
  console.log(demoAccount);
  localStorage.setItem('user', JSON.stringify(demoAccount));
  return content;
}

function displayTodos(inbox, todos) {
  for (const todo of inbox.todos) {
    let todoDisplay = document.createElement('li');
    todoDisplay.innerHTML = todo.title;
    todos.append(todoDisplay);
  }
}

function displayProjects(demoAccount, sidebar) {
  for (const project of demoAccount.projects) {
    let projectDisplay = document.createElement('li');
    projectDisplay.innerHTML = project.title;
    sidebar.append(projectDisplay);
  }
}

function addTodo(inbox, todos) {
  let todoDisplay = document.createElement('li');
  let newTodo = todo()
  inbox.addTodo(newTodo);
  todoDisplay.innerHTML = newTodo.title;
  todos.append(todoDisplay);
}
