document.addEventListener("DOMContentLoaded", () => {
  const usuariosLink = document.getElementById('usuarios-link');
  const reservasLink = document.getElementById('reservas-link');
  const paquetesLink = document.getElementById('paquetes-link');
  const opinionesLink = document.getElementById('opiniones-link');

  const usuariosSection = document.getElementById('usuarios-section');
  const reservasSection = document.getElementById('reservas-section');
  const paquetesSection = document.getElementById('paquetes-section');
  const opinionesSection = document.getElementById('opiniones-section');

  function mostrarSeccion(seccion) {
      usuariosSection.classList.remove('active');
      reservasSection.classList.remove('active');
      paquetesSection.classList.remove('active');
      opinionesSection.classList.remove('active');

      seccion.classList.add('active');
  }

  usuariosLink.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarSeccion(usuariosSection);
      obtenerUsuarios();
  });

  reservasLink.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarSeccion(reservasSection);
      obtenerReservas();
  });

  paquetesLink.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarSeccion(paquetesSection);
      obtenerPaquetes();
  });

  opinionesLink.addEventListener('click', (e) => {
      e.preventDefault();
      mostrarSeccion(opinionesSection);
      obtenerOpiniones();
  });

  mostrarSeccion(usuariosSection)
  obtenerUsuarios()
})

function obtenerUsuarios() {
  fetch("http://localhost:3000/api/usuarios")
      .then(response => response.json())
      .then(data => {
          const tabla = document.querySelector("#usuarios_tabla tbody");
          tabla.innerHTML = '';
          data.forEach(usuario => {
              const fila = document.createElement("tr");

              fila.innerHTML = `
                  <td>${usuario.id}</td>
                  <td>${usuario.nombre}</td>
                  <td>${usuario.apellido}</td>
                  <td>${usuario.email}</td>
                  <td>id_reserva: ${usuario.reservas && usuario.reservas.length > 0 ? usuario.reservas[0].id : 'Sin reservas'}</td>
                  <td>id_opinion: ${usuario.opiniones && usuario.opiniones.length > 0 ? usuario.opiniones[0].id : 'Sin opiniones'}</td>
                  <td><a href="#" class="eliminar" data-id="${usuario.id}">Eliminar</a></td>
                  <td><a href="#" class="modificar" data-id="${usuario.id}">Modificar</a></td>
              `;
              
              const eliminarBtn = fila.querySelector('.eliminar');
              eliminarBtn.addEventListener('click', () => {
                  eliminarUsuario(usuario.id);
              });

              const modificarBtn = fila.querySelector('.modificar');
              modificarBtn.addEventListener('click', () => {
                  modificarUsuario(usuario.id)
              });

              tabla.appendChild(fila);
          });
      })
      .catch(error => {
          console.error('Error al obtener los usuarios:', error);
      });
}

function eliminarUsuario(id) {
    fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(data => { 
                throw new Error(data.message) })
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuario eliminado:', data);
        alert('Usuario eliminado con éxito.');
        obtenerUsuarios()
    })
    .catch(error => {
        console.error('Error al eliminar usuario:', error);
        alert('Error al eliminar usuario: ' + error.message);
    });
}

function obtenerReservas() {
  fetch("http://localhost:3000/api/reservas")
      .then(response => response.json())
      .then(data => {
        console.log(data.results)
          const reservas = data.results
          const tabla = document.querySelector("#reservas_tabla tbody");
          tabla.innerHTML = '';
          reservas.forEach(reserva => {
              const fila = document.createElement("tr");

              fila.innerHTML = `
                  <td>${reserva.id}</td>
                  <td>${reserva.fecha}</td>
                  <td>${reserva.pagada}</td>
                  <td>${reserva.cantidad}</td>
                  <td>${reserva.paquete.id}</td>
              `;
              tabla.appendChild(fila);
          });
      })
      .catch(error => {
          console.error('Error al obtener las reservas:', error);
      });
}

function obtenerPaquetes() {
  fetch("http://localhost:3000/api/paquetes")
      .then(response => response.json())
      .then(data => {
          const paquetes = data.data
          console.log(paquetes)
          const tabla = document.querySelector("#paquetes_tabla tbody")
          tabla.innerHTML = ''
          
          paquetes.forEach(paquete => {
              const fila = document.createElement("tr")

              let opinionesIds = ''
              let reservasIds = ''

              paquete.opiniones.forEach(opinion => {
                  opinionesIds += `${opinion.id}, `
              });

              paquete.reservas.forEach(reserva => {
                  reservasIds += `${reserva.id}, `
              });

              opinionesIds = opinionesIds.trim().slice(0, -1);
              reservasIds = reservasIds.trim().slice(0, -1);

              fila.innerHTML = `
                  <td>${paquete.id}</td>
                  <td>${paquete.nombre}</td>
                  <td>${paquete.descripcion}</td>
                  <td>U$D ${paquete.costo}</td>
                  <td>id's: ${opinionesIds}</td>
                  <td>id's: ${reservasIds}</td>
                  
              `
              tabla.appendChild(fila)
          })
      })
      .catch(error => {
          console.error('Error al obtener los paquetes:', error)
      })
}


function obtenerOpiniones() {
  fetch("http://localhost:3000/api/opiniones")
      .then(response => response.json())
      .then(data => {
        const opiniones = data.results
        console.log(data)
          const tabla = document.querySelector("#opiniones_tabla tbody");
          tabla.innerHTML = '';
          opiniones.forEach(opinion => {
              const fila = document.createElement("tr");

              fila.innerHTML = `
                  <td>${opinion.id}</td>
                  <td>${opinion.fecha}</td>
                  <td>${opinion.comentario}</td>
                  <td>${opinion.calificacion}</td>
                  <td>${opinion.paquete_id}</td>
              `;
              tabla.appendChild(fila);
          });
      })
      .catch(error => {
          console.error('Error al obtener las opiniones:', error);
      });
}
