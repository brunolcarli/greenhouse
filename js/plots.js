

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


function plot_ldr_values(){
    return get_ldr_values().then(dataset => {
        const ctx = reset_canvas('DynamicChart', 'dynamic_chart');
        const ldr_values = [];
        const dates =[];

        for (let i in dataset){
            ldr_values.push(dataset[i]['ldrSensor']);
            dates.push(dataset[i]['datetimeOrigin']);
        }

        const data = {
            labels: dates,
            datasets: [
                {
                    label: 'Sensor de luminosidade',
                    data: ldr_values,
                    fill: false,
                    borderColor: 'rgb(175, 92, 99)',
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
