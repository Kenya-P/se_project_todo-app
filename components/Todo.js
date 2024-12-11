class Todo {
    constructor(data, selector, handleCheck, handleDelete, handleTodo) {
        this._data = data;
        this._templateElement = document.querySelector(selector);
        if (!this._templateElement) {
            throw new Error(`No element found with selector: ${selector}`);
        }
        this._handleCheck = handleCheck;
        this._handleDelete = handleDelete;
        this._handleTodo = handleTodo;
    }

    _setEventListeners() { 
        this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

        this._todoCheckboxEl.addEventListener("change", () => {
            this._data.completed = this._todoCheckboxEl.completed;
            this._handleCheck(this._data.completed);
        });

        this._todoDeleteBtn.addEventListener("click", () => {
            this._handleDelete(this._data.completed);
            this._handleTodo(false);
            this._todoElement.remove();
        });

    }

    _generateCheckboxEl() {
        this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
        this._todoLabel = this._todoElement.querySelector(".todo__label");
 
        this._todoCheckboxEl.checked = this._data.completed;
        this._todoCheckboxEl.id = `todo-${this._data.id}`;
        this._todoLabel.setAttribute("for", `todo-${this._data.id}`);

    }

    _dueDateEl() {
        const todoDate = this._todoElement.querySelector(".todo__date");
        const dueDate = new Date(this._data.date);
        if (!isNaN(dueDate)) {
            todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })}`;
        }   else {
            todoDate.textContent = "No due date";
        }
    }

    getView() {
        this._todoElement = this._templateElement.content
            .querySelector(".todo")
            .cloneNode(true);

        const todoNameEl = this._todoElement.querySelector(".todo__name");        
        todoNameEl.textContent = this._data.name;

        this._generateCheckboxEl();
        this._dueDateEl();
        this._setEventListeners();

        return this._todoElement;
    }


}

export default Todo;