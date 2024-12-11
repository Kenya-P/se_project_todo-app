import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.querySelector("#add-todo-form");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;
    const id = uuidv4();

    const values = { name, date: new Date(dateInput), id };
    const todo = generateTodo(values);
    todosList.append (todo);

    addTodoPopup.close();
    addTodoForm.reset();
  },
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const section = new Section({
  initialTodos: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    todosList.append(todo);
  },
  containerSelector: ".todos__list",
});

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
