import { remember, createDemo, todo, project, account } from './logic.js';

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
  let addProject = addNewProject(projects, demoAccount, todos, currentProject);
  projectsContainer.className = 'projects-container';
  projects.className = 'projects';
  todosContainer.className = 'todos-container';
  todos.className = 'todos';

  displayTodos(currentProject, todos, demoAccount);
  displayProjects(demoAccount, projects);
  projects.append(addProject);
  todosContainer.append(todos);
  projectsContainer.append(projects);
  content.className = 'dashboard';
  content.append(projectsContainer);
  content.append(todosContainer);
  localStorage.setItem('user', JSON.stringify(demoAccount));


  openTodo(todos, demoAccount, currentProject);
  let currentProjectIndex = switchProject(projects, todos, demoAccount, currentProject);
  currentProject = demoAccount.projects[currentProjectIndex];

  return content;
}

function displayTodos(currentProject, todos, currentAccount) {
  for (const todo of currentProject.todos) {
    let todoDisplay = document.createElement('li');
    todoDisplay.innerHTML = todo.title;
    todos.append(todoDisplay);
  }
  todos.append(addNewTodo(currentProject, todos, currentAccount))
}

function displayProjects(currentAccount, sidebar) {
  for (const project of currentAccount.projects) {
    let projectDisplay = document.createElement('li');
    projectDisplay.innerHTML = project.title;
    sidebar.append(projectDisplay);
  }
}

function addNewTodo(currentProject, todos, currentAccount) {
  let addTodo = document.createElement('button');
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
      currentProject.todos.push(newTodo);
      localStorage.setItem('user', JSON.stringify(currentAccount));
      todoDisplay.innerHTML = newTodo.title;
      todos.append(todoDisplay);
      todos.append(addTodo);
      todos.removeChild(todoInput);
      todos.removeChild(todoSubmit);
      todos.appendChild(addTodo);
      openTodo(todos, currentAccount, currentProject);
    });
    todos.append(todoInput);
    todos.append(todoSubmit);
    todoInput.addEventListener('keypress', function(event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementById('submit').click();
      }
    });
  })
  return addTodo;
}

function addNewProject(projects, demoAccount, todos, currentProject) {
  let addProject = document.createElement('button');
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

      switchProject(projects, todos, demoAccount, currentProject);
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
  return addProject;
}

function switchProject(projects, todos, currentAccount) {
  // Click on projects to switch currentProject
  var projectNodes = Array.from(projects.children);
  for (const element of projects.querySelectorAll('li')) {
    element.addEventListener('click', function(e) {
      let index = projectNodes.indexOf(e.target);
      while(todos.firstChild) {
        todos.removeChild(todos.firstChild);
      }
      let currentProject = currentAccount.projects[index];
      displayTodos(currentProject, todos, currentAccount);
      openTodo(todos, currentAccount, currentProject);
      return index;
    });
  }

}

function openTodo(todos, currentAccount, currentProject) {
  var nodes = Array.from(todos.children);
  // Click on todos to see description
  for (const element of todos.querySelectorAll('li')) {
    element.addEventListener('click', function(e) {
      todos.removeChild(element);
      let title = document.createElement('div'); 
      let index = nodes.indexOf(e.target);
      let todoSection = document.createElement('div');
      let description = document.createElement('div');
      let doneButton = document.createElement('button');
      let removeButton = document.createElement('button');
      todoSection.className = 'todo-section';
      title.innerText = element.innerText;
      description.innerText = 'Description: ' + currentAccount.projects[0].todos[index].description;
      todoSection.appendChild(title);
      todoSection.appendChild(description);
      todoSection.appendChild(removeButton);
      todoSection.appendChild(doneButton);
      removeButton.innerText = 'Remove';
      removeButton.addEventListener('click', () => {
        currentProject.todos.splice(index, 1);
        localStorage.setItem('user', JSON.stringify(currentAccount));
        todos.removeChild(todoSection);
      });

      doneButton.innerText = 'Done';
      doneButton.addEventListener('click', () => {
        todos.removeChild(todoSection);
        todos.insertBefore(element, todos.children[index]);

      });
      todos.insertBefore(todoSection, todos.children[index]);
    });
  }
}