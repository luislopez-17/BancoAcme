# 💼 Banco Acme - Aplicación Web de Autogestión Bancaria

La presente aplicación es un proyecto web desarrollado con fines educativos que simula la autogestión de cuentas bancarias por parte de los usuarios. El Banco Acme busca ofrecer una plataforma amigable, segura y funcional para sus clientes, facilitando operaciones bancarias básicas desde cualquier dispositivo.

---

## 📌 Funcionalidades Principales

### 🔐 Página de Inicio de Sesión
- Formulario que solicita:
  - Tipo de Identificación
  - Número de Identificación
  - Contraseña
- Verifica credenciales y redirige al **Dashboard** si son correctas.
- Enlaces adicionales:
  - **Crear cuenta** → Redirecciona al formulario de registro.
  - **¿Olvidaste tu contraseña?** → Redirecciona al formulario de recuperación.

---

### 📝 Formulario de Registro
Permite a nuevos usuarios crear su cuenta bancaria. Solicita los siguientes datos:
- Tipo y número de identificación
- Nombres, apellidos, género
- Teléfono, correo, dirección, ciudad
- Contraseña

✅ Al completar el formulario:
- Se genera automáticamente un **número de cuenta bancaria** y fecha de creación.
- Se muestra un **resumen con los datos registrados**.
- Botón para **volver al login** o **cancelar registro**.

---

### 🔑 Recuperación de Contraseña
Formulario dividido en 2 etapas:
1. Verificación: Solicita tipo y número de identificación, y correo electrónico.
2. Si los datos coinciden, muestra un nuevo formulario para **asignar nueva contraseña**.

Incluye botón para **cancelar y volver al login**.

---

## 🧾 Dashboard (Panel Principal)

Una vez autenticado, el usuario accede a un **menú interactivo** con las siguientes opciones:

### 🧮 Resumen de Cuenta
- Muestra número de cuenta, nombre completo, y fecha de creación.
- Estilizado en una tarjeta visible.

### 📊 Resumen de Transacciones
- Muestra las **10 últimas transacciones** con:
  - Fecha
  - Referencia
  - Tipo
  - Concepto
  - Valor
- Botón para **imprimir el resumen**.

### 💵 Consignación Electrónica
- Muestra nombre y número de cuenta.
- Formulario para ingresar el **monto a consignar**.
- Al enviar:
  - Se genera un registro con todos los detalles.
  - Se actualiza el saldo.
  - Se muestra un resumen con botón para **imprimir**.

### 💸 Retiro de Dinero
- Muestra datos del usuario.
- Solicita monto a retirar.
- Registra la transacción, **disminuye el saldo**, y genera resumen imprimible.

### 🧾 Pago de Servicios Públicos
- Formulario con:
  - Selección del servicio (Energía, Agua, Gas, Internet)
  - Número de referencia
  - Valor del pago
- Disminuye el saldo, genera resumen e impresión.

### 📅 Extracto Bancario
- Solicita año y mes.
- Muestra todos los movimientos de ese periodo.

### 🧾 Certificado Bancario
- Muestra un certificado formal que confirma:
  - Existencia de cuenta activa
  - Nombre del usuario
  - Fecha de creación

### 🚪 Cerrar Sesión
- Finaliza la sesión y redirige al inicio de sesión.

---

## 🎨 Diseño UI/UX

- ✅ **Responsive**: Adaptado para móviles, tablets y escritorio.
- 🖋️ **Tipografía**: Moderna y clara (recomendado Google Fonts).
- 🎨 **Paleta de Colores**: dorado y negro.
- ⚠️ **Mensajes** de error y éxito bien definidos y visibles.
- ✔️ Validación en tiempo real en todos los formularios.

---

## 🛠️ Tecnologías Usadas

- **HTML5**  
- **CSS**  
- **JavaScript**  
- **SweetAlert2** (alertas visuales)  
- **LocalStorage** (persistencia de datos en el navegador)  





