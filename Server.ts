import express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { GVH } from './GVH';
import { Depatures } from './Departure';

const app = express();
app.use(express.static('public'));
//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

let dep:Depatures[];

wss.on('connection', (ws: WebSocket) => {

    //send immediatly a feedback to the incoming connection    
    ws.send(JSON.stringify(this.dep));
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port 8999 :)`);
});
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
    while (true) {
        // Do something before delay
        console.log('..')
        let s: string;
        GVH.getData().then(
            (depatures) => {
                this.dep=depatures;
                wss.clients.forEach(ws => {
                    ws.send(JSON.stringify(depatures));
                })        
                depatures.forEach(element => {
                    console.log(element.describe());
                });
            }
        );
        await delay(600000);
    }
})();