

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
    });
}


function get_icon(img_path){
    var custom_icon = L.icon({
        iconUrl: img_path,
        iconSize: [32, 32],
        // iconAnchor: [22, 94],
        // popupAnchor: [-3, -76],
        // shadowUrl: 'my-icon-shadow.png',
        // shadowSize: [68, 95],
        // shadowAnchor: [22, 94]
    });
    return custom_icon;
}


function get_ldr_icon(value) {
    if (value < 40)
        {return get_icon('static/img/dark.png')}
    else if (40 <= value < 800)
        {return get_icon('static/img/dim.png')}
    else if (800 <= value < 2000)
        {return get_icon('static/img/light.png')}
    else if (2000 <= value < 3200)
        {return get_icon('static/img/bright.png')}
    else
        {return get_icon('static/img/very_bright.png')}
}


function plot_world_map_installations(){
    var map = L.map('map').setView([-25.4412257, -49.1691257], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    get_map_installations().then(response => {
        // LEAFLET MAP
        for (let i in response){
            var reference = response[i]['reference'];
            var lat = response[i]['latitude'];
            var long = response[i]['longitude'];
            var tx_count = response[i]['device']['transmissionCount'];
            var last_ldr = response[i]['device']['lastTransmission'];
            if (last_ldr){
                last_ldr = last_ldr['ldrSensor'];
            } else {
                last_ldr = 0;
            }

            var marker = L.marker(
                [lat, long],
                {
                    title: `${reference}\nTransmissões: ${tx_count}`,
                    icon: get_ldr_icon(last_ldr)
                }
            ).addTo(map);
            // dataset.push({
            //     lat: lat,
            //     long: long,
            //     name: reference,
            //     value: `Transmissões: ${tx_count}`
            // });
        }


        // ANYCHART MAP 

        // var dataset = [];
        // for (let i in data){
        //     var reference = data[i]['reference'];
        //     var lat = data[i]['latitude'];
        //     var long = data[i]['longitude'];
        //     var tx_count = data[i]['device']['transmissionCount'];
        //     dataset.push({
        //         lat: lat,
        //         long: long,
        //         name: reference,
        //         value: `Transmissões: ${tx_count}`
        //     });
        // }

        // var map = anychart.map();
        // map.geoData(anychart.maps.brazil);
        // map.title().listen("click", function () {
        //     // Zoom map in 2 times.
        //     map.zoom(2);
        // });

        // // Creates the marker series
        // var series_lat_long = map.marker(dataset);
        // series_lat_long.tooltip({title: false, separator: false});

        // map.title("Dispositivos instalados");
        // map.interactivity().zoomOnMouseWheel(true);
        // map.container("world_map_index_page");
        // map.draw();
    });
}


function plot_installation_transmission_values(reference){
    return get_installation_transmission_data(reference).then(installation => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const ldr_values = [];
        const temperature_values = [];
        const pressure_values = [];
        const moisture_values = [];
        const dates = [];
        const transmissions = installation['device']['transmissions'];

        for (let i in transmissions){
            ldr_values.push(transmissions[i]['ldrSensor']);
            temperature_values.push(transmissions[i]['temperatureSensor']);
            pressure_values.push(transmissions[i]['pressure']);
            moisture_values.push(transmissions[i]['moisture']);
            dates.push(transmissions[i]['datetimeOrigin']);
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
    });
}


function plot_installation_ldr_hour_rel_freq(query_filter){
    return get_installation_ldr_hour_relative_freq(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataset['device']['hourRelativeFrequency']['hours'],
                datasets: [
                    {
                        label: 'Fr %',
                        data: dataset['device']['hourRelativeFrequency']['ldrRelativeFrequency'],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Frequência relativa (%) hora do dia (Período 1H) [Linha]',
                        data: dataset['device']['hourRelativeFrequency']['ldrRelativeFrequency'],
                        fill: false,
                        borderColor: 'rgb(36, 252, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão + (High)',
                        data: dataset['device']['hourRelativeFrequency']['ldrHighStd'],
                        fill: false,
                        borderColor: 'rgb(252, 3, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão - (Low)',
                        data: dataset['device']['hourRelativeFrequency']['ldrLowStd'],
                        fill: false,
                        borderColor: 'rgb(3, 211, 252)',
                        tension: 0.5,
                        type: 'line'
                    }
                ]
            },
            options: {
                responsive: false
            }
        });
        return chart;
    });
}


function plot_installation_temperature_hour_rel_freq(query_filter){
    return get_installation_temperature_hour_relative_freq(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataset['device']['hourRelativeFrequency']['hours'],
                datasets: [
                    {
                        label: 'Fr %',
                        data: dataset['device']['hourRelativeFrequency']['temperatureRelativeFrequency'],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Frequência relativa (%) hora do dia (Período 1H) [Linha]',
                        data: dataset['device']['hourRelativeFrequency']['temperatureRelativeFrequency'],
                        fill: false,
                        borderColor: 'rgb(36, 252, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão + (High)',
                        data: dataset['device']['hourRelativeFrequency']['temperatureHighStd'],
                        fill: false,
                        borderColor: 'rgb(252, 3, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão - (Low)',
                        data: dataset['device']['hourRelativeFrequency']['temperatureLowStd'],
                        fill: false,
                        borderColor: 'rgb(3, 211, 252)',
                        tension: 0.5,
                        type: 'line'
                    }
                ]
            },
            options: {
                responsive: false
            }
        });
        return chart;
    });
}


function plot_installation_pressure_hour_rel_freq(query_filter){
    return get_installation_pressure_hour_relative_freq(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataset['device']['hourRelativeFrequency']['hours'],
                datasets: [
                    {
                        label: 'Fr %',
                        data: dataset['device']['hourRelativeFrequency']['pressureRelativeFrequency'],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Frequência relativa (%) hora do dia (Período 1H) [Linha]',
                        data: dataset['device']['hourRelativeFrequency']['pressureRelativeFrequency'],
                        fill: false,
                        borderColor: 'rgb(36, 252, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão + (High)',
                        data: dataset['device']['hourRelativeFrequency']['pressureHighStd'],
                        fill: false,
                        borderColor: 'rgb(252, 3, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão - (Low)',
                        data: dataset['device']['hourRelativeFrequency']['pressureLowStd'],
                        fill: false,
                        borderColor: 'rgb(3, 211, 252)',
                        tension: 0.5,
                        type: 'line'
                    }
                ]
            },
            options: {
                responsive: false
            }
        });
        return chart;
    });
}


function plot_installation_moisture_hour_rel_freq(query_filter){
    return get_installation_moisture_hour_relative_freq(query_filter).then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataset['device']['hourRelativeFrequency']['hours'],
                datasets: [
                    {
                        label: 'Fr %',
                        data: dataset['device']['hourRelativeFrequency']['moistureRelativeFrequency'],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'Frequência relativa (%) hora do dia (Período 1H) [Linha]',
                        data: dataset['device']['hourRelativeFrequency']['moistureRelativeFrequency'],
                        fill: false,
                        borderColor: 'rgb(36, 252, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão + (High)',
                        data: dataset['device']['hourRelativeFrequency']['moistureHighStd'],
                        fill: false,
                        borderColor: 'rgb(252, 3, 3)',
                        tension: 0.5,
                        type: 'line'
                    },
                    {
                        label: 'Desvio Padrão - (Low)',
                        data: dataset['device']['hourRelativeFrequency']['moistureLowStd'],
                        fill: false,
                        borderColor: 'rgb(3, 211, 252)',
                        tension: 0.5,
                        type: 'line'
                    }
                ]
            },
            options: {
                responsive: false
            }
        });
        return chart;
    });
}


//

function update_dynamic_chart(query_filter, value){

    const valid_options = {
        SENSOR_MEASUREMENTS: plot_installation_transmission_values,
        LDR_HOUR_REL_FREQ: plot_installation_ldr_hour_rel_freq,
        TEMP_HOUR_REL_FREQ: plot_installation_temperature_hour_rel_freq,
        PRES_HOUR_REL_FREQ: plot_installation_pressure_hour_rel_freq,
        MOIS_HOUR_REL_FREQ: plot_installation_moisture_hour_rel_freq,
    };
    valid_options[value](query_filter);
}


function view_installation_data(){
    var installation_reference = $('#InstallationSelectIndexPage').val();
    // Validate installation input
    if (!installation_reference){
        alert('Necessário escolher uma instalação!');
        return
    }
    var inputed = $("#InstallationSelectIndexPageInput").find("option[value='" + installation_reference + "']");
    if (inputed == null || inputed.length <= 0){
        alert('Instalação inválida!');
        return
    }

    var chart_type = document.getElementById('chart_selection').value;
    draw_installation_resume_table(installation_reference);
    update_dynamic_chart(installation_reference, chart_type);
}
