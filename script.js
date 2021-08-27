const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const optionFilter=document.getElementById('filter-todo');

document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
optionFilter.addEventListener('click',filterTodo);


function addTodo(event){
    if(todoInput.value===""){
        const errorTodo=document.getElementById('header');
        errorTodo.className='header-show'
        event.preventDefault(); }

    else{

        const errorTodo=document.getElementById('header');
        errorTodo.className='header'

        const todoDiv=document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo=document.createElement('li');
        newTodo.innerText=todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        saveLocalTodos(todoInput.value);

        const complateButton=document.createElement('button');
        complateButton.innerHTML='<i class="fas fa-check"></i>';
        complateButton.classList.add('complate-btn');
        todoDiv.appendChild(complateButton);

        const trashButton=document.createElement('button');
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);}

    
        todoInput.value=""; 
    }

function deleteCheck(e){
    const item=e.target;
    if(item.classList[0]==='trash-btn'){
        const todo=item.parentElement;
        todo.classList.add('fall');

        removeLocalTodos(todo);

        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
        
    }

    if(item.classList[0]==='complate-btn'){
        const todo=item.parentElement;
        doneTodo(todo.childNodes[0].innerText)
        todo.classList.toggle('complated');
    }
}

function doneTodo(todo){
    let todos;
    if(localStorage.getItem("done")===null){
        todos=[];
    }
    else {
        todos=JSON.parse(localStorage.getItem('done'));
    }
    if(todos.includes(todo)){
        const filter = todos.filter(el=>el !== todo)
        localStorage.setItem("done" , JSON.stringify(filter));
    }else{
    todos.push(todo);
    localStorage.setItem("done" , JSON.stringify(todos)); }
}

function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all": todo.style.display="flex"; break;
            case "complated":
                if(todo.classList.contains("complated")){
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;
            case "uncomplated":
                if(!todo.classList.contains("complated")){
                    todo.style.display="flex";
                }    
                else{todo.style.display="none";}   break; }
    });
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else {
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(todos)); 
}

function getTodos(){
    let todos, dones;

    if(localStorage.getItem("todos")===null){
       
        todos=[];
    }
    else {
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    if(localStorage.getItem("done")===null){
       
        dones=[];
    }
    else {
        dones=JSON.parse(localStorage.getItem('done'));
    }


    todos.forEach(function(todo){
        const todoDiv=document.createElement('div');
        if(dones.includes(todo)){
            todoDiv.classList.add('complated')
        }

        todoDiv.classList.add('todo');
        

        const newTodo=document.createElement('li');
        newTodo.innerText=todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const complateButton=document.createElement('button');
        complateButton.innerHTML='<i class="fas fa-check"></i>';
        complateButton.classList.add('complate-btn');
        todoDiv.appendChild(complateButton);

        const trashButton=document.createElement('button');
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
        });
}

function removeLocalTodos(todo){
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else {
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    let dones;

    if(localStorage.getItem("done")===null){
        dones=[];
    }
    else {
        dones=JSON.parse(localStorage.getItem("done"));
    }

    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    dones.splice(dones.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
    localStorage.setItem("done",JSON.stringify(dones));
}

