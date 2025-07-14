document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("Login");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const tipoID = document.getElementById("typeID").value;
        const numeroID = document.getElementById("NumberID").value;
        const email = document.getElementById("email").value;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuarioIndex = usuarios.findIndex(
            (u) =>
                u.tipoID === tipoID &&
                u.numeroID === numeroID &&
                u.email === email
        );

        if (usuarioIndex === -1) {
            alert("Usuario no encontrado. Verifica tus datos.");
            return;
        }

        const nuevaContraseña = prompt("Escribe tu nueva contraseña:");

        if (!nuevaContraseña || nuevaContraseña.length < 4) {
            alert("Contraseña no válida. Debe tener al menos 4 caracteres.");
            return;
        }

        usuarios[usuarioIndex].password = nuevaContraseña;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Contraseña actualizada correctamente.");
        form.reset();

        // Redirección al login
        window.location.href = "../index/Login.html";
    });
});
