function obtenerPaquetes() {
  fetch('http://localhost:3000/api/paquetes')
    .then(response => response.json())
    .then(data => {
      const paquetes = data.data;
      console.log(paquetes)
      const tbody = document.querySelector('#paquetesTabla tbody');
      tbody.innerHTML = '';

      paquetes.forEach(paquete => {
        const fila = document.createElement('tr');
        
        const celdaId = document.createElement('td');
        celdaId.textContent = paquete.id;
        fila.appendChild(celdaId);

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = paquete.nombre;
        fila.appendChild(celdaNombre);

        const celdaDescripcion = document.createElement('td');
        celdaDescripcion.textContent = paquete.descripcion;
        fila.appendChild(celdaDescripcion);

        const celdaCosto = document.createElement('td');
        celdaCosto.textContent = `$${paquete.costo.toFixed(2)}`;
        fila.appendChild(celdaCosto);
        
        tbody.appendChild(fila);
      });
    })
    .catch(error => {
      console.error('Error al obtener paquetes de viaje:', error);
    });
}

window.onload = obtenerPaquetes;

