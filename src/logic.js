export function account(name) {
  let projects = [];
  function addProject(project) {
    projects.push(project);
  }
  return { addProject, projects, name }
}

export function project(title) {
  let todos = [];
  function addTodo(todo) {
    todos.push(todo);
  }
  return { addTodo, todos, title };
}

export function todo(title = 'Project Title', description = 'Project Description', dueDate = new Date(2022, 12, 25)) {
  return { title, description, dueDate };
}

export function createDemo() {
  const demoAccount = account('Demoman');
  const inbox = project('Inbox');
  const website = project('My website project');
  const myTodo = todo('Example Todo', 'Here is an example description', new Date(2022, 11, 17));
  const myTodo1 = todo();

  demoAccount.addProject(inbox);
  demoAccount.addProject(website);
  inbox.addTodo(myTodo);
  inbox.addTodo(myTodo1);
  return { demoAccount, inbox }
}
