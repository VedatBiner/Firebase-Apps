// tarihi alalım
const spanDate = document.getElementById("date");
const spanMonth = document.getElementById("month");
const spanYear = document.getElementById("year");
const spanWeekday = document.getElementById("weekday");

function loadbody(){
    const date = new Date();
    const month = date.toLocaleString('default', {month:'long'});
    const myDate = date.getDate();
    const year = date.getFullYear();
    const day = date.toLocaleString('default', {weekday: 'long'});
    spanDate.innerText = myDate;
    spanMonth.innerText = month;
    spanYear.innerText = year + ",";
    spanWeekday.innerText = day;
}

// index.html içindeki form parametresindne çekelim.
const signupForm = document.getElementById("signup-form");

signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = signupForm['name'].value;
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;

    signupForm.reset(); // sayfayı temizle
    auth.createUserWithEmailAndPassword(email, password).then((cred)=>{
        return db.collection('users').doc(cred.user.uid).set({
            Name: name,
            Email: email,
            Password: password
        })   
    }).then(()=>{
        console.log("Success");
        location="login.html";
    }).catch(err=>{
        console.log(err.message);
        const signupForm = document.getElementById('signupError');
        signupError.innerText = err.message;
    })
})

