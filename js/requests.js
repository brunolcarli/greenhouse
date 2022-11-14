
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
