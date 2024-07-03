const taskInput = document.querySelector("#task-input");
const addButton = document.querySelector("#add-button");
const tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filteredList = [];
let underLine = document.getElementById("under-line");

addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask(event) {
  event.preventDefault();
  if (taskInput.value == "") {
    alert("Please write a what you have to do!");
  }
  const task = {
    id: randomIdGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  filteredList.push(task);
  render();
  taskInput.value = null;
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filteredList;
  }

  let resultHTML = ``;
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task task-bg">
        <div class="task-done">${list[i].taskContent}</div>
        <div class="task-button">
          <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-left fa-lg"></i></button>
          <button onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-calendar-xmark fa-lg"></i></button>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div class="task-button">
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check fa-lg"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-calendar-xmark fa-lg"></i></button>
            </div>
          </div>`;
    }
  }
  console.log(taskList);
  console.log(filteredList);
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      console.log(taskList);
      console.log(filteredList);
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }

  filter();
}
function filter(e) {
  if (e) {
    mode = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  } // 진행중 상태에서 끝남으로 표시하면 바로 사라지는 부분은 event가 없음 그래서 조건추가
  filteredList = [];
  if (mode === "all") {
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filteredList.push(taskList[i]);
      }
    }
    console.log(filteredList);
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filteredList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIdGenerate() {
  return Math.random().toString(36).substr(2, 16);
}
