var ws;
var dataObj;
var disconnected = false;

function refresh() {
    if (dataObj) {
        var d = new Date();
        var i = 1;
        $("#content").empty();
        $("#station").text(dataObj[0].station);
        dataObj.forEach(element => {
            if (i <= 4) {
                var realtime;
                var time;
                if (element.rday == 0) {
                    realtime = false;
                    time = new Date(element.year, element.month - 1, element.day, element.hour, element.minute, 0);
                }
                else {
                    realtime = true;
                    time = new Date(element.ryear, element.rmonth - 1, element.rday, element.rhour, element.rminute, 0);
                }
                var dif = time - d;
                if (dif > 0) {
                    var min = Math.round(dif / (1000 * 60));

                    $("#content").append('<div class="row">');
                    if (element.type == "Bus") {
                        $("#content").append('<div class="col-xs-4 col-sm-4 col-md-4"><img class="img-responsive myrow myimg" src="bus.png">' + element.type + " " + element.line + '</div>');
                    }
                    else {
                        $("#content").append('<div class="col-xs-4 col-sm-4 col-md-4"><img class="img-responsive myrow myimg" src="ubahn.png">' + element.type + " " + element.line + '</div>');
                    }
                    $("#content").append('<div class="col-xs-6 col-sm-6 col-md-6">' + element.destination + '</div>');
                    if (realtime) {
                        $("#content").append('<div class="col-xs-2 col-sm-2 col-md-2 minute">' + min + ' min</div>');
                    }
                    else {
                        $("#content").append('<div class="col-xs-2 col-sm-2 col-md-2 minute"><i>' + min + ' min</i></div>');

                    }
                    $("#content").append('</div>');

                    i++;
                }
            }
        });
    }
}

function connectWS() {
    ws = new WebSocket('ws://' + self.location.host);
    ws.onopen = function (e) {
        console.log("Websocket Verbindung hergestellt!");
        disconnected = false;
    }

    ws.onclose = function (e) {
        console.log('Disconnected!');
        $("#station").text("");
        $("#content").empty();
        $("#content").append('<div class="row">');
        $("#content").append('<div class="col-xs-12 col-sm-12 col-md-12 err"> <p>Verbindung zum Server verloren!!</p></div>');
        $("#content").append('</div>');
        disconnected = true;
    };
    // Log errors
    ws.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };

    // Log messages from the server
    ws.onmessage = function (e) {
        console.log('Server: ' + e.data);
        dataObj = JSON.parse(e.data);
        refresh();

    };
}

$(document).ready(function () {

    console.log(self.location.host);
    connectWS();

    function timeout() {
        setTimeout(function () {
            //console.log("tick..:");
            if (!disconnected) {
                refresh();
            }
            else {
                connectWS();
            }
            timeout();
        }, 10000);
    }
    timeout();



});