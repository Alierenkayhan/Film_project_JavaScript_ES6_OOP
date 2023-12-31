const form = document.getElementById("film-form");
const titleElement =   document.querySelector("#title");
const directorElement =   document.querySelector("#director");
const urlElement =   document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

// //UI objesini başlatma
// const ui = new UI();

// //Storage objesi üret
// const storage = new Storage();


//Tüm eventleri yükleme
eventListeners();
function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });
    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if(title === "" || director === "" || url === ""){
        UI.displayMessages("Tüm alanları doldurun...","danger");
    }
    else{
        //yeni film
        const newFilm = new Film(title,director,url);
        ui.addFilmToUI(newFilm); //Arayüze film ekleme
        Storage.addFilmToStorage(newFilm); //Storage'a film ekleme
        UI.displayMessages("Film başarıyla eklendi...","success");
    }
    ui.clearInputs(titleElement,urlElement,directorElement);
    e.preventDefault();
}
function deleteFilm(e){
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("Silme işlemi başarılı...","success");
    }
}
function clearAllFilms(){
    if(confirm("Emin misiniz ?")){
       UI.clearAllFilmsFromUI();
       Storage.clearAllFilmsFromStorage(); 
    }
    
}