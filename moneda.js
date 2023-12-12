document.addEventListener('DOMContentLoaded', function () {
    const deMonedaSelect = document.getElementById('deMoneda');
    const aMonedaSelect = document.getElementById('aMoneda');
    const cantidadInput = document.getElementById('cantidad');
    const resultadoDiv = document.getElementById('resultado');
    const convertirBoton = document.querySelector('button');
    const historialLista = document.getElementById('historial-lista');

    //Datos ficticcios (futura api)
    const tasasDeCambio = {
        soles: {
            dolares: 0.75,
            euros: 0.65,
            yen: 80.50
        },
        dolares: {
            soles: 1.33,
            euros: 0.87,
            yen: 110.25
        },
        euros: {
            soles: 1.54,
            dolares: 1.15,
            yen: 130.80
        },
        yen: {
            soles: 0.012,
            dolares: 0.009,
            euros: 0.0077
        }
    };

    convertirBoton.addEventListener('click', function () {
        const deMoneda = deMonedaSelect.value;
        const aMoneda = aMonedaSelect.value;
        const cantidad = cantidadInput.value;

        if (!deMoneda || !aMoneda || !cantidad) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const tasa = obtenerTasaDeCambio(deMoneda, aMoneda);
        const resultado = (cantidad * tasa).toFixed(2);

        const conversion = `${cantidad} ${deMoneda} = ${resultado} ${aMoneda}`;
        agregarAlHistorial(conversion);
        resultadoDiv.textContent = conversion;
    });

    function obtenerTasaDeCambio(deMoneda, aMoneda) {
        if (tasasDeCambio[deMoneda] && tasasDeCambio[deMoneda][aMoneda]) {
            return tasasDeCambio[deMoneda][aMoneda];
        } else {
            console.error('Tasa de cambio no encontrada.');
            return 1;
        }
    }

    function agregarAlHistorial(conversion) {
        const listItem = document.createElement('li');
        listItem.textContent = conversion;
        historialLista.appendChild(listItem);
    }
});
