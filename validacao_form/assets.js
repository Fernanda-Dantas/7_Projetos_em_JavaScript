const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkInput();
});

function checkInput() {
  const usernameValue = username.value.trim(); 
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordTwoValue = password2.value.trim();

  if(usernameValue === '') {
    setErrorFor(username, 'Username inválido');
  } else {
   
    setSuccessFor(username);
  };

  if(emailValue === '') {
    setErrorFor(email, 'Insira um email');
  } else if(!isEmail(emailValue)) {
    setErrorFor(email, 'Email inválido');
  } else {
     
      setSuccessFor(email);
  };

  if(passwordValue === '') {
    setErrorFor(password, 'Senha não pode estar em branco');
  } else {
    setSuccessFor(password);
  };

  if(passwordTwoValue === '') {
    setErrorFor(password2, 'Senha não pode estar em branco');
  } else if(passwordValue !== passwordTwoValue) {
    setErrorFor(password2, 'As senhas não são iguais');
  } else {
    setSuccessFor(password2);
  }
};

function setErrorFor(input, message) {
  const formControl = input.parentElement; 
  const small = formControl.querySelector('small');

  small.innerText = message;

  formControl.className = 'form-control error';
}

function setSuccessFor(input) {
  const formControl = input.parentElement; 
  formControl.className = 'form-control success';
};

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};


