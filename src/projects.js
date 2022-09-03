import {displayTodo, addNewTodo, openTodo} from './todos.js';
import {project} from './logic.js';

export function displayProject(project, sidebar, currentAccount, todos) {
  let projectDisplay = document.createElement('li');
  let projectTitle = document.createElement('div');

  projectTitle.id = 'project-name';
  projectDisplay.className = 'project';
  projectTitle.innerHTML = project.title;

  let menu = document.createElement('i');
  menu.classList.add('fa-solid');
  menu.classList.add('fa-ellipsis');
  menu.classList.add('fa-xl');
  menu.addEventListener('click', (e) => {
    projectMenu(e, projectDisplay, projectTitle, menu, 
                sidebar, project, currentAccount, todos);
  });
  projectDisplay.addEventListener('mouseover', () => {
    if (!projectDisplay.classList.contains('project-menu'))
      projectDisplay.append(menu);
  });
  projectDisplay.addEventListener('mouseout', () => {
    if (!projectDisplay.classList.contains('project-menu'))
    projectDisplay.removeChild(menu)
  });
  projectDisplay.append(projectTitle);
  return projectDisplay;
}

export function addNewProject(projects, currentAccount, todos) {
  let addProject = document.createElement('button');
  addProject.innerHTML = 'Add new project';
  addProject.id = 'add-project-button';
  addProject.addEventListener('click', () => {
    projects.removeChild(addProject);
    let projectInput = document.createElement('input');
    let projectSubmit = document.createElement('button');
    projectSubmit.innerHTML = 'Submit';
    projectSubmit.id = 'submit';
    projectSubmit.addEventListener('click', () => {
      if (projectInput.value != '') {
        let newProject = project(projectInput.value);
        currentAccount.projects.push(newProject);
        localStorage.setItem('user', JSON.stringify(currentAccount));
        let projectDisplay = displayProject(newProject, projects, currentAccount, todos);
        projects.append(projectDisplay, addProject);
        projects.removeChild(projectInput);
        projects.removeChild(projectSubmit);

        switchProject(projectDisplay, projects, todos, currentAccount);
      }
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
  return addProject;
}

export function switchProject(projectElement, projects, todos, currentAccount) {
  // Click on projects to switch currentProject
  var projectNodes = Array.from(projects.children);
  projectElement.addEventListener('click', function(e) {
    let target = e.target; 
    if (target.tagName == 'DIV') {
      target = projectElement;
    }
    if (target.tagName == 'I') {
      target = projectElement;
    }
    if (target !== this) {
        return;
    }
    for (const project of projects.querySelectorAll('li')) {
      project.classList.remove('selected-project');
    }
    projectElement.classList.add('selected-project');

    let index = projectNodes.indexOf(target);
    while(todos.firstChild) {
        todos.removeChild(todos.firstChild);
    }
    let currentProject = currentAccount.projects[index];

    // Add project title to the top of the todo list
    let todosContainer = document.getElementById('todos-container');
    if (todosContainer.contains(document.getElementById('inner-project-title'))) {
      todosContainer.removeChild(todosContainer.firstChild);
    }
    let projectTitle = document.createElement('div');
    projectTitle.id = 'inner-project-title';
    if (projectElement.firstChild.tagName == 'DIV')
      projectTitle.innerHTML = projectElement.firstChild.innerHTML;
    if (projectElement.firstChild.tagName == 'INPUT')
      projectTitle.innerHTML = projectElement.firstChild.value;
    todos.before(projectTitle)

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
  e.target.parentElement.classList.add('project-menu');
  deleteButton.id = 'delete-project';
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
      console.log('fuck');
      switchProject(element, projects, todos, currentAccount);
    }
    projects.appendChild(addNewProject(projects, currentAccount, todos));
  });

  doneButton.addEventListener('click', () => {
    if (projectTitleInput.value != '') {
      currentAccount.projects[index].title = projectTitleInput.value;
      localStorage.setItem('user', JSON.stringify(currentAccount));
    }
      let resultProjectDisplay = displayProject(project, projects, currentAccount, todos);
      if (projectDisplay.classList.contains('selected-project'))
        resultProjectDisplay.classList.add('selected-project');
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