let lista = document.querySelector('#conteudos');

let ul = document.querySelector('#lista');

let btn = document.querySelector('#btn');
btn.addEventListener('click', function() {

    let array_list = lista.value.split(',');

    console.log(lista);
    console.log(array_list);

    array_list.forEach(element => {
        
        let li = document.createElement('li');
        li.textContent = element;
        console.log(element);

        ul.appendChild(li);

    });
})

