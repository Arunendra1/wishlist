let todoInput=document.querySelector(".input");
let addTodoButton=document.querySelector(".button");
let showtodo=document.querySelector(".todos-container");
let todo;
let localData=JSON.parse(localStorage.getItem("todo"));
let  todolist=localData || [];
/**Creating function to get unique id */

function uuid(){
    return 'xxxxxxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function (param){
   let number=Math.random() * 16| 0,
   randomNumber = param == 'x'? number : (number & 0x3 | 0x8);
   return randomNumber.toString(16);
    });
}
addTodoButton.addEventListener("click",(e)=>{
    e.preventDefault();
    todo=todoInput.value;
    if(todo.length>0){
    todolist.push({id:uuid(),todo,isCompleted:false})
    }
    renderTodolist(todolist);
    localStorage.setItem("todo",JSON.stringify(todolist));
    todoInput.value="";
});
showtodo.addEventListener("click",(e)=>{
   let key =e.target.dataset.key;
   let deltodokey=e.target.dataset.todokey;
   todolist=todolist.map(todo=>todo.id===key?{...todo,isCompleted:!todo.isCompleted}:todo);
   todolist=todolist.filter(todo=>todo.id !== deltodokey)
   localStorage.setItem("todo",JSON.stringify(todolist));
   renderTodolist(todolist);
   console.log(todolist);
})
function renderTodolist(todolist) {
    console.log(todolist);
    showtodo.innerHTML=todolist.map(({id,todo,isCompleted}) => 
    `<div class="todos relative">
         <input class="t-checkbox t-pointer" id="item-${id}" type="checkbox" data-key=${id} ${isCompleted?"checked":""}>
          <label for="item-${id}" class="todo todo-text t-pointer ${isCompleted ? "checked-todo":""}" data-key=${id}>${todo}</label>
           <button class="absolute right-0 button cursor">
           <span  data-todokey=${id} class="del-btn material-icons-outlined">
              delete
           </span>
        </button>
    </div>`)
}
renderTodolist(todolist);
