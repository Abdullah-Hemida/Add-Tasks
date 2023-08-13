// attach global variables
let textInput = document.querySelector('.form .input-text');
let addTaskBtn = document.querySelector('.form .add-task');
let tasksContent = document.querySelector('.tasks-content');
let deleteBtn = document.querySelector('.del');

let tasksArray = [];

if(localStorage.getItem("storedtasks")) {
  tasksArray = JSON.parse(localStorage.getItem("storedtasks"));
  addTasksToPage(tasksArray)
}
//getDataFromLocalStorag();

addTaskBtn.addEventListener("click", () => {
    if (textInput.value) {
        // add task to array
        addTasks(textInput.value);
        textInput.value = "";

    }
})

function addTasks(textInput) {
    let task = {
        id: Date.now(),
        title: textInput,
        completed: false
    }
    tasksArray.push(task);
    // add tasks to page
    addTasksToPage(tasksArray);
    addTasksToLocalStorage(tasksArray);
}
// add tasks to page
function addTasksToPage(tasksArray) {
    tasksContent.innerHTML = "";
    tasksArray.forEach(task => {
           let taskAdded = `<div class="task" data-id=${task.id}>${task.title} <span class="del">delete</span></div>`
           tasksContent.insertAdjacentHTML("beforeend", taskAdded);
        if (task.completed) {
        }
    });
    tasksContent.addEventListener("click", (e) => {
        if (e.target.classList.contains("del")) {
            //remove target task from page
            e.target.parentElement.remove();
            // remove deleted task from tasks array
            removeTasksWith(e.target.parentElement.getAttribute("data-id"));
        }
         // click on task of element
        if (e.target.classList.contains("task")) {
            e.target.classList.toggle("done");
            updateStatsOfTasks(e.target.getAttribute("data-id"));
        }
    })  
}


function removeTasksWith(taskId) {
    tasksArray = tasksArray.filter((task) => task.id != taskId);
    addTasksToLocalStorage(tasksArray)
}

function updateStatsOfTasks(tasksId) {
for (let i = 0; i < tasksArray.length; i++) {
if(tasksArray[i].id === tasksId) {
console.log(tasksArray[i].id);
console.log(tasksId);
tasksArray[i].completed === false ? tasksArray[i].completed = true : tasksArray[i].completed = false ;
}
}
}


function addTasksToLocalStorage(tasksArray) {
    let jsonTasksArray = JSON.stringify(tasksArray);
    localStorage.setItem("storedtasks", jsonTasksArray);
}

function getDataFromLocalStorag() {
if (localStorage.getItem("storedtasks")) {
let data = JSON.parse(localStorage.getItem("storedtasks"));
let tasksArrayFromStorage = data;
addTasksToPage(tasksArrayFromStorage)
}
}