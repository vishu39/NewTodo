//---------------------------------------------Dom Elements-----------------------------------------
const itemInput = document.getElementById("inp");
const itemImportance = document.getElementById("imp");
const addButton = document.getElementById("sub");
const clearAllButton = document.getElementById("clr");
const filterBtn=document.querySelectorAll(".filter-btn")
//---------------------------------------------------------------------------------------------------


//---------------------------------------------------creating an empty array---------------------------
let todos=[];
//-----------------------------------------------------------------------------------------------------

//--------------------------------------------clear all button-----------------------------------------
 function clearAll(todos) {
 todos=[];
 savedTodos(todos);
 getTodosList(todos);
};


// -------------------------------------------------------handle item-----------------------------------
// const handeEvent=function(){

// }


//-------------------------------------done function----------------------------------------------------
 function markItemDone(taskId) {
    let index=todos.findIndex((todo)=>todo.taskId===taskId)
    const selected=todos[index];
    selected.complete= !selected.complete;
    savedTodos(todos);
    getTodosList(todos)
};



//--------------------------------------Delete  Button--------------------------------------------------
//delete button
function deleteItems(taskId) {   
    todos=todos.filter((ele)=>ele.taskId !=taskId)
    savedTodos(todos);
    getTodosList(todos)
}



//---------------------------------------Get List--------------------------------------------------------
let getTodosList=function(todos){
    let html = ""; //taking an empty string
 	let uList = document.getElementById("list"); 
	todos.forEach((item) => {  
   const Itemclass=item.complete?"task-container lined":"task-container";
   const doneClass=item.complete?"fas fa-check fill":"fas fa-check"
            html += `                             
            <li class="list-item" id="list" taskid=${item.taskId}> 
            <div class="task-container ${Itemclass}" id="line">
            <span class="task">${item.inputvalue}</span>
            <span class="Importance">${item.importancevalue}</span>
            </div>
            <span class="icons icon-box">
            <i data-done class="fas fa-check ${doneClass}" onclick="markItemDone(${item.taskId})"></i>
            <i class="fas fa-trash-alt" onclick="deleteItems(${item.taskId})"></i
            ></span
            </li>`;  
    });
        uList.innerHTML = html;  
}


//-------------------------------------Local storage functions--------------------------------------------
//---------Get item from local storage--------
const getSavedTodos=function(){
    const storedTask=localStorage.getItem("tasks");
    if(storedTask===null || storedTask==="undefined")
    {
        todos=[];
    }
    else{
        todos=JSON.parse(storedTask);
    }
}

//-----------set item to the local storage----------
const savedTodos=function(todos){
localStorage.setItem("tasks",JSON.stringify(todos));
}


//-----------------------------------------Add Button-------------------------------------------------
window.onload=()=>{   
addButton.addEventListener("click", function (e) {
        e.preventDefault();
    let	inputvalue = itemInput.value;
    let	importancevalue = itemImportance.value;
        if (inputvalue.trim() != 0 && importancevalue.trim() != 0) {  
            if (inputvalue === null && importancevalue === null) {
            todos = [];
            } else {
                const itemObj={
                    inputvalue,
                    importancevalue,
                    taskId:Date.now(), 
                    complete:false 
                }
                todos.push(itemObj);
                savedTodos(todos);
            }
            getTodosList(todos);
        }
        itemInput.value = ""; 
        itemImportance.value = "";
    });

    //filter btn function
    filterBtn.forEach((but) => {
        but.addEventListener("click", function (e) {
          e.preventDefault();
          const dataType = this.getAttribute("data-type");
              getItemsFilter(dataType);
          });
     });
    getSavedTodos();
    getTodosList(todos);
}


//------------------------------------------filter function---------------------------------------------

const getItemsFilter = function (type) {
    let filterItems = [];
    console.log(type);
    switch (type) {
        case "All":
            filterItems=todos;
            break;
            case "completed":
              filterItems = todos.filter((item) => item.complete);
              break;
      case "uncompleted":
        filterItems = todos.filter((item) => !item.complete);
        break;
      default:
        filterItems = todos;
    }
    getTodosList(filterItems);
  };


