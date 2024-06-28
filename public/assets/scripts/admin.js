
function obtenerUsuarios() {
  fetch("http://localhost:3000/api/usuarios")
    .then((response) => response.json())
    .then((data) => {
      const usuarios = data;
      console.log(usuarios);
      
      const tabla = document.querySelector("#usuarios_tabla tbody");
      tabla.innerHTML = ''
      usuarios.forEach(usuario => {
        const fila = document.createElement("tr");

        const celdaId = document.createElement("td");
        celdaId.textContent = usuario.id;
        fila.appendChild(celdaId);

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = usuario.nombre;
        fila.appendChild(celdaNombre);

        const celdaApellido = document.createElement("td");
        celdaApellido.textContent = usuario.apellido;
        fila.appendChild(celdaApellido);

        const celdaEmail = document.createElement("td");
        celdaEmail.textContent = usuario.email;
        fila.appendChild(celdaEmail);

        const celdaContrasena = document.createElement("td");
        celdaContrasena.textContent = usuario.contrasena; 
        fila.appendChild(celdaContrasena);

        const celdaReservas = document.createElement("td");
        celdaReservas.textContent = usuario.reservas;
        fila.appendChild(celdaReservas);

        const celdaOpiniones = document.createElement("td");
        celdaOpiniones.textContent = usuario.opiniones;
        fila.appendChild(celdaOpiniones);

        tabla.appendChild(fila);
       
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  obtenerUsuarios();
  