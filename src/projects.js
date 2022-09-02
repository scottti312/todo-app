import {displayTodo, addNewTodo, openTodo} from './todos.js';

export function displayProject(project, sidebar) {
  let projectDisplay = document.createElement('li');
  let projectTitle = document.createElement('div');
  let menu = document.createElement('button');
  projectDisplay.className = 'project';
  projectTitle.innerHTML = project.title;

  menu.addEventListener('click', () => {
    let projectTitleInput = document.createElement('input');
    let buttonsContainer = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    projectTitleInput.value = project.title;
    buttonsContainer.append(deleteButton, doneButton);
    projectDisplay.removeChild(projectTitle);
    projectDisplay.removeChild(menu);
    projectDisplay.append(projectTitleInput, buttonsContainer);

    doneButton.addEventListener('click', () => {
      console.log('done');
      projectDisplay.before(displayProject(project, sidebar));
      sidebar.removeChild(projectDisplay);
    });
  });

  projectDisplay.append(projectTitle, menu);
  // sidebar.append(projectDisplay);
  return projectDisplay;
}

export function addNewProject(projects, demoAccount, todos, currentProject) {
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

export function switchProject(projects, todos, currentAccount) {
  // Click on projects to switch currentProject
  var projectNodes = Array.from(projects.children);
  for (const element of projects.querySelectorAll('li')) {
        element.addEventListener('click', function(e) {
            if (e.target !== this) {
                return;
            }
            let index = projectNodes.indexOf(e.target);
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
    };
}

export function projectMenu(projects, currentAccount) {

}