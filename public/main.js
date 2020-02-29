var ws;
var dataObj;
$(document).ready(function () {

    console.log(self.location.host);
    ws = new WebSocket('ws://'+self.location.host);

    function timeout() {
        setTimeout(function () {
            refresh();
            timeout();
        }, 10000);
    }
    timeout();

    // Log errors
    ws.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };

    function refresh() {
        if (dataObj) {
            var d = new Date();
            var i=1;
            $("#content").empty();
            dataObj.forEach(element => {
                if (i <= 4) {
                    var time= new Date(element.year, element.month-1, element.day, element.hour, element.minute, 0);
                    var dif = time-d;
                    if (dif>0) {
                        var min=Math.round(dif/(1000*60));
                        
                        $("#content").append('<div class="row">');
                        $("#content").append('<div class="col-xs-3 col-sm-3 col-md-3">' + element.type + " " + element.line + '</div>');
                        $("#content").append('<div class="col-xs-7 col-sm-7 col-md-7">' + element.destination + '</div>');
                        $("#content").append('<div class="col-xs-2 col-sm-2 col-md-2 minute">' + min+ ' min</div>');
                        $("#content").append('</div>');
                        
                        i++;
                    }
                }
            });
        }
    }

    // Log messages from the server
    ws.onmessage = function (e) {
        console.log('Server: ' + e.data);
        dataObj = JSON.parse(e.data);
        refresh();
        
    };
});