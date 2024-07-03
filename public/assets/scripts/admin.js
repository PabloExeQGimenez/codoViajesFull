document.addEventListener("DOMContentLoaded", () => {
  
  if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
    return;
  }

  const usuariosLink = document.getElementById("usuarios-link");
  const reservasLink = document.getElementById("reservas-link");
  const paquetesLink = document.getElementById("paquetes-link");
  const opinionesLink = document.getElementById("opiniones-link");

  const usuariosSection = document.getElementById("usuarios-section");
  const reservasSection = document.getElementById("reservas-section");
  const paquetesSection = document.getElementById("paquetes-section");
  const opinionesSection = document.getElementById("opiniones-section");

  function mostrarSeccion(seccion) {
    usuariosSection.classList.remove("active");
    reservasSection.classList.remove("active");
    paquetesSection.classList.remove("active");
    opinionesSection.classList.remove("active");

    seccion.classList.add("active");
  }

  usuariosLink.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarSeccion(usuariosSection);
    obtenerUsuarios();
  });

  reservasLink.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarSeccion(reservasSection);
    obtenerReservas();
  });

  paquetesLink.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarSeccion(paquetesSection);
    obtenerPaquetes();
  });

  opinionesLink.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarSeccion(opinionesSection);
    obtenerOpiniones();
  });

  mostrarSeccion(usuariosSection);
  obtenerUsuarios();
});

function obtenerUsuarios() {
  fetch("http://localhost:3000/api/usuarios")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const tabla = document.querySelector("#usuarios_tabla tbody");
      tabla.innerHTML = "";

      data.forEach((usuario) => {
        const fila = document.createElement("tr");

        const reservasUnicas = new Set();
        if (usuario.reservas && usuario.reservas.length > 0) {
          usuario.reservas.forEach((reserva) => reservasUnicas.add(reserva.id));
        }
        const reservasIds = reservasUnicas.size > 0
          ? Array.from(reservasUnicas).join(", ")
          : "Sin reservas";

        const opinionesUnicas = new Set();
        if (usuario.opiniones && usuario.opiniones.length > 0) {
          usuario.opiniones.forEach((opinion) => opinionesUnicas.add(opinion.comentario));
        }
        const opinionesIds = opinionesUnicas.size > 0
          ? Array.from(opinionesUnicas).join("<hr>")
          : "Sin opiniones";

        fila.innerHTML = `
          <td>${usuario.id}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.apellido}</td>
          <td>${usuario.email}</td>
          <td>${reservasIds}</td>
          <td>${opinionesIds}</td>
          <td><a href="#" class="eliminar" data-id="${usuario.id}">Eliminar</a></td>
        `;

        const eliminarBtn = fila.querySelector(".eliminar");
        eliminarBtn.addEventListener("click", () => {
          eliminarUsuario(usuario.id);
        });

        tabla.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al obtener los usuarios:", error);
    });
}


function eliminarUsuario(id) {
  fetch(`http://localhost:3000/api/usuarios/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Usuario eliminado:", data);
      alert("Usuario eliminado con éxito.");
      obtenerUsuarios();
    })
    .catch((error) => {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario: " + error.message);
    });
}

function obtenerReservas() {
  fetch("http://localhost:3000/api/reservas")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.results);
      const reservas = data.results;
      const tabla = document.querySelector("#reservas_tabla tbody");
      tabla.innerHTML = "";
      reservas.forEach((reserva) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
                  <td>${reserva.id}</td>
                  <td>${reserva.fecha}</td>
                  <td>${reserva.pagada ? "Si" : "No"}</td>
                  <td>${reserva.cantidad}</td>
                  <td>${reserva.paquete.nombre}</td>
                  <td><a href="#" class="pagar">Pagar</a></td>
                  `;

        const pagarBtn = fila.querySelector(".pagar");
        pagarBtn.addEventListener("click", () => {
          buyReserva(reserva.id);
        });
        tabla.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al obtener las reservas:", error);
    });
}

function buyReserva(id) {
  fetch(`http://localhost:3000/api/reservas/${id}/pagar`, {
    method: "PUT",
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Error al procesar la reserva");
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Reserva pagada:", data);
      alert("Reserva pagada con éxito.");
      obtenerReservas();
    })
    .catch((error) => {
      console.error("Error al pagar la reserva:", error);
      alert("Error al pagar la reserva: " + error.message);
    });
}

function eliminarPaquete(id) {
  if (confirm("¿Estás seguro que deseas eliminar este paquete?")) {
    fetch(`http://localhost:3000/api/paquetes/eliminar/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al eliminar el paquete de viaje");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Paquete de viaje eliminado:", data);
        alert("Paquete de viaje eliminado con éxito.");
        obtenerPaquetes(); 
      })
      .catch((error) => {
        console.error("Error al eliminar el paquete de viaje:", error);
        alert("Error al eliminar el paquete de viaje: " + error.message);
      });
  }
}

function obtenerPaquetes() {
  fetch("http://localhost:3000/api/paquetes")
    .then((response) => response.json())
    .then((data) => {
      const paquetes = data.data;
      console.log(paquetes);
      const tabla = document.querySelector("#paquetes_tabla tbody");
      tabla.innerHTML = "";

      paquetes.forEach((paquete) => {
        const fila = document.createElement("tr");

        let opinionesIds = "";
        let reservasIds = "";

        paquete.opiniones.forEach((opinion) => {
          opinionesIds += `${opinion.id}, `;
        });

        paquete.reservas.forEach((reserva) => {
          reservasIds += `${reserva.id}, `;
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
                  <td><a href="#" class="eliminar" data-id="${paquete.id}">Eliminar</a></td>    
              `;

        const eliminarBtn = fila.querySelector(".eliminar");
        eliminarBtn.addEventListener("click", () => {
          eliminarPaquete(paquete.id);
        });
        tabla.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al obtener los paquetes:", error);
    });
}

function obtenerOpiniones() {
  fetch("http://localhost:3000/api/opiniones")
    .then((response) => response.json())
    .then((data) => {
      const opiniones = data.results;
      console.log(data);
      const tabla = document.querySelector("#opiniones_tabla tbody");
      tabla.innerHTML = "";
      opiniones.forEach((opinion) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
                  <td>${opinion.id}</td>
                  <td>${opinion.fecha}</td>
                  <td>${opinion.comentario}</td>
                  <td>${opinion.calificacion}</td>
                  <td>${opinion.paquete.nombre}</td>
              `;
        tabla.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al obtener las opiniones:", error);
    });
}


const crearPaqueteForm = document.getElementById("formularioPaquete");

crearPaqueteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(formularioPaquete);
  const nombre = formData.get("nombre");
  const descripcion = formData.get("descripcion");
  const costo = formData.get("costo");

  const paqueteData = {
    nombre: nombre,
    descripcion: descripcion,
    costo: parseFloat(costo),
  };

  fetch("http://localhost:3000/api/paquetes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paqueteData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al crear el paquete de viaje");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Paquete de viaje creado:", data);
      alert("Paquete de viaje creado con éxito.");
      crearPaqueteForm.reset();
      obtenerPaquetes(); 
    })
    .catch((error) => {
      console.error("Error al crear el paquete de viaje:", error);
      alert("Error al crear el paquete de viaje: " + error.message);
    });
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}



