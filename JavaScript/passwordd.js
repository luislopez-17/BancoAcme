document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const tipoId = document.getElementById("typeID").value;
    const numeroId = document.getElementById("NumberID").value;
    const correo = document.getElementById("email").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioIndex = usuarios.findIndex(
        (u) =>
            u.tipoId === tipoId &&
            u.numeroId === numeroId &&
            u.correo === correo
    );

    if (usuarioIndex === -1) {
        Swal.fire({
            icon: 'error',
            title: 'Usuario no encontrado',
            text: 'Verifica tus datos e inténtalo de nuevo.',
        });
        return;
    }

    const { value: nuevaContraseña } = await Swal.fire({
        title: 'Nueva contraseña',
        input: 'password',
        inputLabel: 'Escribe tu nueva contraseña',
        inputPlaceholder: 'Mínimo 4 caracteres',
        inputAttributes: {
            minlength: 4,
            autocapitalize: 'off',
            autocorrect: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: (value) => {
            if (!value || value.length < 4) {
                Swal.showValidationMessage('Debe tener al menos 4 caracteres');
            }
        }
    });

    if (!nuevaContraseña) return;

    usuarios[usuarioIndex].password = nuevaContraseña;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire({
        icon: 'success',
        title: 'Contraseña actualizada',
        text: 'Tu contraseña fue cambiada exitosamente.',
        confirmButtonText: 'Continuar'
    }).then(() => {
        form.reset();
        window.location.href = "../Index/Login.html";
    });
});

});
