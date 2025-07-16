// Obtener usuario actual desde localStorage
let usuario = JSON.parse(localStorage.getItem("usuarioActivo")) || null;
let transacciones = JSON.parse(localStorage.getItem("transacciones")) || [];

// Mostrar sección inicial
function cargarDashboard() {
  if (!usuario) {
    window.location.href = "index.html";
    return;
  }
  mostrarSeccion('resumen');
}

function mostrarSeccion(seccion) {
  const main = document.getElementById("contenido");
  main.innerHTML = "";

  if (seccion === "resumen") {
    main.innerHTML = `
      <section>
        <h2>Resumen de cuenta</h2>
        <p><strong>Nombre:</strong> ${usuario.nombres} ${usuario.apellidos}</p>
        <p><strong>Número de cuenta:</strong> ${usuario.cuenta}</p>
        <p><strong>Saldo actual:</strong> $${usuario.saldo.toLocaleString()}</p>
        <p><strong>Fecha de creación:</strong> ${usuario.fechaCreacion}</p>
      </section>
    `;
  }

  else if (seccion === "transacciones") {
    const ultimas = transacciones.filter(t => t.cuenta === usuario.cuenta).slice(-10).reverse();
    let html = `
      <section>
        <h2>Últimas transacciones</h2>
        <table border="1" width="100%">
          <tr><th>Fecha</th><th>Ref</th><th>Tipo</th><th>Concepto</th><th>Valor</th></tr>
          ${ultimas.map(t => `
            <tr>
              <td>${t.fecha}</td>
              <td>${t.referencia}</td>
              <td>${t.tipo}</td>
              <td>${t.concepto}</td>
              <td>$${t.valor.toLocaleString()}</td>
            </tr>
          `).join("")}
        </table>
        <button onclick="window.print()">Imprimir</button>
      </section>
    `;
    main.innerHTML = html;
  }

  else if (seccion === "consignacion") {
    main.innerHTML = `
      <section>
        <h2>Consignación electrónica</h2>
        <p><strong>Cuenta:</strong> ${usuario.cuenta}</p>
        <p><strong>Nombre:</strong> ${usuario.nombres} ${usuario.apellidos}</p>
        <input type="number" id="valorConsignar" placeholder="Valor a consignar">
        <button onclick="realizarConsignacion()">Consignar</button>
        <div id="resumenConsignacion"></div>
      </section>
    `;
  }

  else if (seccion === "retiro") {
    main.innerHTML = `
      <section>
        <h2>Retiro de dinero</h2>
        <p><strong>Cuenta:</strong> ${usuario.cuenta}</p>
        <p><strong>Nombre:</strong> ${usuario.nombres} ${usuario.apellidos}</p>
        <input type="number" id="valorRetiro" placeholder="Valor a retirar">
        <button onclick="realizarRetiro()">Retirar</button>
        <div id="resumenRetiro"></div>
      </section>
    `;
  }

  else if (seccion === "pago") {
    main.innerHTML = `
      <section>
        <h2>Pago de servicios públicos</h2>
        <p><strong>Cuenta:</strong> ${usuario.cuenta}</p>
        <p><strong>Nombre:</strong> ${usuario.nombres} ${usuario.apellidos}</p>
        <select id="servicio">
          <option value="">Selecciona servicio</option>
          <option value="Energía">Energía</option>
          <option value="Agua">Agua</option>
          <option value="Gas Natural">Gas Natural</option>
          <option value="Internet">Internet</option>
        </select>
        <input type="text" id="refPago" placeholder="Referencia del servicio">
        <input type="number" id="valorPago" placeholder="Valor a pagar">
        <button onclick="realizarPago()">Pagar</button>
        <div id="resumenPago"></div>
      </section>
    `;
  }

  else if (seccion === "extracto") {
    main.innerHTML = `
      <section>
        <h2>Extracto bancario</h2>
        <input type="number" id="anio" placeholder="Año (2025)">
        <input type="number" id="mes" placeholder="Mes (1 a 12)">
        <button onclick="generarExtracto()">Generar extracto</button>
        <div id="resultadoExtracto"></div>
      </section>
    `;
  }

  else if (seccion === "certificado") {
    main.innerHTML = `
      <section>
        <h2>Certificado bancario</h2>
        <div id="certificado">
          <p>Se certifica que <strong>${usuario.nombres} ${usuario.apellidos}</strong> identificado con número de cuenta <strong>${usuario.cuenta}</strong> posee una cuenta activa en Banco Acme desde el día <strong>${usuario.fechaCreacion}</strong>.</p>
          <p>Este certificado se expide a solicitud del interesado.</p>
          <br><br>
          <p>Atentamente,</p>
          <p><strong>Banco Acme</strong></p>
        </div>
        <button onclick="window.print()">Imprimir certificado</button>
      </section>
    `;
  }
}

function generarReferencia() {
  return "REF" + Math.floor(100000 + Math.random() * 900000);
}

function guardarTransaccion(transaccion) {
  transacciones.push(transaccion);
  localStorage.setItem("transacciones", JSON.stringify(transacciones));
}

function actualizarUsuario() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios"));
  usuarios = usuarios.map(u => u.cuenta === usuario.cuenta ? usuario : u);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
}

function realizarConsignacion() {
  const valor = parseFloat(document.getElementById("valorConsignar").value);

  if (isNaN(valor) || valor <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Valor inválido',
      text: 'Por favor ingresa un número mayor a cero.',
    });
    return;
  }

  const ref = generarReferencia();
  const transaccion = {
    cuenta: usuario.cuenta,
    fecha: new Date().toLocaleDateString(),
    referencia: ref,
    tipo: "Consignación",
    concepto: "Consignación por canal electrónico",
    valor
  };

  usuario.saldo += valor;
  guardarTransaccion(transaccion);
  actualizarUsuario();

  Swal.fire({
    icon: 'success',
    title: 'Consignación Exitosa',
    html: `
      <p>Ref: <strong>${ref}</strong></p>
      <p>Valor: <strong>$${valor.toLocaleString()}</strong></p>
      <p>Nuevo saldo: <strong>$${usuario.saldo.toLocaleString()}</strong></p>
    `,
    confirmButtonText: 'Aceptar'
  });

  document.getElementById("resumenConsignacion").innerHTML = `
    <p>Consignación exitosa:</p>
    <ul>
      <li>Ref: ${ref}</li>
      <li>Valor: $${valor.toLocaleString()}</li>
      <li>Nuevo saldo: $${usuario.saldo.toLocaleString()}</li>
    </ul>
    <button onclick="window.print()">Imprimir</button>
  `;
}


function realizarRetiro() {
  const valor = parseFloat(document.getElementById("valorRetiro").value);

  if (isNaN(valor) || valor <= 0 || valor > usuario.saldo) {
    Swal.fire({
      icon: 'error',
      title: 'Error en el retiro',
      text: 'Saldo insuficiente o valor inválido.',
    });
    return;
  }

  const ref = generarReferencia();
  const transaccion = {
    cuenta: usuario.cuenta,
    fecha: new Date().toLocaleDateString(),
    referencia: ref,
    tipo: "Retiro",
    concepto: "Retiro de dinero",
    valor
  };

  usuario.saldo -= valor;
  guardarTransaccion(transaccion);
  actualizarUsuario();

  Swal.fire({
    icon: 'success',
    title: 'Retiro Exitoso',
    html: `
      <p>Ref: <strong>${ref}</strong></p>
      <p>Valor: <strong>$${valor.toLocaleString()}</strong></p>
      <p>Nuevo saldo: <strong>$${usuario.saldo.toLocaleString()}</strong></p>
    `,
    confirmButtonText: 'Aceptar'
  });

  document.getElementById("resumenRetiro").innerHTML = `
    <p>Retiro exitoso:</p>
    <ul>
      <li>Ref: ${ref}</li>
      <li>Valor: $${valor.toLocaleString()}</li>
      <li>Nuevo saldo: $${usuario.saldo.toLocaleString()}</li>
    </ul>
    <button onclick="window.print()">Imprimir</button>
  `;
}


function realizarPago() {
  const servicio = document.getElementById("servicio").value;
  const refPago = document.getElementById("refPago").value;
  const valor = parseFloat(document.getElementById("valorPago").value);

  if (!servicio || !refPago || isNaN(valor) || valor <= 0 || valor > usuario.saldo) {
    Swal.fire({
      icon: 'error',
      title: 'Error en el pago',
      text: 'Datos inválidos o saldo insuficiente.',
    });
    return;
  }

  const ref = generarReferencia();
  const transaccion = {
    cuenta: usuario.cuenta,
    fecha: new Date().toLocaleDateString(),
    referencia: ref,
    tipo: "Retiro",
    concepto: `Pago de servicio público ${servicio}`,
    valor
  };

  usuario.saldo -= valor;
  guardarTransaccion(transaccion);
  actualizarUsuario();

  Swal.fire({
    icon: 'success',
    title: 'Pago Exitoso',
    html: `
      <p>Servicio: <strong>${servicio}</strong></p>
      <p>Referencia de pago: <strong>${refPago}</strong></p>
      <p>Monto: <strong>$${valor.toLocaleString()}</strong></p>
      <p>Nuevo saldo: <strong>$${usuario.saldo.toLocaleString()}</strong></p>
    `,
    confirmButtonText: 'Aceptar'
  });

  document.getElementById("resumenPago").innerHTML = `
    <p>Pago exitoso:</p>
    <ul>
      <li>Servicio: ${servicio}</li>
      <li>Referencia: ${refPago}</li>
      <li>Monto: $${valor.toLocaleString()}</li>
      <li>Nuevo saldo: $${usuario.saldo.toLocaleString()}</li>
    </ul>
    <button onclick="window.print()">Imprimir</button>
  `;
}


function generarExtracto() {
  const anio = parseInt(document.getElementById("anio").value);
  const mes = parseInt(document.getElementById("mes").value);

  if (!anio || !mes || mes < 1 || mes > 12) {
    Swal.fire({
      icon: 'error',
      title: 'Datos inválidos',
      text: 'Por favor ingresa un mes (1-12) y un año válidos.',
    });
    return;
  }

  const resultado = document.getElementById("resultadoExtracto");
  const movimientos = transacciones.filter(t => {
    const [d, m, y] = t.fecha.split("/");
    return parseInt(y) === anio && parseInt(m) === mes && t.cuenta === usuario.cuenta;
  });

  if (movimientos.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Sin movimientos',
      text: 'No hay movimientos registrados para ese periodo.',
    });
    resultado.innerHTML = "";
    return;
  }

  resultado.innerHTML = `
    <table border="1" width="100%">
      <tr><th>Fecha</th><th>Ref</th><th>Tipo</th><th>Concepto</th><th>Valor</th></tr>
      ${movimientos.map(t => `
        <tr>
          <td>${t.fecha}</td>
          <td>${t.referencia}</td>
          <td>${t.tipo}</td>
          <td>${t.concepto}</td>
          <td>$${t.valor.toLocaleString()}</td>
        </tr>
      `).join("")}
    </table>
    <button onclick="window.print()">Imprimir</button>
  `;
}


function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "index.html";
}

// --- NUEVO: Manejo de menú lateral ---
document.addEventListener('DOMContentLoaded', function() {
  // Elementos del menú hamburguesa
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const sidebar = document.getElementById('sidebar');
  
  // Crear overlay para cerrar menú
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  // Toggle del menú hamburguesa
  hamburgerMenu.addEventListener('click', function() {
    hamburgerMenu.classList.toggle('active');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en overlay
  overlay.addEventListener('click', function() {
    hamburgerMenu.classList.remove('active');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Asignar eventos a los items del menú
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      const section = this.getAttribute('data-section');
      
      // Cerrar menú en móviles después de seleccionar opción
      if (window.innerWidth <= 768) {
        hamburgerMenu.classList.remove('active');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
      }
      
      if (section === 'cerrar-sesion') {
        localStorage.removeItem('usuarioActivo');
        window.location.href = 'Login.html';
      } else if (section === 'resumen-cuenta') {
        mostrarSeccion('resumen');
      } else if (section === 'transacciones') {
        mostrarSeccion('transacciones');
      } else if (section === 'consignacion') {
        mostrarSeccion('consignacion');
      } else if (section === 'retiro') {
        mostrarSeccion('retiro');
      } else if (section === 'pago-servicios') {
        mostrarSeccion('pago');
      } else if (section === 'extracto') {
        mostrarSeccion('extracto');
      } else if (section === 'certificado') {
        mostrarSeccion('certificado');
      }
    });
  });

  // Mostrar sección inicial
  cargarDashboard();
});
