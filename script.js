let tasksData = {}
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo,progress,done];
let dragElement = null;


function addTask(title,desc,column){
    const div = document.createElement("div");
              div.classList.add("task");
             div.setAttribute("draggable",true);

             div.innerHTML = 
                    `<h2>${title}</h2>
                    <p>${desc}</p>
                    <button>Delete</button>`
             column.appendChild(div);
             div.addEventListener("drag",(e)=>{
                dragElement = div;
                
                
             });
             const deleteButton = div.querySelector("button");
             deleteButton.addEventListener("click",()=>{
               div.remove();
               updateTaskCount();

             });
            

        
        return div;

}

function updateTaskCount(){
    columns.forEach(col=>{
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");

            tasksData[col.id] = Array.from(tasks).map(t=>{
                return{
                    title:t.querySelector("h2").innerText,
                    desc:t.querySelector("p").innerText
                }
            });

            localStorage.setItem("tasks",JSON.stringify(tasksData));
            count.innerText = tasks.length;

        });

}

if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));

    for(const col in data){
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task=>{
            addTask(task.title,task.desc,column);    

        });    
      
    }
    updateTaskCount();
}

const tasks = document.querySelectorAll(".task");

tasks.forEach(task =>{
    task.addEventListener("dragstart",(e)=>{      
        dragElement = task;
        
    })


});

function addEventsOnColumn(column){
    column.addEventListener("dragenter",(e)=>{
        e.preventDefault();
        column.classList.add("hover-over");

    });

    column.addEventListener("dragleave",(e)=>{
        e.preventDefault();
        column.classList.remove("hover-over");

    });

    column.addEventListener("dragover",(e)=>{
        e.preventDefault();
      

    });

    column.addEventListener("drop",(e)=>{
        e.preventDefault();
        
        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateTaskCount();

    });
}

addEventsOnColumn(todo);
addEventsOnColumn(progress);
addEventsOnColumn(done);

// Modal related logic

const toggleModalButton = document.querySelector("#toggle-modal");
const modalBg = document.querySelector(".modal .bg");
const modal = document.querySelector(".modal");
const adddTaskButton = document.querySelector("#add-new-task");


toggleModalButton.addEventListener("click",()=>{
    modal.classList.toggle("active");
});

modalBg.addEventListener("click",()=>{
    modal.classList.remove("active");
}); 

adddTaskButton.addEventListener("click",()=>{

    const taskTitle = document
    .querySelector("#task-title-input")
    .value
    .trim();

    const taskDesc = document
    .querySelector("#task-desc-input")
    .value
    .trim();

    if(taskTitle === "" || taskDesc === ""){
        alert("Please fill all fields");
        return;
    }

    addTask(taskTitle,taskDesc,todo);

    updateTaskCount();

    modal.classList.remove("active");

    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-desc-input").value = "";
});

