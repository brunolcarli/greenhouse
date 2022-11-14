

function reset_canvas(chart_id, div_id){
    // Resets the canvas state
    document.getElementById(chart_id).remove();
    let canvas = document.createElement(
        'canvas'
    );
    canvas.setAttribute('id', chart_id);
    canvas.setAttribute('width', '680');
    canvas.setAttribute('height', '420');
    document.getElementById(div_id).appendChild(canvas);

    return document.getElementById(chart_id).getContext('2d');
}


function plot_transmission_values(){
    return get_transmission_values().then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const ldr_values = [];
        const temperature_values = [];
        const pressure_values = [];
        const moisture_values = [];
        const dates =[];

        for (let i in dataset){
            ldr_values.push(dataset[i]['ldrSensor']);
            temperature_values.push(dataset[i]['temperatureSensor']);
            pressure_values.push(dataset[i]['pressure']);
            moisture_values.push(dataset[i]['moisture']);
            dates.push(dataset[i]['datetimeOrigin']);
        }

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Luminosidade',
                    data: ldr_values,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
                    tension: 0.5
                },
                {
                    label: 'Temperatura (C˚)',
                    data: temperature_values,
                    fill: false,
                    borderColor: 'rgb(15, 92, 99)',
                    tension: 0.5
                },
                {
                    label: 'Pressão',
                    data: pressure_values,
                    fill: false,
                    borderColor: 'rgb(17, 192, 99)',
                    tension: 0.5
                },
                {
                    label: 'Umidade',
                    data: moisture_values,
                    fill: false,
                    borderColor: 'rgb(75, 192, 199)',
                    tension: 0.5
                }
            ]
        };
        const chart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: false
            }
        });
        return chart;
    })
}


function plot_world_map_installations(){
    get_map_installations().then(data => {
        var dataset = [];
        for (let i in data){
            var reference = data[i]['reference'];
            var lat = data[i]['latitude'];
            var long = data[i]['longitude'];
            var tx_count = data[i]['device']['transmissionCount'];
            dataset.push({
                lat: lat,
                long: long,
                name: reference,
                value: `Transmissões: ${tx_count}`
            });
        }
        var map = anychart.map();
        map.geoData(anychart.maps.brazil);
        map.title().listen("click", function () {
            // Zoom map in 2 times.
            map.zoom(2);
        });

        // Creates the marker series
        var series_lat_long = map.marker(dataset);
        series_lat_long.tooltip({title: false, separator: false});

        map.title("Dispositivos instalados");
        map.interactivity().zoomOnMouseWheel(true);
        map.container("world_map_index_page");
        map.draw();
    });
}