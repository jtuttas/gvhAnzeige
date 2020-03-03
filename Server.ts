import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { GVH } from './GVH';
import { Depature } from './data/Departure';

const app = express();
app.use(express.static('public'));
//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

var dep:Depature[]=new Array();

wss.on('connection', (ws: WebSocket) => {

    //send immediatly a feedback to the incoming connection    
    ws.send(JSON.stringify(dep));
});

//start our server
console.log("usage: node Server.js [Station {default=25001811}] [Port {default=8999}")
var port:number=8999;
var station:number=25001811;
if (process.argv[3]) {
    port = +process.argv[3];
}
if (process.argv[2]) {
    station = +process.argv[2];
}
server.listen(process.env.PORT || port, () => {
    console.log(`Server started on port `+port+ " for station "+station);
});
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
    while (true) {
        // Do something before delay
        console.log('..')
        let s: string;
        GVH.getData(station).then(
            (depatures) => {
                console.log('Empfange Daten ..'+JSON.stringify(depatures));
                dep=depatures;
                wss.clients.forEach(ws => {
                    ws.send(JSON.stringify(depatures));
                })        
                depatures.forEach(element => {
                    console.log(element.toString());
                });
            }
        );
        await delay(60000);
    }
})();