import {displayTodo, addNewTodo, openTodo} from './todos.js';

export function displayProjects(currentAccount, sidebar) {
  for (const project of currentAccount.projects) {
    let projectDisplay = document.createElement('li');
    projectDisplay.innerHTML = project.title;
    sidebar.append(projectDisplay);
  }
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
            console.log(index);
            while(todos.firstChild) {
                todos.removeChild(todos.firstChild);
            }
            let currentProject = currentAccount.projects[index];
            for (const todo of currentProject.todos) {
              displayTodo(todo, todos, currentProject, currentAccount);
            }
            for (const element of todos.querySelectorAll('li')) {
              openTodo(element, todos, currentAccount, currentProject);
            }
            return index;
        });
    };
}