//Tüm elementleri seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const seconCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput=document.querySelector("#todoSearch");

//console.log(firstCardBody);

let todos = [];

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    seconCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",allTodosEverywhere);
    filterInput.addEventListener("keyup",filter);
}

//sayfa yeniden yüklendiğinde değerlerimizi kaybetmiyoruz alttaki metotla
function pageLoaded(){
    chechTodosFromStorage();
    todos.forEach(function(todo){
addTodoToUI(todo);
    });
}

function filter(e){
    const filterValue= e.target.value.toLowerCase().trim();
    const todoListesi= document.querySelectorAll(".list-group-item");

    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style","display:block");

            }else{
                todo.setAttribute("style","display:none !important");

            }
        });
    }else{
        showAlert("warning","filtreleme yapmak için en az bir todo yazılmalıdır!");
    }
}

function allTodosEverywhere(){
    const todoListesi= document.querySelectorAll(".list-group-item");
    if(todoListesi.length>0){
        //Ekrandan silme
        todoListesi.forEach(function(todo){
            todo.remove();
        });

        //Storage'dan silme
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","Başarılı bir şekilde silindi.");
    }else{
        showAlert("warning","Silmek için en az bir todo olmalıdır.");
    }
    
}

//Çarpıya basıncı değerleri siler
function removeTodoToUI(e){
if(e.target.className==="fa fa-remove"){
    //ekrandan silme
    const todo= e.target.parentElement.parentElement;
    todo.remove();

    //storage dan silme
    removeTodoToStorage(todo.textContent);
    showAlert("success","Todo başarıyla siindi.")
}
}

function removeTodoToStorage(removeTodo){
    chechTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning","Lütfen bir değer giriniz!");
    } else {
        // Arayüz Ekleme
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success","Todo Eklendi.");

    }

    // Storage ekleme 
    e.preventDefault();
}

function addTodoToUI(newTodo) {


    //     <li class="list-group-item d-flex justify-content-between">Todo 1
    //         <a href="#" class="delete-item">
    //             <i class="fa fa-remove"></i>
    //         </a>
    //     </li>
    // 


    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
}

function addTodoToStorage(newTodo) {
    chechTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function chechTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
    //     <div class="alert alert-warning" role="alert">
    //     This is a warning alert-check it out!
    // </div>

    const div = document.createElement("div");
    // div.className = "alert alert-" + type;
    div.className=`alert alert-${type}`; //literal template
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(function(){
        div.remove();                  // 2.5 saniye sonra bu bilgilendirme mesajı kalkar
    }, 2500);
}