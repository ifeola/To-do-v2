const todoList = document.querySelector("#todo__not-completed");
const todoListItems = document.querySelector("#todo__not-completed").children;
console.log(todoListItems);
const todoForm = document.querySelector("#todo-form");

class TodoList {
  constructor(title, index) {
    this._title = title;
    this._index = index;
  }
}

let array = [];
array.

class UI {
  static addTask() {
    const tasks = Store.gettoDos();

    tasks.forEach((task) => {
      UI.addItem(task);
    });
  }

  static addItem(item) {
    let listItem = document.createElement("li");
    listItem.classList.add("todo__item");
    listItem.innerHTML = `
        <div class="item__title">
          <div class='item__title-top'>
            <input type="checkbox" name="item__check" id="item__check" />
            <h4 class='item__heading'>${item}</h4>
          </div>
          <div class="item__btn">
            <button class="delete">
              <img src="/assets/trash.svg" class="delete-btn">
            </button>
            <button class="edit">
              <img src="/assets/file-edit.svg" class="edit-btn">
            </button>
          </div>
        </div>
        <form class="item__edit">
          <input type="text" id="edit" class="todo__input" />
          <input type="submit" value="Submit" class="todo__btn" />
        </form>
      `;
    todoList.appendChild(listItem);
  }

  static editItem(targetEdit) {
    if (targetEdit.classList.contains("edit-btn")) {
      let editForm =
        targetEdit.parentElement.parentElement.parentElement.nextElementSibling;
      let editInput = editForm.querySelector(".todo__input");
      let heading =
        targetEdit.parentElement.parentElement.previousElementSibling.querySelector(
          ".item__heading"
        );

      editInput.value = heading.textContent;
      targetEdit.classList.add("active");
      let toDos = Store.gettoDos();
      editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        toDos.forEach((todo, index) => {
          if (todo === heading.textContent) {
            toDos.splice(index, 1);
            heading.textContent = editInput.value;
            toDos.
          }
        });
        targetEdit.classList.remove("active");
      });
    } else {
      targetEdit.classList.remove("active");
    }

    // const inputOverlay = document.querySelector(".edit-overlay");
    // let inputValue = inputOverlay.querySelector("#edit");
    // let input = "";
    // if (targetEdit.classList.contains("edit-btn")) {
    //   let listItem = targetEdit.parentElement.parentElement.parentElement;
    //   listItem.classList.add("active");
    //   input = listItem.querySelector(".item__heading").textContent;
    //   inputValue.value = input;

    //   inputOverlay.addEventListener("submit", (e) => {
    //     e.preventDefault();

    //     input = inputValue.value;
    //     listItem.querySelector(".item__heading").textContent = input;
    //     listItem.classList.remove("active");
    //   });
    // } else {
    //   listItem.classList.remove("active");
    // }
  }

  static deleteItem(targetDelete) {
    if (
      targetDelete.classList.contains("delete-btn") ||
      targetDelete.classList.contains("delete")
    ) {
      targetDelete.parentElement.parentElement.closest(".todo__item").remove();
      Store.removeTodo(targetDelete);
    }
  }
}

class Store {
  static gettoDos() {
    let toDos;
    if (localStorage.getItem("toDos") === null) {
      toDos = [];
    } else {
      toDos = JSON.parse(localStorage.getItem("toDos"));
    }
    return toDos;
  }

  static addtoDos(toDo) {
    const toDos = Store.gettoDos();
    toDos.push(toDo);
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }

  static removeTodo(targetDelete) {
    const toDos = Store.gettoDos();
    const item = targetDelete.parentElement.parentElement
      .closest(".todo__item")
      .querySelector(".item__heading").textContent;

    toDos.forEach((todo, index) => {
      if (todo === item) {
        toDos.splice(index, 1);
      }
    });

    localStorage.setItem("toDos", JSON.stringify(toDos));
  }
}

document.addEventListener("DOMContentLoaded", UI.addTask);

todoList.addEventListener("click", (e) => {
  // Delete an item
  UI.deleteItem(e.target);

  // Edit an item
  UI.editItem(e.target);
});

//Add item to to-do
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formInput = todoForm.querySelector(".todo__input-field");

  // Add item to list
  UI.addItem(formInput.value);

  // Add item tp storage
  Store.addtoDos(formInput.value);
  formInput.value = "";
});
