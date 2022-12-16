// tarihi alalım
const spanDate = document.getElementById("date");
const spanMonth = document.getElementById("month");
const spanYear = document.getElementById("year");
const spanWeekday = document.getElementById("weekday");

const todoContainer = document.getElementById('todo-container');

function loadbody(){
    const date = new Date();
    const month = date.toLocaleString('default', {month:'long'});
    const myDate = date.getDate();
    const year = date.getFullYear();
    const day = date.toLocaleString('default', {weekday: 'long'});
    spanDate.innerText = myDate;
    spanMonth.innerText = month;
    spanYear.innerText = year;
    spanWeekday.innerText = day;
}

// Greetings Time
var myDate = new Date();
var hrs = myDate.getHours();
var greet;
if(hrs < 12){
    greet = "Good Morning";
} else if (hrs >= 17 && hrs <= 24){
    greet = "Good Evening";
} else if (hrs >= 12 && hrs <=17){
    greet = " Good Afternoon";
}
document.getElementById('greetings').innerHTML = greet;

//retriving Username
auth.onAuthStateChanged(user => {
    const username = document.getElementById('username');
    if (user){
        db.collection('users').doc(user.uid).get().then((snapshot) => {
            username.innerText = snapshot.data().Name;
        })
    }
})

function renderData(individualDoc){
    // HTML yapısını biz oluşturacağız
    // parent div
    let parentDiv = document.createElement("li"); // <li> oluştur
    parentDiv.className = "w-100 todo-box"; // <div class="" bilgisi
    parentDiv.setAttribute('data-id', individualDoc.id); // id çekelim
    // todo div
    let todoDiv = document.createElement("p"); // <p> elementi oluşturuyoruz
    todoDiv.textContent = individualDoc.data().todos;
    // trash button
    let trash = document.createElement("button"); // buton oluştur
    let i = document.createElement("i"); // butonu ikon olarak göster
    i.className = "far fa-trash-alt"; // bootstrap class ekle
    trash.appendChild(i); // ikonu getir
    parentDiv.appendChild(todoDiv); // todo div yaz
    parentDiv.appendChild(trash); // çöp parametresini ekle
    todoContainer.appendChild(parentDiv); // bunları container içine ekle
    // trash click event
    trash.addEventListener("click", e => {
        let id = e.target.parentElement.parentElement.getAttribute('data-id');
        // değişkliği Firebase 'de uygula
        auth.onAuthStateChanged(user => {
            if(user){ // kullanıcı sil butonuna basınca todo sil
                db.collection(user.uid).doc(id).delete();
            }
        })
    })
}

// adding todos to firestore database
const form = document.getElementById('form');
let date = new Date();
let time = date.getTime();
let counter = time;

form.addEventListener("submit", e => {
    e.preventDefault();
    const todos = form['todos'].value;
    console.log(todos);
    let id = counter += 1;
    form.reset();
    auth.onAuthStateChanged(user => {
        if(user){
            db.collection(user.uid).doc('_' + id).set({
                id:'_' + id,
                todos
            }).then(() => {
                console.log("Todo added");
            }).catch(err => {
                console.log(err.message);
            })
        }
    })
})

// veriler ekrana da düşsün
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection(user.uid).onSnapshot((snapshot) =>{
            let changes = snapshot.docChanges();
            changes.forEach((change) => {
                if (change.type == "added"){
                    renderData(change.doc);
                } else if (change.type == "removed"){
                    let li = todoContainer.querySelector('[data-id =' + change.doc.id + ']');
                    todoContainer.removeChild(li);
                }
            })
        })
    }
})

// yetkisiz görüntülemeyi engelle
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user is signed in at users.html")
    } else {
        alert("your login session has expired or you have logged out, login again to continue");
        location = "login.html";
    }
})

// logout the user
function logout(){
    auth.signOut();
}
