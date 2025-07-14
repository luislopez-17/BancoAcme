document.getElementById('registroForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Limpiar mensaje previo
    document.getElementById('mensaje').innerText = "";
  
    const datos = {
      tipoId: document.getElementById('typeID').value,
      numeroId: document.getElementById('numberid').value,
      nombres: document.getElementById('name').value,
      apellidos: document.getElementById('surnames').value,
      genero: document.getElementById('gender').value,
      telefono: document.getElementById('phone').value,
      correo: document.getElementById('email').value,
      direccion: document.getElementById('direction').value, // corregido 'Direction'
      ciudad: document.getElementById('city').value,
      password: document.getElementById('password').value,
      confirmpassword: document.getElementById("ConfirmPassword").value,
      cuenta: Math.floor(1000000000 + Math.random() * 9000000000),
      saldo: 0,
      fechaCreacion: new Date().toLocaleDateString("es-CO"),
      transacciones: []
    };
  
    // Validación de contraseñas
    if (datos.password !== datos.confirmpassword) {
      document.getElementById('mensaje').innerText = "Las contraseñas no coinciden.";
      return;
    }
  
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
    // Validar por número de identificación correctamente
    if (usuarios.find(u => u.numeroId === datos.numeroId)) {
      document.getElementById('mensaje').innerText = "El usuario ya está registrado.";
      return;
    }
  
    usuarios.push(datos);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
    alert(`Cuenta creada exitosamente.\nTu número de cuenta es: ${datos.cuenta}`);
    window.location.href = "../Index/Login.html";
  });
  