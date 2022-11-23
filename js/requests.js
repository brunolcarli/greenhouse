
const URL = 'https://iotapi.brunolcarli.repl.co/graphql/';



function json(response) {
    /*Convert response into json format */
    return response.json();
}


function get_request_options(payload){
  /* Returns the request method, headers, content... */
  return {
    method: 'POST',
    headers: {
      cookie: 'csrftoken=pgrjljBkHdbd9hySxmJaFUlewPM1IdYJ09nZstz9N6bCf8pfuctT4ftl2girhj6t',
      'Content-Type': 'application/json'
    },
    body: payload
  };
}


function get_transmission_values(){
    const payload = '{"query": "query{espTransmissions(macAddress_Icontains: \\\"5935393336311228\\\") {ldrSensor temperatureSensor pressure moisture datetimeOrigin}}"}';
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        return response['data']['espTransmissions'];
    })
    .catch(err => {
        console.error(err);
    });
}


function get_map_installations(){
    const payload = '{"query": "query{installations{reference latitude longitude device {transmissionCount}}}"}';
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        return response['data']['installations'];
    })
    .catch(err => {
        console.error(err);
    });
}


function get_installation_list(){
    const payload = '{"query": "query {installations{reference}}"}';
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        return response['data']['installations'];
    })
    .catch(err => {
        console.error(err);
    });   
}


function get_installation_table_data(reference){
    const payload = `{"query": "query{installation(reference: \\\"${reference}\\\"){ reference description device{ hardwareType description transmissionCount } }}"}`;
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        return response['data']['installation'];
    })
    .catch(err => {
        console.error(err);
    });   
}


function get_installation_transmission_data(reference){
    var date_range = document.getElementById('date_range_selection').value;
    date_range = resolve_datetime_input(date_range);
    if (date_range){
        date_range = ' txDatetimeStart: ' + date_range;
    }

    const payload = `{"query": "query{installation(reference: \\\"${reference}\\\" ${date_range} ){ reference device{ transmissions{ ldrSensor temperatureSensor pressure moisture datetimeOrigin} } }}"}`;
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        return response['data']['installation'];
    })
    .catch(err => {
        console.error(err);
    });   
}


function get_installation_ldr_hour_relative_freq(reference){
    var date_range = document.getElementById('date_range_selection').value;
    date_range = resolve_datetime_input(date_range);
    if (date_range){
        date_range = ' txDatetimeStart: ' + date_range;
    }

    const payload = `{"query": "query{installation(reference: \\\"${reference}\\\" ${date_range} ){ reference device{ hourRelativeFrequency{ hours ldrRelativeFrequency ldrHighStd ldrLowStd  } } }}"}`;
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        return response['data']['installation'];
    })
    .catch(err => {
        console.error(err);
    });   
}


function get_installation_temperature_hour_relative_freq(reference){
    var date_range = document.getElementById('date_range_selection').value;
    date_range = resolve_datetime_input(date_range);
    if (date_range){
        date_range = ' txDatetimeStart: ' + date_range;
    }

    const payload = `{"query": "query{installation(reference: \\\"${reference}\\\" ${date_range} ){ reference device{ hourRelativeFrequency{ hours temperatureRelativeFrequency temperatureHighStd temperatureLowStd  } } }}"}`;
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        return response['data']['installation'];
    })
    .catch(err => {
        console.error(err);
    });   
}


function get_installation_pressure_hour_relative_freq(reference){
    var date_range = document.getElementById('date_range_selection').value;
    date_range = resolve_datetime_input(date_range);
    if (date_range){
        date_range = ' txDatetimeStart: ' + date_range;
    }

    const payload = `{"query": "query{installation(reference: \\\"${reference}\\\" ${date_range} ){ reference device{ hourRelativeFrequency{ hours pressureRelativeFrequency pressureHighStd pressureLowStd  } } }}"}`;
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        return response['data']['installation'];
    })
    .catch(err => {
        console.error(err);
    });   
}


function get_installation_moisture_hour_relative_freq(reference){
    var date_range = document.getElementById('date_range_selection').value;
    date_range = resolve_datetime_input(date_range);
    if (date_range){
        date_range = ' txDatetimeStart: ' + date_range;
    }

    const payload = `{"query": "query{installation(reference: \\\"${reference}\\\" ${date_range} ){ reference device{ hourRelativeFrequency{ hours moistureRelativeFrequency moistureHighStd moistureLowStd  } } }}"}`;
    const options = get_request_options(payload);
    return fetch(URL, options)
    .then(json)
    .then(response => {
        return response['data']['installation'];
    })
    .catch(err => {
        console.error(err);
    });   
}
