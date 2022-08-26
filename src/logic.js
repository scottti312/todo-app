const todo = (title = 'Project', description = 'Description', dueDate = new Date(2022, 12, 25)) => {
  return { title, description, dueDate };
}

const project = (title) => {
  let todos = [];
  function addTodo(todo) {
    todos.push(todo);
  }
  return { addTodo, todos, title };
}

const account = (name) => {
  let projects = [];
  function addProject(project) {
    projects.push(project);
  }
  return { addProject, projects, name }
}


const demoAccount = account('Demoman');
const inbox = project('Inbox');
const myTodo = todo('Example Todo', 'Here is an example ', new Date(2022, 11, 17));
const myTodo1 = todo();

demoAccount.addProject(inbox);
inbox.addTodo(myTodo);
inbox.addTodo(myTodo1);
console.log(demoAccount.name);
console.log(demoAccount.projects);
console.log(inbox.title);
console.log(inbox.todos);
