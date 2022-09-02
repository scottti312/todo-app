import {displayTodo, addNewTodo, openTodo} from './todos.js';
import {project} from './logic.js';

export function displayProject(project, sidebar, currentAccount, todos) {
  let projectDisplay = document.createElement('li');
  let projectTitle = document.createElement('div');
  let menu = document.createElement('button');
  projectDisplay.className = 'project';
  projectTitle.innerHTML = project.title;
  menu.innerHTML = "Menu";
  projectDisplay.append(projectTitle, menu);
  menu.addEventListener('click', (e) => {
    projectMenu(e, projectDisplay, projectTitle, menu, 
                sidebar, project, currentAccount, todos)
  });
  // sidebar.append(projectDisplay);
  return projectDisplay;
}

export function addNewProject(projects, currentAccount, todos) {
  let addProject = document.createElement('button');
  addProject.innerHTML = 'Add new project';
  addProject.addEventListener('click', () => {
    projects.removeChild(addProject);
    let projectInput = document.createElement('input');
    let projectSubmit = document.createElement('button');
    projectSubmit.innerHTML = 'Submit';
    projectSubmit.id = 'submit';
    projectSubmit.addEventListener('click', () => {
      let newProject = project(projectInput.value);
      currentAccount.projects.push(newProject);
      localStorage.setItem('user', JSON.stringify(currentAccount));
      let projectDisplay = displayProject(newProject, projects, currentAccount, todos);
      projects.append(projectDisplay, addProject);
      projects.removeChild(projectInput);
      projects.removeChild(projectSubmit);

      switchProject(projectDisplay, projects, todos, currentAccount);
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

export function switchProject(projectElement, projects, todos, currentAccount) {
  // Click on projects to switch currentProject
  var projectNodes = Array.from(projects.children);
  projectElement.addEventListener('click', function(e) {
    let target = e.target; 
    if (target.tagName == 'DIV') {
      target = e.target.parentElement;
    }
    if (target !== this) {
        return;
    }
    for (const project of projects.querySelectorAll('li')) {
      project.classList.remove('selected-project');
    }
    target.classList.add('selected-project');

    let index = projectNodes.indexOf(target);
    while(todos.firstChild) {
        todos.removeChild(todos.firstChild);
    }
    let currentProject = currentAccount.projects[index];
    for (const todo of currentProject.todos) {
      displayTodo(todo, todos, currentAccount, currentProject);
    }
    for (const element of todos.querySelectorAll('li')) {
      openTodo(element, todos, currentAccount, currentProject);
    }
    todos.append(addNewTodo(currentProject, todos, currentAccount));
    return index;
  });
}

export function projectMenu(e, projectDisplay, projectTitle, menu,
                            projects, project, currentAccount, todos) {
  var nodes = Array.from(projects.children);
  let projectTitleInput = document.createElement('input');
  let buttonsContainer = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');
  let index = nodes.indexOf(e.target.parentElement);
  doneButton.id = 'submit-project';
  doneButton.innerHTML = 'Done';
  deleteButton.innerHTML = 'Delete';
  buttonsContainer.className = 'project-buttons';
  projectTitleInput.value = project.title;
  buttonsContainer.append(deleteButton, doneButton);
  projectDisplay.removeChild(projectTitle);
  projectDisplay.removeChild(menu);
  projectDisplay.append(projectTitleInput, buttonsContainer);

  deleteButton.addEventListener('click', (e) => {
    currentAccount.projects.splice(index, 1);
    projects.removeChild(projectDisplay);
    localStorage.setItem('user', JSON.stringify(currentAccount));
    let i = 0;
    projects.removeChild(projects.lastChild);
    for (const element of projects.querySelectorAll('li')) {
      projects.removeChild(element);
      projects.append(displayProject(currentAccount.projects[i], projects, currentAccount, todos));
      i++;
    }
    for (const element of projects.querySelectorAll('li')) {
      switchProject(element, projects, todos, currentAccount);
    }
    projects.appendChild(addNewProject(projects, currentAccount, todos));
  });

  doneButton.addEventListener('click', () => {
    currentAccount.projects[index].title = projectTitleInput.value;
    localStorage.setItem('user', JSON.stringify(currentAccount));
    let resultProjectDisplay = displayProject(project, projects, currentAccount, todos);
    projectDisplay.before(resultProjectDisplay);
    switchProject(resultProjectDisplay, projects, todos, currentAccount);
    projects.removeChild(projectDisplay);
  });

  projectTitleInput.addEventListener('keypress', function(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      document.getElementById('submit-project').click();
    }
  }); 

}