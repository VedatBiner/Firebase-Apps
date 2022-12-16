const loginform = document.getElementById('login-form');
loginform.addEventListener('submit', e=>{
    e.preventDefault();
    const loginemail = loginform['login-email'].value;
    const loginpassword = loginform['login-password'].value;
    auth.signInWithEmailAndPassword(loginemail, loginpassword).then(()=>{
        console.log("success");
        location="users.html";
    }).catch(err=>{
        console.log(err.message);
        const signupForm = document.getElementById('signupError');
        signupError.innerText = err.message;
    })
})
