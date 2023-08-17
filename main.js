let input = document.querySelector(".taskToDo");
let submit = document.querySelector(".add");
let div = document.querySelector(".tasks");

let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getData();
submit.onclick = function (event) {
  event.preventDefault();
  if (input.value !== "") {
    addTask(input.value);
    // console.log(input.value);
    input.value = "";
  }
};
div.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    // console.log(e.target.parentElement.getAttribute("data-id"));

    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    toggleStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});
function addTask(tasktext) {
  const task = {
    id: Date.now(),
    title: tasktext,
    completed: false,
  };
  arrayOfTasks.push(task);
  //   console.log(tasks);
  addToPage(arrayOfTasks);
  addToLocalStorage(arrayOfTasks);
}
function addToPage(tasks) {
  div.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let mydiv = document.createElement("div");
    mydiv.className = "task";
    if (task.completed) {
      mydiv.className = "task done";
    }
    mydiv.setAttribute("data-id", task.id);
    mydiv.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.innerHTML = "delete";
    mydiv.appendChild(span);
    div.appendChild(mydiv);
  });
}
function addToLocalStorage(arrayOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getData() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    // console.log(tasks);
    addToPage(tasks);
  }
}
function deleteTaskFromLocalStorage(taskId) {
  //   for (let i = 0; i < arrayOfTasks.length; i++) {
  //     console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  //   }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addToLocalStorage(arrayOfTasks);
}
function toggleStatus(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false  ?( arrayOfTasks[i].completed= true) : (arrayOfTasks[i].completed = false);
    }
  }
  addToLocalStorage(arrayOfTasks);
}


