document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const tipoId = document.getElementById('typeID').value;
    const numeroId = document.getElementById('numberid').value;
    const password = document.getElementById('password').value;
  
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
    const usuario = usuarios.find(u =>
      u.tipoId === tipoId &&
      u.numeroId === numeroId &&
      u.password === password
    );
  
    if (usuario) {
      localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
      window.location.href = 'dashboard.html';
    } else {
      document.getElementById('mensaje').innerText = 'Credenciales incorrectas. Intenta de nuevo.';
    }
  });