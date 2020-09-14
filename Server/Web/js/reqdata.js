var location = '/';
var socket = io.connect('https://secret.covrt.co/', {secure: true});
socket.on('connect', () => {
    socket.emit('folderreq', location);
});
socket.on('folderres', (data) => {
    let result = `<table style="width:100%"><tr><th>Name</th></tr>`;
    data.subfolder.forEach(k => {
        result += `<tr><td>${k}</td></tr>`;
    });
    data.data.forEach(k => {
        result += `<tr><td>${k}</td></tr>`;
    });
    result += `</table>`;
    document.getElementById('mainTable').innerHTML = result;
});