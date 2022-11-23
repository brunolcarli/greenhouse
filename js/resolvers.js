
function reset_installation_resume_table(){
    var table = document.getElementById("installation_resume_table");
    table.innerHTML = '';
    table.align = 'center';
    table.className = 'table table-dark';

    var header = table.insertRow(0);

    var reference = header.insertCell(0);
    var description = header.insertCell(1);
    var device_hw = header.insertCell(2);
    var device_description = header.insertCell(3);
    var transmissions = header.insertCell(4);

    reference.innerHTML = 'Referência';
    description.innerHTML = 'Descrição';
    device_hw.innerHTML = 'Hardware';
    device_description.innerHTML = 'Descrição do Hardware';
    transmissions.innerHTML = 'Transmissões';
}


function draw_installation_resume_table(query_filter){
    reset_installation_resume_table();
    return get_installation_table_data(query_filter).then(data => {
        var table = document.getElementById("installation_resume_table");
        var row = table.insertRow(table.rows.length);

        var reference = row.insertCell(0);
        var description = row.insertCell(1);
        var device_hw = row.insertCell(2);
        var device_description = row.insertCell(3);
        var transmissions = row.insertCell(4);

        reference.innerHTML = data['reference'];
        description.innerHTML = data['description'];
        device_hw.innerHTML = data['device']['hardwareType'];
        device_description.innerHTML = data['device']['description'];
        transmissions.innerHTML = data['device']['transmissionCount'];
    });
}



function resolve_installation_selection_list(){
    return get_installation_list().then(installations => {
        let installation_selection_div = document.getElementById('installation_select_index_page');
        installation_selection_html = '<label class="input-group-text">&#9888;</label>';
        installation_selection_html += '<input type="text" list="InstallationSelectIndexPageInput" id="InstallationSelectIndexPage" placeholder="Instalação">';
        installation_selection_html += '<datalist name="InstallationSelectIndexPage" id="InstallationSelectIndexPageInput">';

        // Fills installation selection list
        for (let i in installations){
            installation_selection_html += `<option value="${installations[i]['reference']}">${installations[i]['reference']}</option>`;
        }

        installation_selection_html += '</datalist><br />';
        installation_selection_div.innerHTML = installation_selection_html;
    });
}


function resolve_datetime_input(range){
    if (range == 'ALL'){
        return '';
    }

    let today = new Date();
    let start_point = new Date(today);

    if (range == '0'){
        start_point.setHours(0, 0, 0);
    }
    else if (range == 'L24'){
        start_point.setHours(start_point.getHours() - 24);
    }
    else {
        start_point.setDate(start_point.getDate() - range);
    }

    return ` \\\"${start_point.toISOString()}\\\" `;
}
