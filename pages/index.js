import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.querySelector("#add-todo-form");
const todosList = document.querySelector(".todos__list");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopupEl = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    //evt.preventDefault();
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const id = uuidv4();
    const values = { name, date: new Date(dateInput), id };
    const todo = generateTodo(values);
    section.addItem(todo);
    todosList.append (todo);

    todoCounter.updateTotal(true);

    addTodoPopupEl.close();
    addTodoForm.reset();
  },
});

addTodoPopupEl.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopupEl.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopupEl.close();
});

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
    //todosList.append(todo);
  },
  containerSelector: ".todos__list",
});

//section.renderItems();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

function handleTodo(deleted) {
  if (deleted) {
    todoCounter.updateTotal(false);
} else {
    todoCounter.updateTotal(true);
  }
}

const generateTodo = (data) => {
  const todo = new Todo
  (
    data, 
    "#todo-template", {
      handleCheck,
      handleDelete,
      handleTodo,
  });
  return todo.getView();
};

const newTodoValidator = new FormValidator
(
  validationConfig, 
  addTodoForm
);

newTodoValidator.enableValidation();
