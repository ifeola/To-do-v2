const todoList = document.querySelector("#todo__not-completed");
const todo = document.querySelector("#todo");
const todoListItems = document.querySelector("#todo__not-completed").children;
const todoComplete = document.querySelector("#todo__completed");
const todoForm = document.querySelector("#todo-form");

const tasks = [];

class UI {
  static addTask(todoItem) {
    UI.addItem(todoItem);
    tasks.push(todoItem);
    console.log(tasks);
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

      editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        tasks.forEach((task, index) => {
          if (task === heading.textContent) {
            let taskIndex = index;
            tasks.splice(index, 1);
            tasks[taskIndex] = editInput.value;
            // Store.editTodo(targetEdit, editInput.value);

            heading.textContent = editInput.value;
          }
        });
        targetEdit.classList.remove("active");
      });
    } else {
      targetEdit.classList.remove("active");
    }
  }

  static deleteItem(targetDelete) {
    if (
      targetDelete.classList.contains("delete-btn") ||
      targetDelete.classList.contains("delete")
    ) {
      const targetHeading =
        targetDelete.parentElement.parentElement.previousElementSibling.querySelector(
          ".item__heading"
        ).textContent;
      tasks.forEach((task, index) => {
        if (targetHeading === task) {
          tasks.splice(index, 1);
        }
      });
      targetDelete.parentElement.parentElement.closest(".todo__item").remove();
      console.log(tasks);
      // Store.removeTodo(targetDelete);
    }
  }

  static checkedItem(targetChecked) {
    const checked = targetChecked.parentElement.parentElement.parentElement;
    if (targetChecked.checked === true) {
      todoComplete.appendChild(checked);
      targetChecked.parentElement.nextElementSibling.querySelector(
        ".edit"
      ).style.display = "none";
    }
    if (targetChecked.checked === false) {
      todoList.appendChild(checked);
      targetChecked.parentElement.nextElementSibling.querySelector(
        ".edit"
      ).style.display = "flex";
    }
  }
}

todo.addEventListener("click", (e) => {
  // Delete an item
  UI.deleteItem(e.target);

  // Edit an item
  UI.editItem(e.target);

  // Checked Item
  UI.checkedItem(e.target);
});

//Add item to to-do
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formInput = todoForm.querySelector(".todo__input-field");

  // Add item to list
  UI.addTask(formInput.value);
  formInput.value = "";

  // Add item tp storage
  // Store.addtoDos(formInput.value);
});

// class Store {
//   static gettoDos() {
//     let toDos;
//     if (localStorage.getItem("toDos") === null) {
//       toDos = [];
//     } else {
//       toDos = JSON.parse(localStorage.getItem("toDos"));
//     }
//     return toDos;
//   }

//   static addtoDos(toDo) {
//     const toDos = Store.gettoDos();
//     toDos.push(toDo);
//     localStorage.setItem("toDos", JSON.stringify(toDos));
//   }

//   static removeTodo(targetDelete) {
//     const toDos = Store.gettoDos();

//     const listItem = targetDelete.parentElement.parentElement
//       .closest(".todo__item")
//       .querySelector(".item__heading").textContent;
//     toDos.forEach((item, index) => {
//       if (item === listItem) {
//         toDos.splice(index, 1);
//       }
//     });

//     localStorage.setItem("toDos", JSON.stringify(toDos));
//   }

//   static editTodo(targetEdit, newTitle) {
//     const toDos = Store.gettoDos();

//     const item = targetEdit.parentElement.parentElement
//       .closest(".todo__item")
//       .querySelector(".item__heading").textContent;

//     toDos.forEach((todo, index) => {
//       if (todo === item) {
//         toDos[index] = newTitle;
//         console.log(toDos[index], newTitle);
//       }
//     });

//     localStorage.setItem("toDos", JSON.stringify(toDos));
//   }
// }

// document.addEventListener("DOMContentLoaded", UI.addTask);

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
