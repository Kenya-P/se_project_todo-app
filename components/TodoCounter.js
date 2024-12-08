class TodoCounter {
    constructor(todos, selector) {
        this._element = document.querySelector(selector);
        this._completed = todos.filter(todo => todo.completed).length;
        this._total = todos.length;
        this._completed = 0;
        this._updatedText();
    }

    updataCompleted = (increment) => {
        if (increment) {
            this._completed++;
            this._total++;
        } else {
            this._completed--;
            this._total--;
        }
    }

    updateTotal = (increment) => {
        if (increment) {
            this._total++;
        } else {
            this._total--;
        }
    }

    _updateText = () => {
        this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
    }
}

export default TodoCounter;