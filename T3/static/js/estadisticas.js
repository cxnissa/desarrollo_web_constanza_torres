
// estetica c:
Highcharts.setOptions({
    colors: [
        '#bc5589ff', // Tu rosado oscuro del CSS
        '#ffafcc', // Tu rosado medio del CSS
        '#ff80aa', // Un rosado intermedio
        '#ffe5ec', // Tu rosado pálido del CSS
        '#ffc8dd'  // Otro rosado de tu CSS
    ]
});

document.addEventListener("DOMContentLoaded", () => {
    // primer graph
    // usamos highcharts !
    fetch("/api/stats/avisos-por-dia")
        .then(response => response.json())
        .then(data => {
            const fechas = data.map(d => d.fecha);
            const cant = data.map(d => d.cantidad);

            Highcharts.chart('chart-linea', {
                title: { text: 'Avisos de adopción por día' },
                xAxis: { categories: fechas },
                yAxis: { title: {text: 'Cantidad'} },
                series: [{
                    name: 'Avisos',
                    data: cant
                }]
            });
        });

    fetch("/api/stats/avisos-por-tipo")
        .then(response => response.json())
        .then(data => {
            const series = data.map(d => ({ name: d.tipo, y: d.cantidad }));
            Highcharts.chart('chart-torta', {
                chart: { type: 'pie' },
                title: { text: 'Total de avisos por tipo de mascota' },
                series: [{
                    name: 'Cantidad',
                    data: series
                }]
            });
        });

    // el trabajo de las series de avisos por mes lo hicimos en python :)
    fetch("/api/stats/avisos-por-mes")
        .then(response => response.json())
        .then(data => {
            Highcharts.chart('chart-barras', {
                chart: {
                    type: 'bar' 
                },
                title: {
                    text: 'Avisos por mes y tipo (Últimos 4 Meses)'
                },
                xAxis: {
                    categories: data.ejeX // ejeX de la API 
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Cantidad de avisos'
                    }
                },
                series: data.series 
            }); 
    })
});