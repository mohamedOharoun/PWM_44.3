document.addEventListener('DOMContentLoaded', func)

function guardarJSON(datos) {
    fetch("guardar.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos) // Convertimos el objeto a JSON y lo enviamos
    })
        .then(response => response.text())
        .then(data => console.log("JSON guardado correctamente:", data))
        .catch(error => console.error("Error al guardar:", error));
}

function func() {
    // Cargar el JSON, modificarlo y guardarlo
    fetch("locales/translations.json")
        .then(response => response.json())
        .then(data => {
            console.log("JSON original:", data);

            // Modificar los datos
            data.es.header.push("TEST")

            console.log("JSON modificado:", data);

            // Guardar el JSON modificado
            guardarJSON(data);
        })
        .catch(error => console.error("Error al cargar el JSON:", error));
}


