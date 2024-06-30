/* document.addEventListener('DOMContentLoaded', () => {
    // Reservas de Paquetes
    const formPaquete = document.querySelector('#reservaPaqueteForm');
    const tableBodyPaquete = document.querySelector('#reservasPaqueteTable tbody');

    formPaquete.addEventListener('submit', function(event) {
        event.preventDefault();
        const paquete = document.querySelector('#paquete_id').value;
        const fechaIda = document.querySelector('#fecha_ida_paquete').value;
        const fechaVuelta = document.querySelector('#fecha_vuelta_paquete').value;
        const cantidad = document.querySelector('#cantidad_paquete').value;

        if (new Date(fechaIda) >= new Date(fechaVuelta)) {
            alert('Recuerde, la fecha de la ida tiene que ser anterior a la fecha de la vuelta!');
            return;
        }

        // Llamada a la API para guardar la reserva
        guardarReserva('paquetes', paquete, fechaIda, fechaVuelta, cantidad, tableBodyPaquete);
    });

    // Reservas de Pasajes
    const formPasaje = document.querySelector('#reservaPasajeForm');
    const tableBodyPasaje = document.querySelector('#reservasPasajeTable tbody');

    formPasaje.addEventListener('submit', function(event) {
        event.preventDefault();
        const destino = document.querySelector('#destino_id').value;
        const fechaIda = document.querySelector('#fecha_ida_pasaje').value;
        const fechaVuelta = document.querySelector('#fecha_vuelta_pasaje').value;
        const cantidad = document.querySelector('#cantidad_pasaje').value;

        if (new Date(fechaIda) >= new Date(fechaVuelta)) {
            alert('Recuerde, la fecha de la ida tiene que ser anterior a la fecha de la vuelta!');
            return;
        }

        // Llamada a la API para guardar la reserva
        guardarReserva('pasajes', destino, fechaIda, fechaVuelta, cantidad, tableBodyPasaje);
    });

    function guardarReserva(tipo, lugar, fechaIda, fechaVuelta, cantidad, tableBody) {
        // Configuración de la llamada a la API
        const url = `http://localhost:3000/api/${tipo}`;
        const data = {
            lugar: lugar,
            fechaIda: fechaIda,
            fechaVuelta: fechaVuelta,
            cantidad: cantidad
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(reserva => {
            // Agregar la reserva a la tabla
            addReserva(tableBody, reserva.lugar, reserva.fechaIda, reserva.fechaVuelta, reserva.cantidad);
        })
        .catch(error => {
            console.error('Error al guardar reserva:', error);
            alert('Error al guardar la reserva. Por favor, intente nuevamente.');
        });
    }

    function addReserva(tableBody, lugar, fechaIda, fechaVuelta, cantidad) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lugar}</td>
            <td>${fechaIda}</td>
            <td>${fechaVuelta}</td>
            <td>${cantidad}</td>
            <td>
                <button class="action-button aceptar">&#10003;</button>
                <button class="action-button cancelar">&#10007;</button>
            </td>
        `;
        const btnAceptar = row.querySelector('.aceptar');
        const btnCancelar = row.querySelector('.cancelar');

        btnAceptar.addEventListener('click', () => aceptarReserva(row));
        btnCancelar.addEventListener('click', () => cancelarReserva(row));

        tableBody.appendChild(row);
    }

    function aceptarReserva(row) {
        row.style.backgroundColor = '#c8e6c9'; // Color verde claro para indicar aceptación
    }

    function cancelarReserva(row) {
        row.remove();
    }
}); */
document.addEventListener('DOMContentLoaded', () => {
    // Reservas de Paquetes
    const formPaquete = document.querySelector('#reservaPaqueteForm');
    const tableBodyPaquete = document.querySelector('#reservasPaqueteTable tbody');

    formPaquete.addEventListener('submit', function(event) {
        event.preventDefault();
        const paquete = document.querySelector('#paquete_id').value;
        const fechaIda = document.querySelector('#fecha_ida_paquete').value;
        const fechaVuelta = document.querySelector('#fecha_vuelta_paquete').value;
        const cantidad = document.querySelector('#cantidad_paquete').value;

        if (new Date(fechaIda) >= new Date(fechaVuelta)) {
            alert('Recuerde, la fecha de la ida tiene que ser anterior a la fecha de la vuelta!');
            return;
        }

        // Simulación de guardar la reserva
        const reserva = {
            lugar: paquete,
            fechaIda: fechaIda,
            fechaVuelta: fechaVuelta,
            cantidad: cantidad
        };
        addReserva(tableBodyPaquete, reserva.lugar, reserva.fechaIda, reserva.fechaVuelta, reserva.cantidad);
    });

    // Reservas de Pasajes
    const formPasaje = document.querySelector('#reservaPasajeForm');
    const tableBodyPasaje = document.querySelector('#reservasPasajeTable tbody');

    formPasaje.addEventListener('submit', function(event) {
        event.preventDefault();
        const destino = document.querySelector('#destino_id').value;
        const fechaIda = document.querySelector('#fecha_ida_pasaje').value;
        const fechaVuelta = document.querySelector('#fecha_vuelta_pasaje').value;
        const cantidad = document.querySelector('#cantidad_pasaje').value;

        if (new Date(fechaIda) >= new Date(fechaVuelta)) {
            alert('Recuerde, la fecha de la ida tiene que ser anterior a la fecha de la vuelta!');
            return;
        }

        // Simulación de guardar la reserva
        const reserva = {
            lugar: destino,
            fechaIda: fechaIda,
            fechaVuelta: fechaVuelta,
            cantidad: cantidad
        };
        addReserva(tableBodyPasaje, reserva.lugar, reserva.fechaIda, reserva.fechaVuelta, reserva.cantidad);
    });

    function addReserva(tableBody, lugar, fechaIda, fechaVuelta, cantidad) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lugar}</td>
            <td>${fechaIda}</td>
            <td>${fechaVuelta}</td>
            <td>${cantidad}</td>
            <td>
                <button class="action-button aceptar">&#10003; Aceptar</button>
                <button class="action-button cancelar">&#10007; Cancelar</button>
            </td>
        `;
        const btnAceptar = row.querySelector('.aceptar');
        const btnCancelar = row.querySelector('.cancelar');

        btnAceptar.addEventListener('click', () => aceptarReserva(row));
        btnCancelar.addEventListener('click', () => cancelarReserva(row));

        tableBody.appendChild(row);
    }

    function aceptarReserva(row) {
        row.style.backgroundColor = '#c8e6c9'; // Color verde claro para indicar aceptación
    }

    function cancelarReserva(row) {
        row.remove();
    }
});
