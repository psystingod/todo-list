import { TodoItem } from './types';

export class TodoList {
  private items: TodoItem[] = [];
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
  }

  addItem(text: string) {
    const newItem: TodoItem = {
      id: Date.now(),
      text,
      completed: false,
    };
    this.items.push(newItem);
    this.render();
  }

  toggleComplete(id: number) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.completed = !item.completed;
      this.render();
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
    this.render();
  }

  private render() {
    this.container.innerHTML = `
      <h1>To-Do List</h1>
      <div class="todo-input">
        <input type="text" id="new-todo" placeholder="Add a new task..." />
        <button id="add-button">Add</button>
      </div>
      <ul>
        ${this.items
          .map(
            (item) => `
          <li class="${item.completed ? 'completed' : ''}">
            <span>${item.text}</span>
            <button data-id="${item.id}" class="complete-btn">✓</button>
            <button data-id="${item.id}" class="delete-btn">✕</button>
          </li>
        `
          )
          .join('')}
      </ul>
    `;

    document.querySelector<HTMLButtonElement>('#add-button')?.addEventListener('click', () => {
      const input = document.querySelector<HTMLInputElement>('#new-todo');
      if (input && input.value.trim()) {
        this.addItem(input.value.trim());
        input.value = '';
      }
    });

    this.container.querySelectorAll('.complete-btn').forEach((button) =>
      button.addEventListener('click', (event) => {
        const id = Number((event.currentTarget as HTMLButtonElement).dataset.id);
        this.toggleComplete(id);
      })
    );

    this.container.querySelectorAll('.delete-btn').forEach((button) =>
      button.addEventListener('click', (event) => {
        const id = Number((event.currentTarget as HTMLButtonElement).dataset.id);
        this.removeItem(id);
      })
    );
  }
}
