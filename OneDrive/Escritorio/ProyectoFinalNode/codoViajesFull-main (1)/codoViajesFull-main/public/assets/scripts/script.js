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

        addReserva(tableBodyPaquete, paquete, fechaIda, fechaVuelta, cantidad);
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

        addReserva(tableBodyPasaje, destino, fechaIda, fechaVuelta, cantidad);
    });

    function addReserva(tableBody, destino, fechaIda, fechaVuelta, cantidad) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${destino}</td>
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
});

