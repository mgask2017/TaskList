//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners(); 

//Load all event listeners
function loadEventListeners(){
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks); //DOMContentLoaded an event loaded when the webpage loads
    //Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from Local Storage
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }   else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="far fa-times-circle"></i>';
    // Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
    });
}

//Add Task
function addTask(e) {
    if(taskInput.value === ''){
        alert('ADD A TASK');
    }

    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="far fa-times-circle"></i>';
    // Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear the input 
    taskInput.value = '';

    e.preventDefault(); //stops the form submit (default)
}

//Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }   else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
    

//Remove Task
function removeTask(e){
    if (e.target.parentElement.classList.contains //Checks to see if the font awesome 'x' icon has been clicked
    ('delete-item')) {
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove(); //target the correct element in the DOM i.e. the FA 'x' icon
            
        //Remove From local storage
        removeTaskFromLocalStorage
        (e.target.parentElement.parentElement);
        }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }   else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks button
function clearTasks(){
    //taskList.innerHTML = '';  //One way od deleting all the li elements from the Task List

    //Faster method of deleting all tasks
    while(taskList.firstChild){ //while something is in the list?
        taskList.removeChild(taskList.firstChild);
    }
    // https://jsperf.com/innerhtml-vs-removechild (Website showing the difference between each delete method)
}

//Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    });
}