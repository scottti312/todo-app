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
  return { account, addTodo, todos, title };
}

export function todo(title = 'Todo Title', description = 'Todo Description', dueDate = new Date(2022, 12, 25), completed = false) {
  return { title, description, dueDate, completed };
}

export function createDemo() {
  const demoAccount = account('Demoman');
  const inbox = project('Inbox');
  const website = project('My website project');
  const myTodo = todo('Example Todo', 'Here is an example description', new Date(2022, 11, 17), false);
  const completedTodo = todo('Completed Todo', 'Here is an example of a completed todo', new Date(2022, 1, 1), true);
  const myTodo1 = todo();

  demoAccount.addProject(inbox);
  demoAccount.addProject(website);
  inbox.addTodo(completedTodo);
  inbox.addTodo(myTodo);
  inbox.addTodo(myTodo1);
  return { demoAccount, inbox }
}
