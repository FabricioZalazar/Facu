let arrayUsers=[];

function getUser() {
    fetch('https://randomuser.me/api/').
        then(response => response.json()).
        then(users => {
            let user = users.results[0];
            let userName = user.name.first + ' ' + user.name.last;
            let userImg = user.picture.thumbnail;
            let userGender= user.gender;

            let liUsers = `<li><img src='${userImg}'> 
                           <h6>Nombre:${userName}</h6>
                           <input onclick='borrarItem(this)' type="button" value="Eliminar"> 
                           </li>`
            document.getElementById('listaUsers').innerHTML += liUsers;
            arrayUsers.push(user);
        })
        

}

function borrarItem(ele){
    parent = ele.parentElement;
    arrayUsers.pop(parent);
    parent.remove();

}

document.querySelector('input').addEventListener('click', getUser);
document.querySelectorAll('input[name="genero"]').forEach(radio=>
    radio.addEventListener('change',function(){
        let genero  = radio.value;
        let userFiltrados = arrayUsers.filter(user => user.gender === genero);
        liUsers = '';
        userFiltrados.forEach(user=>{
            liUsers += `<li><img src='${user.picture.thumbnail}'> 
                           <h6>Nombre:${user.name.first + ' ' + user.name.last}</h6>
                           <input onclick='borrarItem(this)' type="button" value="Eliminar"> 
                           </li>`
          
    })
document.getElementById('listaUsers').innerHTML = liUsers;}));
