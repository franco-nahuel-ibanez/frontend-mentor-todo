const template = document.querySelector('.template').content;
const fragment = document.createDocumentFragment();
const content = document.querySelector('.task-content');
const todoFooter = document.querySelector('.todo-footer');
const inputTodo = document.querySelector('#input-todo');
const circle = document.querySelector('.circle');
const btnCenter = document.querySelector('.btn-center');
const btn = document.querySelectorAll('.btn')
const icon = document.querySelector('.icon');
const styles = document.querySelector('.styles')
const item = document.querySelector('.item');

//lista de tareas
let todoList = [{task: "Complete online Javascript course", active: false}, { task: "Jog around the park 3k", active: true}, {task: "10 minutes meditation", active: true }, {task: "Read for 1 hour", active: true}];

//mostrar en pantalla
const show = ( arr ) => {
    arr.forEach(todo => {
        template.querySelector('.task').setAttribute('data-filter', todo.active)
        template.querySelector('p').textContent = todo.task;    
        const clone = template.cloneNode(true);
        fragment.appendChild(clone);
    });
    content.innerHTML = '';
    content.appendChild(fragment)

    const addClassCompleted = () => {
        const task = document.querySelectorAll('.task');
        task.forEach( todo => {
           if(todo.getAttribute('data-filter') == 'false' ){
                const span = todo.querySelector('.circle');
                span.classList.add('bg');

                const img = todo.querySelectorAll('.check');
                img[0].classList.remove('visible')

                const text = todo.querySelectorAll('.text');
                text[0].classList.add('outline')
           }
        })
    }
    addClassCompleted(arr)

}

show(todoList);

//mostrar activos
const showActive = () => {
    const active = todoList.filter( todo => todo.active == true);
    show(active)
}

//mostrar completos
const showCompleted = () => {
    const completed = todoList.filter( todo => todo.active == false);
    show(completed)
}

//borrar completos
const clearCompleted = () => {
    todoList = todoList.filter( todo => todo.active != false);
    show(todoList)

    btn.forEach( boton => {
        boton.classList.remove('selected')
        const selected = document.querySelector('.all');
        selected.classList.add('selected')
    })

}

todoFooter.addEventListener( 'click', e => {
    if(e.target.classList.contains('all')){
        show(todoList);    

    }else if(e.target.classList.contains('active')){
        showActive()    
    
    }else if(e.target.classList.contains('completed')){
        showCompleted();
    
    }else if(e.target.classList.contains('clear')){
        clearCompleted();
    }
})

inputTodo.addEventListener( 'keypress', e => {
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13 ){
        addNewTodo(inputTodo.value)
    }
})

//agregar nuevo todo
const addNewTodo = ( todo ) =>{
    if( todo.trim().length != 0 ){
        todoList.unshift( {task: `${todo}`, active: true} )
        inputTodo.value= '';
        show(todoList);
        count()
    }else{
        return false    
    }
}

content.addEventListener('click', (e) => {   
    if(e.target.classList.contains('circle') || e.target.classList.contains('text')){

        const nodo = e.target.parentNode;
        
        const span = nodo.querySelector('span');
        span.classList.toggle('bg');

        const img = nodo.querySelector('img')
        img.classList.toggle('visible');
        
        const text = nodo.querySelector('p')
        text.classList.toggle('outline');
        
        handleState(text.textContent)
    }else if( e.target.classList.contains('cross')){
        removeTask(e)
    }

})

const handleState = ( data ) => {
    todoList.map( todo => {
        if( todo.task == data){
            todo.active = !todo.active 
        }
    })
    count()
}

const removeTask = (e) => {
    const nodo = e.target.parentNode.querySelector('p').textContent

    todoList = todoList.filter( todo => todo.task != nodo)
    show(todoList)
    count()
}

btnCenter.addEventListener('click', (e) =>{
    btn.forEach( boton => {
        boton.classList.remove('selected')
        e.target.classList.add('selected')
    } )    
})

//cambiar estilos

icon.addEventListener( 'click', (e) => {
    const prueba = e.target.getAttribute('data-filter')

    handleStyles(prueba)
    
})

const handleStyles = ( data = 'light' ) => {
    if(data == 'light'){
        styles.setAttribute('href', `styles-${data}.css`)
        
        icon.setAttribute('data-filter', 'dark');
        icon.setAttribute('src', './images/icon-moon.svg');
    
    }else if( data == 'dark'){
        styles.setAttribute('href', `styles-${data}.css`)
        
        icon.setAttribute('data-filter', 'light');
        icon.setAttribute('src', './images/icon-sun.svg');
    }
}


const count = () => {
    const active = todoList.filter( todo => todo.active == true);
    const countActive = active.length
    
    item.innerHTML = `${countActive} item left`
}
count()