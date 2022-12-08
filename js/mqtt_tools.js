var mqtt;
var reconnectTimeout = 2000;
var host = "104.237.1.145";
var port = 8883;


function get_ldr_icon(value) {
    if (value < 40)
        {return 'static/img/dark.png'}
    else if (value <= 40 && value < 800)
        {return 'static/img/dim.png'}
    else if (value <= 800 && value < 2000)
        {return 'static/img/light.png'}
    else if (value <= 2000 && value < 3200)
        {return 'static/img/bright.png'}
    else
        {return 'static/img/very_bright.png'}
}


function on_connect() {
    const topics = [
        "map/icon_update"
    ];
    console.log("connected");
    for (i in topics){
        mqtt.subscribe(topics[i]);
        console.log(`Subscribed to ${topics[i]}`);  // TODO: remove this log
    };
}


function mqtt_connect() {
    mqtt = new Paho.MQTT.Client(host, port, '');
    var options = {
        timeout: 3,
        onSuccess: on_connect,
    };
    mqtt.onMessageArrived = on_message;
    mqtt.connect(options);
}

function on_message(msg) {
    // console.log(msg.payloadString);
    var out = JSON.parse(msg.payloadString);
    // let origin = msg['destinationName'];
    var target_id = out[0];
    var received_ldr = out[2];
    var map_div = document.getElementById('map');
    var markers = map_div.firstChild.childNodes[3].children;
    for (let i in markers){
        console.log(markers[i].alt);
        if (markers[i].attributes['alt'].value == target_id){
            markers[i].setAttribute('src', get_ldr_icon(received_ldr));
            break;
        }
    }

    // // TODO: renomear a fila de posições
    // if (origin == 'foo/baz'){
    //     let player_name = out["reference"];
    //     if (player_name in players) {
    //         players[player_name]['x'] = out["x"];
    //         players[player_name]['y'] = out["y"];
    //         players[player_name]['sprite'].position.x = out["x"];
    //         players[player_name]['sprite'].position.y = out["y"];
    //         drawSprites();
    //     }
    // }
    // else if (origin.includes('log/chat')){
    //     chat_logs = chat_logs.concat([out]);
    //     if (chat_logs.length > 5) {
    //         chat_logs.shift();
    //     }
    // }
    // else if (origin == 'system/logged_players'){
    //     set_players(out['data']['entities']);
    //     draw();
    // }
    // else if (origin == 'system/logout'){
    //     // Remove unlogged player sprite
    //     players[out['username']]['sprite'].remove();
    //     draw();
    // }
}