import { TodoList } from './TodoList';

const app = document.querySelector<HTMLElement>('#app')!;
const todoList = new TodoList(app);