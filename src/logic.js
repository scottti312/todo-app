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

export function todo(title = 'Todo Title', description = 'Todo Description', dueDate = new Date(2022, 8, 25), completed = false) {
  return { title, description, dueDate, completed };
}

export function createDemo() {
  const demoAccount = account('Demoman');
  const inbox = project('Inbox');
  const website = project('My website project');
  const myTodo = todo('Example Todo', 'Here is an example description', new Date(2022, 11, 17), false);
  const completedTodo = todo('Completed Todo', 'Here is an example of a completed todo', new Date(2022, 1, 1), true);
  const halfFilledTodo = todo('Half Todo', 'Description and no date or completed value');
  const myTodo1 = todo();
  const websiteTodo = todo('Add divs', new Date(2022, 1, 5), false);
  const websiteTodo1 = todo('Style divs', new Date(2022, 1, 6), false);
  
  demoAccount.addProject(inbox);
  demoAccount.addProject(website);
  inbox.addTodo(completedTodo);
  inbox.addTodo(myTodo);
  inbox.addTodo(myTodo1);
  inbox.addTodo(halfFilledTodo);
  website.addTodo(websiteTodo);
  website.addTodo(websiteTodo1);
  return { demoAccount, inbox }
}
