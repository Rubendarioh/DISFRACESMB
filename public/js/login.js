document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '12345') {
        document.getElementById('login-form').classList.add('ocultar');
        document.getElementById('product-form').classList.remove('ocultar');
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});
